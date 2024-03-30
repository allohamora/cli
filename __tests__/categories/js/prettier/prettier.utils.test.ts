import * as installed from 'src/utils/installed';
import 'src/categories/js/prettier/prettier.utils';

jest.mock('src/utils/installed', () => ({
  ...jest.requireActual('src/utils/installed'),
  isInstalledAndInRootCheck: jest.fn().mockImplementation(jest.fn()),
}));
const installedMocked = jest.mocked(installed);

describe('isPrettierInstalled', () => {
  test('should use isInstalledAndInRootCheck with prettier and .prettierrc', () => {
    expect(installedMocked.isInstalledAndInRootCheck).toHaveBeenCalledWith('prettier', '.prettierrc');
  });
});
