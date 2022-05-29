import * as config from 'src/categories/js/release-workflow/release-workflow.config';
import * as github from 'src/utils/github';
import { releaseWorkflow } from 'src/categories/js/release-workflow/release-workflow.entrypoint';

jest.mock('src/categories/js/release-workflow/release-workflow.config');
const configMocked = jest.mocked(config);

jest.mock('src/utils/github');
const githubMocked = jest.mocked(github);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('releaseWorkflow', () => {
  test('should get config from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce({ content: '' });

    await releaseWorkflow();

    expect(configMocked.getConfig).toBeCalled();
  });

  test('should add github workflow', async () => {
    const content = '__test__';
    configMocked.getConfig.mockReturnValueOnce({ content });

    await releaseWorkflow();

    expect(githubMocked.addGithubWorkflow).toBeCalledWith('release.yml', content);
  });
});
