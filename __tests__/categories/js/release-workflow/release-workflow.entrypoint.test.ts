import { fileSystem } from '#__tests__/setup-test-context.ts';
import { defaultConfig } from '#src/categories/js/release-workflow/config/default.config.ts';
import { releaseWorkflow } from '#src/categories/js/release-workflow/release-workflow.entrypoint.ts';

describe('releaseWorkflow', () => {
  test('writes the default release workflow', async () => {
    await releaseWorkflow();

    expect(fileSystem.getDirs()).toEqual(['.github', '.github/workflows']);
    expect(fileSystem.readFile('.github/workflows/release.yml')).toBe(`${defaultConfig.content}\n`);
  });
});
