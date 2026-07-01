import { fileSystem } from '#__tests__/setup-test-context.ts';
import { dependabot } from '#src/categories/js/dependabot/dependabot.installer.ts';
import { describe, expect, it } from 'vitest';

describe('dependabot.installer', () => {
  describe('dependabot', () => {
    it('writes the default dependabot config under .github', async () => {
      await dependabot();

      expect(fileSystem.getDirs()).toEqual(['.github']);
      expect(fileSystem.readFile('.github/dependabot.yml')).toBe(
        [
          'version: 2',
          'updates:',
          '  - package-ecosystem: github-actions',
          '    directory: /',
          '    schedule:',
          '      interval: weekly',
          '      day: monday',
          '    cooldown:',
          '      default-days: 3',
          '    open-pull-requests-limit: 10',
          '',
          '  - package-ecosystem: npm',
          '    directory: /',
          '    schedule:',
          '      interval: weekly',
          '      day: monday',
          '    cooldown:',
          '      default-days: 3',
          '    open-pull-requests-limit: 0',
          '',
        ].join('\n'),
      );
    });
  });
});
