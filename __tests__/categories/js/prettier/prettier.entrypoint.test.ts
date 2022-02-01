import * as fs from 'src/utils/fs';
import * as npm from 'src/utils/npm';
import * as config from 'src/categories/js/prettier/prettier.config';
import { defaultConfig } from 'src/categories/js/prettier/config/default.config';
import { prettier } from 'src/categories/js/prettier/prettier.entrypoint';

jest.mock('src/utils/fs');
const fsMocked = jest.mocked(fs);

jest.mock('src/utils/npm');
const npmMocked = jest.mocked(npm);

jest.mock('src/categories/js/prettier/prettier.config');
const configMocked = jest.mocked(config);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('prettier', () => {
  beforeEach(() => {
    configMocked.getConfig.mockReturnValueOnce(defaultConfig);
  });

  test('should get config from getConfig', async () => {
    await prettier();

    expect(configMocked.getConfig).toBeCalled();
  });

  test('should install prettier', async () => {
    await prettier();

    expect(npmMocked.installDevelopmentDependencies).toBeCalledWith('prettier');
  });

  test('should add config file to root', async () => {
    await prettier();

    expect(fsMocked.addJsonFileToRoot).toBeCalledWith('.prettierrc', defaultConfig.config);
  });

  test('should add ignore config to root', async () => {
    await prettier();

    expect(fsMocked.addFileToRoot).toBeCalledWith('.prettierignore', defaultConfig.ignore.join('\n'));
  });

  test('should add prettier scripts', async () => {
    await prettier();

    expect(npmMocked.addScripts).toBeCalledWith(...defaultConfig.scripts);
  });
});
