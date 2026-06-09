import * as fs from '#src/utils/fs.ts';
import * as npm from '#src/utils/npm.ts';
import * as config from '#src/categories/js/prettier/prettier.config.ts';
import { defaultConfig } from '#src/categories/js/prettier/config/default.config.ts';
import { prettier } from '#src/categories/js/prettier/prettier.entrypoint.ts';

vi.mock('#src/utils/fs.ts');
const fsMocked = vi.mocked(fs);

vi.mock('#src/utils/npm.ts');
const npmMocked = vi.mocked(npm);

vi.mock('#src/categories/js/prettier/prettier.config.ts');
const configMocked = vi.mocked(config);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('prettier', () => {
  beforeEach(() => {
    configMocked.getConfig.mockReturnValueOnce(defaultConfig);
  });

  test('should get config from getConfig', async () => {
    await prettier();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should install prettier', async () => {
    await prettier();

    expect(npmMocked.installDevelopmentDependencies).toHaveBeenCalledWith('prettier');
  });

  test('should add config file to root', async () => {
    await prettier();

    expect(fsMocked.addJsonFileToRoot).toHaveBeenCalledWith('.prettierrc', defaultConfig.config);
  });

  test('should add ignore config to root', async () => {
    await prettier();

    expect(fsMocked.addFileToRoot).toHaveBeenCalledWith('.prettierignore', defaultConfig.ignore.join('\n'));
  });

  test('should add prettier scripts', async () => {
    await prettier();

    expect(npmMocked.addScripts).toHaveBeenCalledWith(...defaultConfig.scripts);
  });
});
