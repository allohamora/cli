import * as runCommandUtils from 'src/utils/run-command';
import { getNodeVersion } from 'src/utils/node';

jest.mock('src/utils/run-command');
const runCommandUtilsMocked = jest.mocked(runCommandUtils);

describe('getNodeVersion', () => {
  test('should return nodejs version', async () => {
    const expected = '16.14.2';

    runCommandUtilsMocked.runCommand.mockResolvedValueOnce(`v${expected}\n`);

    const actual = await getNodeVersion();

    expect(actual).toBe(expected);
    expect(runCommandUtilsMocked.runCommand).toBeCalledWith('node -v');
  });
});
