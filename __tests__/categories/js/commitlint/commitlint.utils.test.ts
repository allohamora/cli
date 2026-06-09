import * as huskyUtils from 'src/categories/js/husky/husky.utils';
import { huskyIntegration } from 'src/categories/js/commitlint/commitlint.utils';

vi.mock('src/categories/js/husky/husky.utils');
const huskyUtilsMocked = vi.mocked(huskyUtils);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('huskyIntegration', () => {
  test('should do not run addHook if husky is not installed', async () => {
    huskyUtilsMocked.isHuskyInstalled.mockResolvedValueOnce(false);

    await huskyIntegration();

    expect(huskyUtilsMocked.isHuskyInstalled).toHaveBeenCalled();
    expect(huskyUtilsMocked.addHook).not.toHaveBeenCalled();
  });

  test('should run addHook if husky installed', async () => {
    huskyUtilsMocked.isHuskyInstalled.mockResolvedValueOnce(true);

    await huskyIntegration();

    expect(huskyUtilsMocked.isHuskyInstalled).toHaveBeenCalled();
    expect(huskyUtilsMocked.addHook).toHaveBeenCalledWith('commit-msg', 'npx --no-install -- commitlint --edit "$1"');
  });
});
