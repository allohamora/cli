import { fileSystem } from '#__tests__/setup-test-context.ts';
import { defaultConfig } from '#src/categories/js/codecov-workflow/config/default.config.ts';
import { codecovWorkflow } from '#src/categories/js/codecov-workflow/codecov-workflow.entrypoint.ts';

describe('codecovWorkflow', () => {
  test('writes the default codecov workflow', async () => {
    await codecovWorkflow();

    expect(fileSystem.getDirs()).toEqual(['.github', '.github/workflows']);
    expect(fileSystem.readFile('.github/workflows/codecov.yml')).toBe(`${defaultConfig.content}\n`);
  });
});
