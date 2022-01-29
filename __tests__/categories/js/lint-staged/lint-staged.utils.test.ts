import * as huskyUtils from 'src/categories/js/husky/husky.utils';
import * as prettierUtils from 'src/categories/js/prettier/prettier.utils';
import * as jestUtils from 'src/categories/js/jest/jest.utils';
import * as eslintUtils from 'src/categories/js/eslint/eslint.utils';
import {
  addOptionToLintStagedConfig,
  huskyIntegration,
  jestMutator,
  eslintMutator,
  prettierMutator,
} from 'src/categories/js/lint-staged/lint-staged.utils';

jest.mock('src/categories/js/husky/husky.utils');
const huskyUtilsMocked = jest.mocked(huskyUtils);

jest.mock('src/categories/js/prettier/prettier.utils');
const prettierUtilsMocked = jest.mocked(prettierUtils);

jest.mock('src/categories/js/jest/jest.utils');
const jestUtilsMocked = jest.mocked(jestUtils);

jest.mock('src/categories/js/eslint/eslint.utils');
const eslintUtilsMocked = jest.mocked(eslintUtils);

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

    expect(() => addOptionToLintStagedConfig(actual, key, value)).toThrowError();
  });
});

describe('huskyIntegration', () => {
  test('should add hook if husky installed', async () => {
    huskyUtilsMocked.isHuskyInstalled.mockResolvedValueOnce(true);

    await huskyIntegration();

    expect(huskyUtilsMocked.addHook).toBeCalledWith('pre-commit', 'npx --no-install lint-staged');
  });

  test('should not add hook if husky not installed', async () => {
    huskyUtilsMocked.isHuskyInstalled.mockResolvedValueOnce(false);

    await huskyIntegration();

    expect(huskyUtilsMocked.addHook).not.toBeCalled();
  });
});

describe('jestMutator', () => {
  test('should mutate config if jest installed', async () => {
    const ext = '*.js';
    const actual = {};
    jestUtilsMocked.isJestInstalled.mockResolvedValueOnce(true);

    await jestMutator(ext)(actual);

    const expected = { [ext]: 'jest --findRelatedTests' };

    expect(actual).toEqual(expected);
  });

  test('should not mutate config if jest not installed', async () => {
    const ext = '*.js';
    const actual = {};
    jestUtilsMocked.isJestInstalled.mockResolvedValueOnce(false);

    await jestMutator(ext)(actual);

    const expected = {};

    expect(actual).toEqual(expected);
  });
});

describe('eslintMutator', () => {
  test('should mutate config if eslint installed', async () => {
    const ext = '*.js';
    const actual = {};
    eslintUtilsMocked.isEslintInstalled.mockResolvedValueOnce(true);

    await eslintMutator(ext)(actual);

    const expected = { [ext]: 'eslint --fix' };

    expect(actual).toEqual(expected);
  });

  test('should not mutate config is eslint not installed', async () => {
    const ext = '*.js';
    const actual = {};
    eslintUtilsMocked.isEslintInstalled.mockResolvedValueOnce(false);

    await eslintMutator(ext)(actual);

    const expected = {};

    expect(actual).toEqual(expected);
  });
});

describe('prettierMutator', () => {
  test('should mutate config if prettier installed', async () => {
    const ext = '*.{js,json,yml,md}';
    const actual = {};
    prettierUtilsMocked.isPrettierInstalled.mockResolvedValueOnce(true);

    await prettierMutator(actual);

    const expected = { [ext]: 'prettier --write' };

    expect(actual).toEqual(expected);
  });

  test('should not mutate config if prettier not installed', async () => {
    const actual = {};
    prettierUtilsMocked.isPrettierInstalled.mockResolvedValueOnce(false);

    await prettierMutator(actual);

    const expected = {};

    expect(actual).toEqual(expected);
  });
});
