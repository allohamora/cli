import * as config from 'src/categories/js/dependabot/dependabot.config';
import * as github from 'src/utils/github';
import { dependabot } from 'src/categories/js/dependabot/dependabot.entrypoint';

jest.mock('src/categories/js/dependabot/dependabot.config');
const configMocked = jest.mocked(config);

jest.mock('src/utils/github');
const githubMocked = jest.mocked(github);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('dependabot', () => {
  test('should get config from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce({ content: '' });

    await dependabot();

    expect(configMocked.getConfig).toBeCalled();
  });

  test('should add dependabot.yml to github', async () => {
    const content = '__test__';
    configMocked.getConfig.mockReturnValueOnce({ content });

    await dependabot();

    expect(githubMocked.addToGithubDir).toBeCalledWith('dependabot.yml', content);
  });
});
