import * as installed from '#src/utils/installed.ts';
import * as prettierUtils from '#src/categories/js/prettier/prettier.utils.ts';
import { prettierMutation } from '#src/categories/js/stylelint/stylelint.utils.ts';
import type { Config } from '#src/categories/js/stylelint/config/config.interface.ts';

vi.mock('#src/utils/installed.ts', async (importOriginal) => ({
  ...(await importOriginal()),
  isInstalledAndInRootCheck: vi.fn().mockImplementation(vi.fn()),
}));
const installedMocked = vi.mocked(installed);

vi.mock('#src/categories/js/prettier/prettier.utils.ts', () => ({
  isPrettierInstalled: vi.fn(),
}));
const prettierUtilsMocked = vi.mocked(prettierUtils);

afterEach(() => {
  vi.clearAllMocks();
});

describe('isStylelintInstalled', () => {
  test('should use isInstalledAndInRootCheck with stylelint and .stylelintrc', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toHaveBeenCalledWith('stylelint', '.stylelintrc');
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
