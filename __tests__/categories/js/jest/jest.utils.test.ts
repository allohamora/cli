import * as installed from 'src/utils/installed';
import 'src/categories/js/jest/jest.utils';

vi.mock('src/utils/installed', async (importOriginal) => ({
  ...(await importOriginal()),
  isInstalledAndInRootCheck: vi.fn().mockImplementation(vi.fn()),
}));
const installedMocked = vi.mocked(installed);

describe('isJestInstalled', () => {
  test('should use isInstalledAndInRootCheck with jest and jest.config.cjs', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toHaveBeenCalledWith('jest', 'jest.config.cjs');
  });
});
