import * as config from 'src/categories/js/build-workflow/build-workflow.config';
import * as github from 'src/utils/github';
import { buildWorkflow } from 'src/categories/js/build-workflow/build-workflow.entrypoint';

jest.mock('src/categories/js/build-workflow/build-workflow.config');
const configMocked = jest.mocked(config);

jest.mock('src/utils/github');
const githubMocked = jest.mocked(github);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('buildWorkflow', () => {
  test('should get config from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce({ content: '' });

    await buildWorkflow();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should add github workflow', async () => {
    const content = '__test__';
    configMocked.getConfig.mockReturnValueOnce({ content });

    await buildWorkflow();

    expect(githubMocked.addGithubWorkflow).toHaveBeenCalledWith('build.yml', content);
  });
});
