import { getDependabotPreset } from '#src/categories/js/dependabot/preset/index.ts';
import { describe, expect, it } from 'vitest';

describe('dependabot/preset', () => {
  it('returns the expected dependabot update schedule', () => {
    expect(getDependabotPreset().content).toEqual({
      version: 2,
      updates: [
        {
          'package-ecosystem': 'github-actions',
          directory: '/',
          schedule: {
            interval: 'weekly',
            day: 'monday',
          },
          cooldown: {
            'default-days': 3,
          },
          'open-pull-requests-limit': 10,
        },
        {
          'package-ecosystem': 'npm',
          directory: '/',
          schedule: {
            interval: 'weekly',
            day: 'monday',
          },
          cooldown: {
            'default-days': 3,
          },
          'open-pull-requests-limit': 0,
        },
      ],
    });
  });
});
