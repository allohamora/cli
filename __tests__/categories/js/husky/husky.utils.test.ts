import * as runCommand from 'src/utils/run-command';
import * as installed from 'src/utils/installed';
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

beforeEach(() => {
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

    expect(fspMocked.writeFile).toBeCalledWith(rootPath(`.husky/${hookType}`), script, { encoding: 'utf-8' });
  });
});

describe('isHuskyInstalled', () => {
  test('should use isInstalledAndInRootCheck with husky and .husky', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toBeCalledWith('husky', '.husky');
  });
});
