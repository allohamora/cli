import * as runCommand from 'src/utils/run-command';
import * as installed from 'src/utils/installed';
import * as fsUtils from 'src/utils/fs';
import fsp from 'node:fs/promises';
import { addHook } from 'src/categories/js/husky/husky.utils';
import { clearMock } from '__tests__/test-utils/clear-mock';
import { rootPath } from 'src/utils/path';

jest.mock('src/utils/installed', () => ({
  ...jest.requireActual('src/utils/installed'),
  isInstalledAndInRootCheck: jest.fn().mockReturnValue(jest.fn()),
}));
const installedMocked = jest.mocked(installed);

jest.mock('node:fs/promises');
const fspMocked = jest.mocked(fsp);

jest.mock('src/utils/run-command');
const runCommandMocked = jest.mocked(runCommand);

jest.mock('src/utils/fs');
const fsUtilsMocked = jest.mocked(fsUtils);

beforeEach(() => {
  clearMock(fspMocked);
  clearMock(runCommandMocked);
  clearMock(fsUtilsMocked);
});

describe('addHook', () => {
  test('should create hook with placeholder and replace it content to correct', async () => {
    const hookType = 'commit-msg';
    const script = 'npx run __test__';
    const placeholder = 'placeholder';
    fspMocked.readFile.mockResolvedValueOnce(placeholder);

    await addHook(hookType, script);

    expect(fsUtilsMocked.addDirToRootIfNotExists).toHaveBeenCalledWith('.husky');
    expect(fspMocked.writeFile).toHaveBeenCalledWith(rootPath(`.husky/${hookType}`), script, { encoding: 'utf-8' });
  });
});

describe('isHuskyInstalled', () => {
  test('should use isInstalledAndInRootCheck with husky and .husky', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toHaveBeenCalledWith('husky', '.husky');
  });
});
