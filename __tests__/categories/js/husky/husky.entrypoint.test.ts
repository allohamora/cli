import * as npm from 'src/utils/npm';
import * as runCommand from 'src/utils/run-command';
import { husky } from 'src/categories/js/husky/husky.entrypoint';
import { clearMock } from '__tests__/test-utils/clear-mock';

jest.mock('src/utils/npm');
const npmMocked = jest.mocked(npm);

jest.mock('src/utils/run-command');
const runCommandMocked = jest.mocked(runCommand);

beforeEach(() => {
  clearMock(npmMocked);
  clearMock(runCommandMocked);
});

describe('husky', () => {
  test('should install husky dependency', async () => {
    await husky();

    expect(npmMocked.installDevelopmentDependencies).toHaveBeenCalledWith('husky');
  });

  test('should run husky init', async () => {
    await husky();

    expect(runCommandMocked.runCommand).toHaveBeenCalledWith('npx husky init');
  });
});
