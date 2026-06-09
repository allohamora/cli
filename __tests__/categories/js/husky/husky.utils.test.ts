import * as installed from '#src/utils/installed.ts';
import * as fs from '#src/utils/fs.ts';
import fsp from 'node:fs/promises';
import { addHook } from '#src/categories/js/husky/husky.utils.ts';
import { clearMock } from '#__tests__/test-utils/clear-mock.ts';

vi.mock('#src/utils/installed.ts', async (importOriginal) => ({
  ...(await importOriginal()),
  isInstalledAndInRootCheck: vi.fn().mockReturnValue(vi.fn()),
}));
const installedMocked = vi.mocked(installed);

vi.mock('node:fs/promises');
const fspMocked = vi.mocked(fsp);

vi.mock('#src/utils/fs.ts');
const fsMocked = vi.mocked(fs);

beforeEach(() => {
  clearMock(fsMocked);
  clearMock(fspMocked);
});

describe('addHook', () => {
  test('should create hook with placeholder and replace it content to correct', async () => {
    const hookType = 'commit-msg';
    const script = 'npx run __test__';
    const placeholder = 'placeholder';
    fspMocked.readFile.mockResolvedValueOnce(placeholder);

    await addHook(hookType, script);

    expect(fsMocked.addFileToRoot).toHaveBeenCalledWith(`.husky/${hookType}`, script);
  });
});

describe('isHuskyInstalled', () => {
  test('should use isInstalledAndInRootCheck with husky and .husky', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toHaveBeenCalledWith('husky', '.husky');
  });
});
