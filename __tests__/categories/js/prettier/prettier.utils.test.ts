import * as installed from 'src/utils/installed';
import 'src/categories/js/prettier/prettier.utils';

vi.mock('src/utils/installed', async (importOriginal) => ({
  ...(await importOriginal()),
  isInstalledAndInRootCheck: vi.fn().mockImplementation(vi.fn()),
}));
const installedMocked = vi.mocked(installed);

describe('isPrettierInstalled', () => {
  test('should use isInstalledAndInRootCheck with prettier and .prettierrc', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toHaveBeenCalledWith('prettier', '.prettierrc');
  });
});
