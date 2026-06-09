import * as config from '#src/categories/js/test-workflow/test-workflow.config.ts';
import * as github from '#src/utils/github.ts';
import { testWorkflow } from '#src/categories/js/test-workflow/test-workflow.entrypoint.ts';

vi.mock('#src/categories/js/test-workflow/test-workflow.config.ts');
const configMocked = vi.mocked(config);

vi.mock('#src/utils/github.ts');
const githubMocked = vi.mocked(github);

beforeEach(() => {
  vi.clearAllMocks();
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
