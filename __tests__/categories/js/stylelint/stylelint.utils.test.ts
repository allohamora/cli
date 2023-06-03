import * as installed from 'src/utils/installed';
import * as prettierUtils from 'src/categories/js/prettier/prettier.utils';
import { prettierMutation } from 'src/categories/js/stylelint/stylelint.utils';
import { Config } from 'src/categories/js/stylelint/config/config.interface';

jest.mock('src/utils/installed', () => ({
  ...jest.requireActual('src/utils/installed'),
  isInstalledAndInRootCheck: jest.fn().mockImplementation(jest.fn()),
}));
const installedMocked = jest.mocked(installed);

jest.mock('src/categories/js/prettier/prettier.utils', () => ({
  isPrettierInstalled: jest.fn(),
}));
const prettierUtilsMocked = jest.mocked(prettierUtils);

afterEach(() => {
  jest.clearAllMocks();
});

describe('isStylelintInstalled', () => {
  test('should use isInstalledAndInRootCheck with stylelint and .stylelintrc', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toBeCalledWith('stylelint', '.stylelintrc');
  });
});

describe('prettierMutation', () => {
  test('should add stylelint-prettier dependencies and prettier config', async () => {
    const actual = { devDependencies: [], stylelintConfig: { extends: [] } };
    prettierUtilsMocked.isPrettierInstalled.mockResolvedValueOnce(true);

    await prettierMutation(actual as unknown as Config);

    const expected = {
      devDependencies: ['stylelint-prettier'],
      stylelintConfig: { extends: ['stylelint-prettier/recommended'] },
    };

    expect(actual).toEqual(expected);
  });

  test('should not add stylelint-prettier dependencies and prettier config if prettier is not installed', async () => {
    const actual = { devDependencies: [], stylelintConfig: { extends: [] } };
    prettierUtilsMocked.isPrettierInstalled.mockResolvedValueOnce(false);

    await prettierMutation(actual as unknown as Config);

    const expected = { devDependencies: [], stylelintConfig: { extends: [] } };

    expect(actual).toEqual(expected);
  });
});
