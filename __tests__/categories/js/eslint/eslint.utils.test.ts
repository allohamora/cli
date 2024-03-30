import * as installed from 'src/utils/installed';
import * as prettierUtils from 'src/categories/js/prettier/prettier.utils';
import * as jestUtils from 'src/categories/js/jest/jest.utils';
import { prettierMutation, jestMutation } from 'src/categories/js/eslint/eslint.utils';
import { createConfig } from './eslint-test.utils';

jest.mock('src/utils/installed', () => ({
  ...jest.requireActual('src/utils/installed'),
  isInstalledAndInRootCheck: jest.fn().mockReturnValue(jest.fn()),
}));
const installedMocked = jest.mocked(installed);

const jestUtilsMocked = jest.mocked(jestUtils);
const prettierUtilsMocked = jest.mocked(prettierUtils);

beforeEach(() => {
  jest.mock('src/categories/js/jest/jest.utils');
  jest.mock('src/categories/js/prettier/prettier.utils');
});

afterEach(() => {
  jest.unmock('src/categories/js/jest/jest.utils');
  jest.unmock('src/categories/js/prettier/prettier.utils');
});

describe('prettierMutation', () => {
  test('should add prettier to empty config if prettier installed', async () => {
    prettierUtilsMocked.isPrettierInstalled.mockResolvedValueOnce(true);

    const actual = createConfig();

    await prettierMutation(actual);

    const expected = createConfig({
      dependencies: ['eslint-plugin-prettier', 'eslint-config-prettier'],
      eslintConfig: { extends: ['plugin:prettier/recommended'] },
    });

    expect(actual).toEqual(expected);
  });

  test('should add prettier to existed config if prettier installed', async () => {
    prettierUtilsMocked.isPrettierInstalled.mockResolvedValueOnce(true);

    const actual = createConfig({
      dependencies: ['__test__'],
      eslintConfig: { extends: ['__test__'] },
    });

    await prettierMutation(actual);

    const expected = createConfig({
      dependencies: ['__test__', 'eslint-plugin-prettier', 'eslint-config-prettier'],
      eslintConfig: { extends: ['__test__', 'plugin:prettier/recommended'] },
    });

    expect(actual).toEqual(expected);
  });
});

describe('jestMutation', () => {
  test('should add jest env if jest installed', async () => {
    const actual = createConfig({ eslintConfig: { env: {} } });
    const expected = createConfig({ eslintConfig: { env: { jest: true } } });

    jestUtilsMocked.isJestInstalled.mockResolvedValue(true);

    await jestMutation(actual);

    expect(actual).toEqual(expected);
  });

  test('should add jest env object if not exists', async () => {
    const actual = createConfig();
    const expected = createConfig({ eslintConfig: { env: { jest: true } } });

    jestUtilsMocked.isJestInstalled.mockResolvedValueOnce(true);

    await jestMutation(actual);

    expect(actual).toEqual(expected);
  });

  test('should not add jest if jest is not installed', async () => {
    const actual = createConfig();
    const expected = createConfig();

    jestUtilsMocked.isJestInstalled.mockResolvedValueOnce(false);

    await jestMutation(actual);

    expect(actual).toEqual(expected);
  });
});

describe('isEslintInstalled', () => {
  test('should call isInstalledAndInRootCheck with eslint and .eslintrc.json', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toHaveBeenCalledWith('eslint', '.eslintrc.json');
  });
});
