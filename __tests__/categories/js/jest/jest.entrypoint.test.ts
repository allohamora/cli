import * as fs from 'src/utils/fs';
import * as npm from 'src/utils/npm';
import * as config from 'src/categories/js/jest/jest.config';
import { Config } from 'src/categories/js/jest/config/config.interface';
import { jestEntrypoint } from 'src/categories/js/jest/jest.entrypoint';

jest.mock('src/utils/fs');
const fsMocked = jest.mocked(fs);

jest.mock('src/utils/npm');
const npmMocked = jest.mocked(npm);

jest.mock('src/categories/js/jest/jest.config');
const configMocked = jest.mocked(config);

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
