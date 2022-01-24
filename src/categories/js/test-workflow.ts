import { jsCategoryState } from 'src/libs/categories';
import { addGithubWorkflow } from 'src/libs/github';
import { prettyMultilineFormat } from 'src/libs/string';

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
          run: npm test
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
