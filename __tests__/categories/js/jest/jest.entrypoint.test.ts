import * as fs from '#src/utils/fs.ts';
import * as npm from '#src/utils/npm.ts';
import * as config from '#src/categories/js/jest/jest.config.ts';
import type { Config } from '#src/categories/js/jest/config/config.interface.ts';
import { jestEntrypoint } from '#src/categories/js/jest/jest.entrypoint.ts';

vi.mock('#src/utils/fs.ts');
const fsMocked = vi.mocked(fs);

vi.mock('#src/utils/npm.ts');
const npmMocked = vi.mocked(npm);

vi.mock('#src/categories/js/jest/jest.config.ts');
const configMocked = vi.mocked(config);

describe('jest', () => {
  const createConfig = ({ devDependencies = [], configFileContent = '', scripts = [] }: Partial<Config> = {}) => ({
    devDependencies,
    configFileContent,
    scripts,
  });

  let config = createConfig();

  beforeEach(() => {
    config = createConfig();
    configMocked.getConfig.mockReturnValueOnce(config);
  });

  test('should get config from getConfig', async () => {
    await jestEntrypoint();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should add config file to root', async () => {
    config.configFileContent = 'module.exports = {}';

    await jestEntrypoint();

    expect(fsMocked.addFileToRoot).toHaveBeenCalledWith('jest.config.cjs', config.configFileContent);
  });

  test('should add test scripts to package.json', async () => {
    config.scripts = [{ name: 'test', script: '__test__' }];

    await jestEntrypoint();

    expect(npmMocked.addScripts).toHaveBeenCalledWith(config.scripts[0]);
  });
});
