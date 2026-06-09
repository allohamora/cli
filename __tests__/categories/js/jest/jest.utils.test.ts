import * as installed from '#src/utils/installed.ts';
import '#src/categories/js/jest/jest.utils.ts';

vi.mock('#src/utils/installed.ts', async (importOriginal) => ({
  ...(await importOriginal()),
  isInstalledAndInRootCheck: vi.fn().mockImplementation(vi.fn()),
}));
const installedMocked = vi.mocked(installed);

describe('isJestInstalled', () => {
  test('should use isInstalledAndInRootCheck with jest and jest.config.cjs', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toHaveBeenCalledWith('jest', 'jest.config.cjs');
  });
});
