import { fileSystem } from '#__tests__/setup-test-context.ts';
import { defaultConfig } from '#src/categories/js/build-workflow/config/default.config.ts';
import { buildWorkflow } from '#src/categories/js/build-workflow/build-workflow.entrypoint.ts';

describe('buildWorkflow', () => {
  test('writes the default build workflow', async () => {
    await buildWorkflow();

    expect(fileSystem.getDirs()).toEqual(['.github', '.github/workflows']);
    expect(fileSystem.readFile('.github/workflows/build.yml')).toBe(`${defaultConfig.content}\n`);
  });
});
