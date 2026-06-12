import { fileSystem, installationState } from '#__tests__/setup-test-context.ts';
import {
  addOptionToLintStagedConfig,
  huskyIntegration,
  jestMutation,
  eslintMutation,
  prettierMutation,
  stylelintMutation,
} from '#src/categories/js/lint-staged/lint-staged.service.ts';
import type { LintStagedConfig } from '#src/categories/js/lint-staged/config/config.interface.ts';

describe('lint-staged.service', () => {
  describe('addOptionToLintStagedConfig', () => {
    it('adds string option if config[key] is undefined', () => {
      const key = '*.ts';
      const value = 'eslint --fix';

      const actual = {};
      addOptionToLintStagedConfig(actual, key, value);

      const expected = { [key]: value };

      expect(actual).toEqual(expected);
    });

    it('adds array option if config[key] is string', () => {
      const key = '*.js';
      const value = 'jest --findRelatedTests';
      const nextValue = '__test__';

      const actual = { [key]: value };
      addOptionToLintStagedConfig(actual, key, nextValue);

      const expected = { [key]: [value, nextValue] };

      expect(actual).toEqual(expected);
    });

    it('adds option to array if config[key] is array', () => {
      const key = '*.js';
      const values = ['__test__', '__test__2'];
      const nextValue = '__test__3';

      const actual = { [key]: values };
      addOptionToLintStagedConfig(actual, key, nextValue);

      const expected = { [key]: [...values, nextValue] };

      expect(actual).toEqual(expected);
    });

    it('stores only unique values', () => {
      const key = '*.ts';
      const values = ['__test__'];
      const nextValue = values[0]!;

      const actual = { [key]: values };
      addOptionToLintStagedConfig(actual, key, nextValue);

      const expected = { [key]: [nextValue] };

      expect(actual).toEqual(expected);
    });

    it('stores string option if added value is not unique', () => {
      const key = '*.ts';
      const value = '__test__';
      const nextValue = value;

      const actual = { [key]: value };
      addOptionToLintStagedConfig(actual, key, nextValue);

      const expected = { [key]: nextValue };

      expect(actual).toEqual(expected);
    });

    it('throws error if received invalid config', () => {
      const key = '*.ts';
      const value = '__test__';
      const actual = { [key]: {} } as unknown as LintStagedConfig;

      expect(() => addOptionToLintStagedConfig(actual, key, value)).toThrow();
    });
  });

  describe('huskyIntegration', () => {
    it('adds hook if husky installed', async () => {
      installationState.setSelectedInstallOptions(['husky']);

      await huskyIntegration();

      expect(fileSystem.readFile('.husky/pre-commit')).toBe('npx --no-install lint-staged\n');
    });

    it('does not add hook if husky not installed', async () => {
      await huskyIntegration();

      expect(fileSystem.readFile('.husky/pre-commit')).toBeUndefined();
    });
  });

  describe('jestMutation', () => {
    it('mutates config if jest installed', async () => {
      const ext = '*.js';
      const actual = {};
      installationState.setSelectedInstallOptions(['jest']);

      await jestMutation(ext)(actual);

      const expected = { [ext]: 'jest --findRelatedTests' };

      expect(actual).toEqual(expected);
    });

    it('does not mutate config if jest not installed', async () => {
      const ext = '*.js';
      const actual = {};
      await jestMutation(ext)(actual);

      const expected = {};

      expect(actual).toEqual(expected);
    });
  });

  describe('eslintMutation', () => {
    it('mutates config if eslint installed', async () => {
      const ext = '*.js';
      const actual = {};
      installationState.setSelectedInstallOptions(['eslint']);

      await eslintMutation(ext)(actual);

      const expected = { [ext]: 'eslint --fix' };

      expect(actual).toEqual(expected);
    });

    it('does not mutate config if eslint not installed', async () => {
      const ext = '*.js';
      const actual = {};
      await eslintMutation(ext)(actual);

      const expected = {};

      expect(actual).toEqual(expected);
    });
  });

  describe('prettierMutation', () => {
    it('mutates config if prettier installed', async () => {
      const ext = '*.{js,cjs,mjs,json,yml,md}';
      const actual = {};
      installationState.setSelectedInstallOptions(['prettier']);

      await prettierMutation(actual);

      const expected = { [ext]: 'prettier --write' };

      expect(actual).toEqual(expected);
    });

    it('does not mutate config if prettier not installed', async () => {
      const actual = {};
      await prettierMutation(actual);

      const expected = {};

      expect(actual).toEqual(expected);
    });
  });

  describe('stylelintMutation', () => {
    it('mutates config if stylelint installed', async () => {
      const ext = '*.{css,ts,tsx}';
      const actual = {};
      installationState.setSelectedInstallOptions(['stylelint']);

      await stylelintMutation(ext)(actual);

      const expected = { [ext]: 'stylelint --fix' };

      expect(actual).toEqual(expected);
    });

    it('does not mutate config if stylelint is not installed', async () => {
      const ext = '*.{css,ts,tsx}';
      const actual = {};
      await stylelintMutation(ext)(actual);

      const expected = {};

      expect(actual).toEqual(expected);
    });
  });
});
