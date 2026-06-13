import { getDependabotConfig } from '#src/categories/js/dependabot/config/index.ts';
import { describe, expect, it } from 'vitest';

describe('dependabot/config', () => {
  it('returns the expected dependabot update schedule', () => {
    expect(getDependabotConfig().content).toBe(
      [
        'version: 2',
        'updates:',
        '  - package-ecosystem: "github-actions"',
        '    directory: "/"',
        '    schedule:',
        '      interval: "weekly"',
        '      day: "monday"',
        '    open-pull-requests-limit: 10',
        '',
        '  - package-ecosystem: npm',
        '    directory: "/"',
        '    schedule:',
        '      interval: "weekly"',
        '      day: "monday"',
        '    open-pull-requests-limit: 0',
      ].join('\n'),
    );
  });
});
