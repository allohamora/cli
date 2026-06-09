import * as runCommand from 'src/utils/run-command';
import * as installed from 'src/utils/installed';
import * as fs from 'src/utils/fs';
import fsp from 'node:fs/promises';
import { addHook } from 'src/categories/js/husky/husky.utils';
import { clearMock } from '__tests__/test-utils/clear-mock';

vi.mock('src/utils/installed', async (importOriginal) => ({
  ...(await importOriginal()),
  isInstalledAndInRootCheck: vi.fn().mockReturnValue(vi.fn()),
}));
const installedMocked = vi.mocked(installed);

vi.mock('node:fs/promises');
const fspMocked = vi.mocked(fsp);

vi.mock('src/utils/fs');
const fsMocked = vi.mocked(fs);

vi.mock('src/utils/run-command');
const runCommandMocked = vi.mocked(runCommand);

beforeEach(() => {
  clearMock(fsMocked);
  clearMock(fspMocked);
  clearMock(runCommandMocked);
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
