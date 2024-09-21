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
      imports: [`import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'`],
      configs: ['eslintPluginPrettierRecommended'],
    });

    expect(actual).toEqual(expected);
  });

  test('should add prettier to existed config if prettier installed', async () => {
    prettierUtilsMocked.isPrettierInstalled.mockResolvedValueOnce(true);

    const actual = createConfig({
      dependencies: ['__test__'],
      imports: ['__test__'],
      configs: ['__test__'],
    });

    await prettierMutation(actual);

    const expected = createConfig({
      dependencies: ['__test__', 'eslint-plugin-prettier', 'eslint-config-prettier'],
      imports: ['__test__', `import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'`],
      configs: ['__test__', 'eslintPluginPrettierRecommended'],
    });

    expect(actual).toEqual(expected);
  });
});

describe('jestMutation', () => {
  test('should add jest env if jest installed', async () => {
    const actual = createConfig({ eslintConfig: { languageOptions: { globals: [] } } });
    const expected = createConfig({ eslintConfig: { languageOptions: { globals: ['jest'] } } });

    jestUtilsMocked.isJestInstalled.mockResolvedValue(true);

    await jestMutation(actual);

    expect(actual).toEqual(expected);
  });

  test('should add jest env object if not exists', async () => {
    const actual = createConfig();
    const expected = createConfig({ eslintConfig: { languageOptions: { globals: ['jest'] } } });

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
  test('should call isInstalledAndInRootCheck with eslint and eslint.config.mjs', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toHaveBeenCalledWith('eslint', 'eslint.config.mjs');
  });
});
