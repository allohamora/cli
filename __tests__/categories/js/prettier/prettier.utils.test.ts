import * as installed from '#src/utils/installed.ts';
import '#src/categories/js/prettier/prettier.utils.ts';

vi.mock('#src/utils/installed.ts', async (importOriginal) => ({
  ...(await importOriginal()),
  isInstalledAndInRootCheck: vi.fn().mockImplementation(vi.fn()),
}));
const installedMocked = vi.mocked(installed);

describe('isPrettierInstalled', () => {
  test('should use isInstalledAndInRootCheck with prettier and .prettierrc', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toHaveBeenCalledWith('prettier', '.prettierrc');
  });
});
