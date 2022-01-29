import * as installed from 'src/utils/installed';
import 'src/categories/js/jest/jest.utils';

jest.mock('src/utils/installed', () => ({
  ...jest.requireActual('src/utils/installed'),
  isInstalledAndInRootCheck: jest.fn().mockImplementation(jest.fn()),
}));
const installedMocked = jest.mocked(installed);

describe('isJestInstalled', () => {
  test('should use isInstalledAndInRootCheck with jest and jest.config.cjs', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toBeCalledWith('jest', 'jest.config.cjs');
  });
});
