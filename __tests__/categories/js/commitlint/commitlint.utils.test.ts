import * as huskyUtils from 'src/categories/js/husky/husky.utils';
import { huskyIntegration } from 'src/categories/js/commitlint/commitlint.utils';

jest.mock('src/categories/js/husky/husky.utils');
const huskyUtilsMocked = jest.mocked(huskyUtils);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('huskyIntegration', () => {
  test('should do not run addHook if husky is not installed', async () => {
    huskyUtilsMocked.isHuskyInstalled.mockResolvedValueOnce(false);

    await huskyIntegration();

    expect(huskyUtilsMocked.isHuskyInstalled).toBeCalled();
    expect(huskyUtilsMocked.addHook).not.toBeCalled();
  });

  test('should run addHook if husky installed', async () => {
    huskyUtilsMocked.isHuskyInstalled.mockResolvedValueOnce(true);

    await huskyIntegration();

    expect(huskyUtilsMocked.isHuskyInstalled).toBeCalled();
    expect(huskyUtilsMocked.addHook).toBeCalledWith('commit-msg', 'npx --no-install -- commitlint --edit "$1"');
  });
});
