import { fileSystem } from '#__tests__/setup-test-context.ts';
import { defaultConfig } from '#src/categories/js/test-workflow/config/default.config.ts';
import { testWorkflow } from '#src/categories/js/test-workflow/test-workflow.entrypoint.ts';

describe('testWorkflow', () => {
  test('writes the default test workflow', async () => {
    await testWorkflow();

    expect(fileSystem.getDirs()).toEqual(['.github', '.github/workflows']);
    expect(fileSystem.readFile('.github/workflows/test.yml')).toBe(`${defaultConfig.content}\n`);
  });
});
