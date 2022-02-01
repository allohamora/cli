import * as config from 'src/categories/js/codeql-workflow/codeql-workflow.config';
import * as github from 'src/utils/github';
import { codeqlWorkflow } from 'src/categories/js/codeql-workflow/codeql-workflow.entrypoint';

jest.mock('src/categories/js/codeql-workflow/codeql-workflow.config');
const configMocked = jest.mocked(config);

jest.mock('src/utils/github');
const githubMocked = jest.mocked(github);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('codeqlWorkflow', () => {
  test('should get config from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce({ content: '' });

    await codeqlWorkflow();

    expect(configMocked.getConfig).toBeCalled();
  });

  test('should add github workflow', async () => {
    const content = '__test__';
    configMocked.getConfig.mockReturnValueOnce({ content });

    await codeqlWorkflow();

    expect(githubMocked.addGithubWorkflow).toBeCalledWith('codeql.yml', content);
  });
});
