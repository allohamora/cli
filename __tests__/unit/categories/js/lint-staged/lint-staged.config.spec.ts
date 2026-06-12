import { configState, installationState } from '#__tests__/setup-test-context.ts';
import { getConfig } from '#src/categories/js/lint-staged/lint-staged.config.ts';
import type { LintStagedConfig } from '#src/categories/js/lint-staged/config/config.interface.ts';

describe('lint-staged.config', () => {
  const getMutatedConfig = async () => {
    const config = getConfig();
    const lintStagedConfig: LintStagedConfig = { ...config.config };

    for (const mutation of config.mutations) {
      await mutation(lintStagedConfig);
    }

    return lintStagedConfig;
  };

  beforeEach(() => {
    configState.setConfig('default');
    installationState.setSelectedInstallOptions(['prettier', 'stylelint', 'eslint', 'jest']);
  });

  it('returns default javascript lint-staged commands', async () => {
    await expect(getMutatedConfig()).resolves.toEqual({
      '*.{js,cjs,mjs,json,yml,md}': 'prettier --write',
      '*.css': 'stylelint --fix',
      '*.js': ['eslint --fix', 'jest --findRelatedTests'],
    });
  });

  it('returns node typescript lint-staged commands', async () => {
    configState.setConfig('node:ts');

    await expect(getMutatedConfig()).resolves.toEqual({
      '*.{js,cjs,mjs,json,yml,md}': 'prettier --write',
      '*.css': 'stylelint --fix',
      '*.ts': ['eslint --fix', 'jest --findRelatedTests'],
    });
  });

  it('returns react typescript lint-staged commands', async () => {
    configState.setConfig('react:ts');

    await expect(getMutatedConfig()).resolves.toEqual({
      '*.{js,cjs,mjs,json,yml,md}': 'prettier --write',
      '*.{css,ts,tsx}': 'stylelint --fix',
      '*.{ts,tsx}': ['eslint --fix', 'jest --findRelatedTests'],
    });
  });
});
