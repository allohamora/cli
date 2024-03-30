import * as config from 'src/categories/js/test-workflow/test-workflow.config';
import * as github from 'src/utils/github';
import { testWorkflow } from 'src/categories/js/test-workflow/test-workflow.entrypoint';

jest.mock('src/categories/js/test-workflow/test-workflow.config');
const configMocked = jest.mocked(config);

jest.mock('src/utils/github');
const githubMocked = jest.mocked(github);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('testWorkflow', () => {
  test('should get config from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce({ content: '' });

    await testWorkflow();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should add github workflow', async () => {
    const content = '__test__';
    configMocked.getConfig.mockReturnValueOnce({ content });

    await testWorkflow();

    expect(githubMocked.addGithubWorkflow).toHaveBeenCalledWith('test.yml', content);
  });
});
