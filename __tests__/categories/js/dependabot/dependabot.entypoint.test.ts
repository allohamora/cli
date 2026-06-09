import * as config from '#src/categories/js/dependabot/dependabot.config.ts';
import * as github from '#src/utils/github.ts';
import { dependabot } from '#src/categories/js/dependabot/dependabot.entrypoint.ts';

vi.mock('#src/categories/js/dependabot/dependabot.config.ts');
const configMocked = vi.mocked(config);

vi.mock('#src/utils/github.ts');
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
