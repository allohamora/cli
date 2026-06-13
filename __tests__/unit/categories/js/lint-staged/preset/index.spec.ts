import { presetState, installationState } from '#__tests__/setup-test-context.ts';
import { getLintStagedPreset } from '#src/categories/js/lint-staged/preset/index.ts';
import type { LintStagedConfig } from '#src/categories/js/lint-staged/preset/preset.type.ts';
import { beforeEach, describe, expect, it } from 'vitest';

describe('lint-staged/preset', () => {
  const getMutatedConfig = async () => {
    const config = getLintStagedPreset();
    const lintStagedConfig: LintStagedConfig = { ...config.config };

    for (const mutation of config.mutations) {
      await mutation(lintStagedConfig);
    }

    return lintStagedConfig;
  };

  beforeEach(() => {
    presetState.setJsPreset('default');
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
    presetState.setJsPreset('node:ts');

    await expect(getMutatedConfig()).resolves.toEqual({
      '*.{js,cjs,mjs,json,yml,md}': 'prettier --write',
      '*.css': 'stylelint --fix',
      '*.ts': ['eslint --fix', 'jest --findRelatedTests'],
    });
  });

  it('returns react typescript lint-staged commands', async () => {
    presetState.setJsPreset('react:ts');

    await expect(getMutatedConfig()).resolves.toEqual({
      '*.{js,cjs,mjs,json,yml,md}': 'prettier --write',
      '*.{css,ts,tsx}': 'stylelint --fix',
      '*.{ts,tsx}': ['eslint --fix', 'jest --findRelatedTests'],
    });
  });
});
