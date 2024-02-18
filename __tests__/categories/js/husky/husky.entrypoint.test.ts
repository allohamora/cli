import * as npm from 'src/utils/npm';
import { husky } from 'src/categories/js/husky/husky.entrypoint';
import { clearMock } from '__tests__/test-utils/clear-mock';

jest.mock('src/utils/npm');
const npmMocked = jest.mocked(npm);

beforeEach(() => {
  clearMock(npmMocked);
});

describe('husky', () => {
  test('should install husky dependency', async () => {
    await husky();

    expect(npmMocked.installDevelopmentDependencies).toBeCalledWith('husky');
  });

  test('should add husky prepare script', async () => {
    await husky();

    expect(npmMocked.addScripts).toBeCalledWith({ name: 'prepare', script: 'husky' });
  });

  test('should run prepare script', async () => {
    await husky();

    expect(npmMocked.runScript).toBeCalledWith('prepare');
  });
});
