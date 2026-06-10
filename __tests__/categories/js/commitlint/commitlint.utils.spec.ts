import { contextState, fileSystem } from '#__tests__/setup-test-context.ts';
import { huskyIntegration } from '#src/categories/js/commitlint/commitlint.utils.ts';

describe('huskyIntegration', () => {
  test('should do not run addHook if husky is not installed', async () => {
    await huskyIntegration();

    expect(fileSystem.readFile('.husky/commit-msg')).toBeUndefined();
  });

  test('should run addHook if husky installed', async () => {
    contextState.setInstalling(['husky']);

    await huskyIntegration();

    expect(fileSystem.readFile('.husky/commit-msg')).toBe('npx --no-install -- commitlint --edit "$1"\n');
  });
});
