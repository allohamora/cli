import { getConfig } from '#src/categories/js/commitlint/commitlint.config.ts';

describe('commitlint.config', () => {
  it('returns conventional commitlint packages and config', () => {
    expect(getConfig()).toEqual({
      rules: '@commitlint/config-conventional',
      config: { extends: ['@commitlint/config-conventional'] },
    });
  });
});
