import * as config from 'src/categories/js/codecov-workflow/codecov-workflow.config';
import * as github from 'src/utils/github';
import { codecovWorkflow } from 'src/categories/js/codecov-workflow/codecov-workflow.entrypoint';

jest.mock('src/categories/js/codecov-workflow/codecov-workflow.config');
const configMocked = jest.mocked(config);

jest.mock('src/utils/github');
const githubMocked = jest.mocked(github);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('codecovWorkflow', () => {
  test('should get config from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce({ content: '' });

    await codecovWorkflow();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should add github workflow', async () => {
    const content = '__test__';
    configMocked.getConfig.mockReturnValueOnce({ content });

    await codecovWorkflow();

    expect(githubMocked.addGithubWorkflow).toHaveBeenCalledWith('codecov.yml', content);
  });
});
