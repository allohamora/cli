import * as config from 'src/categories/js/release-workflow/release-workflow.config';
import * as github from 'src/utils/github';
import { releaseWorkflow } from 'src/categories/js/release-workflow/release-workflow.entrypoint';

vi.mock('src/categories/js/release-workflow/release-workflow.config');
const configMocked = vi.mocked(config);

vi.mock('src/utils/github');
const githubMocked = vi.mocked(github);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('releaseWorkflow', () => {
  test('should get config from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce({ content: '' });

    await releaseWorkflow();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should add github workflow', async () => {
    const content = '__test__';
    configMocked.getConfig.mockReturnValueOnce({ content });

    await releaseWorkflow();

    expect(githubMocked.addGithubWorkflow).toHaveBeenCalledWith('release.yml', content);
  });
});
