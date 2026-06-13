import { getDependabotPreset } from '#src/categories/js/dependabot/preset/index.ts';
import { describe, expect, it } from 'vitest';

describe('dependabot/preset', () => {
  it('returns the expected dependabot update schedule', () => {
    expect(getDependabotPreset().content).toBe(
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
