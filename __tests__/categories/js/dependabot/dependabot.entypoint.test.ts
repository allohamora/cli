import * as config from 'src/categories/js/dependabot/dependabot.config';
import * as github from 'src/utils/github';
import { dependabot } from 'src/categories/js/dependabot/dependabot.entrypoint';

vi.mock('src/categories/js/dependabot/dependabot.config');
const configMocked = vi.mocked(config);

vi.mock('src/utils/github');
const githubMocked = vi.mocked(github);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('dependabot', () => {
  test('should get config from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce({ content: '' });

    await dependabot();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should add dependabot.yml to github', async () => {
    const content = '__test__';
    configMocked.getConfig.mockReturnValueOnce({ content });

    await dependabot();

    expect(githubMocked.addToGithubDir).toHaveBeenCalledWith('dependabot.yml', content);
  });
});
