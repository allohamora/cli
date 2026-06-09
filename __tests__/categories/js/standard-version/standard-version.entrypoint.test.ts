import * as fs from '#src/utils/fs.ts';
import * as npm from '#src/utils/npm.ts';
import * as config from '#src/categories/js/standard-version/standard-version.config.ts';
import { defaultConfig } from '#src/categories/js/standard-version/config/default.config.ts';
import { standardVersion } from '#src/categories/js/standard-version/standard-version.entrypoint.ts';

vi.mock('#src/utils/fs.ts');
const fsMocked = vi.mocked(fs);

vi.mock('#src/utils/npm.ts');
const npmMocked = vi.mocked(npm);

vi.mock('#src/categories/js/standard-version/standard-version.config.ts');
const configMocked = vi.mocked(config);

describe('standardVersion', () => {
  beforeEach(() => {
    configMocked.getConfig.mockReturnValueOnce(defaultConfig);
    npmMocked.getPackageJson.mockResolvedValue({});
  });

  test('should get config from getConfig', async () => {
    await standardVersion();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should install standard-version package', async () => {
    await standardVersion();

    expect(npmMocked.installDevelopmentDependencies).toHaveBeenCalledWith('standard-version');
  });

  test('should create config with repository url and set it', async () => {
    const withoutReadme = 'https://github.com/Allohamora/cli';
    const homepage = `${withoutReadme}#readme`;

    npmMocked.getPackageJson.mockResolvedValueOnce({ homepage });

    await standardVersion();

    expect(fsMocked.addJsonFileToRoot).toHaveBeenCalledWith(
      '.versionrc.json',
      defaultConfig.createConfig(withoutReadme),
    );
  });

  test('should add release scripts', async () => {
    await standardVersion();

    expect(npmMocked.addScripts).toHaveBeenCalledWith(...defaultConfig.scripts);
  });
});
