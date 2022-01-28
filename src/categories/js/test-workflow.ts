import { jsCategoryState } from 'src/states/categories';
import { addGithubWorkflow } from 'src/utils/github';
import { prettyMultilineFormat } from 'src/utils/string';

const WORKFLOW_FILENAME = 'test.yml';

const content = prettyMultilineFormat`
  name: test

  on:
    push:
      branches:
        - "**"

  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v2
        - name: Install node
          uses: actions/setup-node@v2
          with:
            cache: "npm"
        - name: Install dependencies
          run: npm i
        - name: Run tests
          run: npm run test
`;

const defaultConfig = {
  content,
};

const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});

export const testWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
