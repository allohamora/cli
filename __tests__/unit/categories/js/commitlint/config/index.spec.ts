import { getCommitlintConfig } from '#src/categories/js/commitlint/config/index.ts';
import { describe, expect, it } from 'vitest';

describe('commitlint/config', () => {
  it('returns conventional commitlint packages and config', () => {
    expect(getCommitlintConfig()).toEqual({
      rules: '@commitlint/config-conventional',
      config: { extends: ['@commitlint/config-conventional'] },
    });
  });
});
