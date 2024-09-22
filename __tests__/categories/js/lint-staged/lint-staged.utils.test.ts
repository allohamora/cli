import * as huskyUtils from 'src/categories/js/husky/husky.utils';
import * as prettierUtils from 'src/categories/js/prettier/prettier.utils';
import * as jestUtils from 'src/categories/js/jest/jest.utils';
import * as eslintUtils from 'src/categories/js/eslint/eslint.utils';
import * as stylelintUtils from 'src/categories/js/stylelint/stylelint.utils';
import {
  addOptionToLintStagedConfig,
  huskyIntegration,
  jestMutation,
  eslintMutation,
  prettierMutation,
  stylelintMutation,
} from 'src/categories/js/lint-staged/lint-staged.utils';

jest.mock('src/categories/js/husky/husky.utils');
const huskyUtilsMocked = jest.mocked(huskyUtils);

jest.mock('src/categories/js/prettier/prettier.utils');
const prettierUtilsMocked = jest.mocked(prettierUtils);

jest.mock('src/categories/js/jest/jest.utils');
const jestUtilsMocked = jest.mocked(jestUtils);

jest.mock('src/categories/js/eslint/eslint.utils');
const eslintUtilsMocked = jest.mocked(eslintUtils);

jest.mock('src/categories/js/stylelint/stylelint.utils');
const stylelintUtilsMocked = jest.mocked(stylelintUtils);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('addOptionToLintStagedConfig', () => {
  test('should add string option if config[key] is undefined', () => {
    const key = '*.ts';
    const value = 'eslint --fix';

    const actual = {};
    addOptionToLintStagedConfig(actual, key, value);

    const expected = { [key]: value };

    expect(actual).toEqual(expected);
  });

  test('should add array option if config[key] is string', () => {
    const key = '*.js';
    const value = 'jest --findRelatedTests';
    const nextValue = '__test__';

    const actual = { [key]: value };
    addOptionToLintStagedConfig(actual, key, nextValue);

    const expected = { [key]: [value, nextValue] };

    expect(actual).toEqual(expected);
  });

  test('should add option to array if config[key] is array', () => {
    const key = '*.js';
    const values = ['__test__', '__test__2'];
    const nextValue = '__test__3';

    const actual = { [key]: values };
    addOptionToLintStagedConfig(actual, key, nextValue);

    const expected = { [key]: [...values, nextValue] };

    expect(actual).toEqual(expected);
  });

  test('should store only unique values', () => {
    const key = '*.ts';
    const values = ['__test__'];
    const nextValue = values[0];

    const actual = { [key]: values };
    addOptionToLintStagedConfig(actual, key, nextValue);

    const expected = { [key]: [nextValue] };

    expect(actual).toEqual(expected);
  });

  test('should store string option if added value is not unique', () => {
    const key = '*.ts';
    const value = '__test__';
    const nextValue = value;

    const actual = { [key]: value };
    addOptionToLintStagedConfig(actual, key, nextValue);

    const expected = { [key]: nextValue };

    expect(actual).toEqual(expected);
  });

  test('should throw error if received invalid config', () => {
    const key = '*.ts';
    const value = '__test__';
    const actual = { [key]: {} };

    expect(() => addOptionToLintStagedConfig(actual, key, value)).toThrow();
  });
});

describe('huskyIntegration', () => {
  test('should add hook if husky installed', async () => {
    huskyUtilsMocked.isHuskyInstalled.mockResolvedValueOnce(true);

    await huskyIntegration();

    expect(huskyUtilsMocked.addHook).toHaveBeenCalledWith('pre-commit', 'npx --no-install lint-staged');
  });

  test('should not add hook if husky not installed', async () => {
    huskyUtilsMocked.isHuskyInstalled.mockResolvedValueOnce(false);

    await huskyIntegration();

    expect(huskyUtilsMocked.addHook).not.toHaveBeenCalled();
  });
});

describe('jestMutation', () => {
  test('should mutate config if jest installed', async () => {
    const ext = '*.js';
    const actual = {};
    jestUtilsMocked.isJestInstalled.mockResolvedValueOnce(true);

    await jestMutation(ext)(actual);

    const expected = { [ext]: 'jest --findRelatedTests' };

    expect(actual).toEqual(expected);
  });

  test('should not mutate config if jest not installed', async () => {
    const ext = '*.js';
    const actual = {};
    jestUtilsMocked.isJestInstalled.mockResolvedValueOnce(false);

    await jestMutation(ext)(actual);

    const expected = {};

    expect(actual).toEqual(expected);
  });
});

describe('eslintMutation', () => {
  test('should mutate config if eslint installed', async () => {
    const ext = '*.js';
    const actual = {};
    eslintUtilsMocked.isEslintInstalled.mockResolvedValueOnce(true);

    await eslintMutation(ext)(actual);

    const expected = { [ext]: 'eslint --fix' };

    expect(actual).toEqual(expected);
  });

  test('should not mutate config is eslint not installed', async () => {
    const ext = '*.js';
    const actual = {};
    eslintUtilsMocked.isEslintInstalled.mockResolvedValueOnce(false);

    await eslintMutation(ext)(actual);

    const expected = {};

    expect(actual).toEqual(expected);
  });
});

describe('prettierMutation', () => {
  test('should mutate config if prettier installed', async () => {
    const ext = '*.{js,cjs,mjs,json,yml,md}';
    const actual = {};
    prettierUtilsMocked.isPrettierInstalled.mockResolvedValueOnce(true);

    await prettierMutation(actual);

    const expected = { [ext]: 'prettier --write' };

    expect(actual).toEqual(expected);
  });

  test('should not mutate config if prettier not installed', async () => {
    const actual = {};
    prettierUtilsMocked.isPrettierInstalled.mockResolvedValueOnce(false);

    await prettierMutation(actual);

    const expected = {};

    expect(actual).toEqual(expected);
  });
});

describe('stylelintMutation', () => {
  test('should mutate config if stylelint installed', async () => {
    const ext = '*.{css,ts,tsx}';
    const actual = {};
    stylelintUtilsMocked.isStylelintInstalled.mockResolvedValueOnce(true);

    await stylelintMutation(ext)(actual);

    const expected = { [ext]: 'stylelint --fix' };

    expect(actual).toEqual(expected);
  });

  test('should not mutate config if stylelint is not installed', async () => {
    const ext = '*.{css,ts,tsx}';
    const actual = {};
    stylelintUtilsMocked.isStylelintInstalled.mockResolvedValueOnce(false);

    await stylelintMutation(ext)(actual);

    const expected = {};

    expect(actual).toEqual(expected);
  });
});
