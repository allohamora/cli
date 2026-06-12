import { fileSystem, installationState } from '#__tests__/setup-test-context.ts';
import { huskyIntegration } from '#src/categories/js/commitlint/commitlint.service.ts';
import { describe, expect, it } from 'vitest';

describe('commitlint.service', () => {
  describe('huskyIntegration', () => {
    it('does not run addHook if husky is not installed', async () => {
      await huskyIntegration();

      expect(fileSystem.readFile('.husky/commit-msg')).toBeUndefined();
    });

    it('runs addHook if husky installed', async () => {
      installationState.setSelectedInstallOptions(['husky']);

      await huskyIntegration();

      expect(fileSystem.readFile('.husky/commit-msg')).toBe('npx --no-install -- commitlint --edit "$1"\n');
    });
  });
});
