import { getCommitlintPreset } from '#src/categories/js/commitlint/preset/index.ts';
import { describe, expect, it } from 'vitest';

describe('commitlint/preset', () => {
  it('returns conventional commitlint packages and config', () => {
    expect(getCommitlintPreset()).toEqual({
      rules: '@commitlint/config-conventional',
      config: { extends: ['@commitlint/config-conventional'] },
    });
  });
});
