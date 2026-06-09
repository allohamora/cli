import * as npm from '#src/utils/npm.ts';
import { husky } from '#src/categories/js/husky/husky.entrypoint.ts';
import { clearMock } from '#__tests__/test-utils/clear-mock.ts';

vi.mock('#src/utils/npm.ts');
const npmMocked = vi.mocked(npm);

beforeEach(() => {
  clearMock(npmMocked);
});

describe('husky', () => {
  test('should install husky dependency', async () => {
    await husky();

    expect(npmMocked.installDevelopmentDependencies).toHaveBeenCalledWith('husky');
  });

  test('should add husky prepare script', async () => {
    await husky();

    expect(npmMocked.addScripts).toHaveBeenCalledWith({ name: 'prepare', script: 'husky' });
  });

  test('should run prepare script', async () => {
    await husky();

    expect(npmMocked.runScript).toHaveBeenCalledWith('prepare');
  });
});
