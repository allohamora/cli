import * as fsUtils from 'src/utils/fs';
import * as npmUtils from 'src/utils/npm';
import * as config from 'src/categories/js/stylelint/stylelint.config';
import { stylelint } from 'src/categories/js/stylelint/stylelint.entrypoint';
import { Config } from 'src/categories/js/stylelint/config/config.interface';

jest.mock('src/utils/fs');
const fsUtilsMocked = jest.mocked(fsUtils);

jest.mock('src/utils/npm');
const npmUtilsMocked = jest.mocked(npmUtils);

jest.mock('src/categories/js/stylelint/stylelint.config');
const configMocked = jest.mocked(config);

const baseConfig = (partial: Partial<Config> = {}) => {
  return {
    devDependencies: [],
    stylelintConfig: {},
    stylelintIgnore: '',
    scripts: [],
    mutations: [],
    ...partial,
  } as Config;
};

describe('stylelint', () => {
  beforeEach(() => {
    npmUtilsMocked.installDevelopmentDependencies.mockResolvedValueOnce(undefined);
    npmUtilsMocked.addScripts.mockResolvedValueOnce(undefined);

    fsUtilsMocked.addFileToRoot.mockResolvedValueOnce(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should use value from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce(baseConfig());

    await stylelint();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should apply all mutations', async () => {
    const scripts = [{ name: 'test', script: 'script' }];
    const actual = baseConfig({
      mutations: [
        (c) => {
          c.scripts = scripts;
        },
      ],
    });
    configMocked.getConfig.mockReturnValueOnce(actual);

    await stylelint();

    const expected = { ...actual, scripts };

    expect(actual.scripts).toEqual(expected.scripts);
  });

  test('should apply all mutations before logic', async () => {
    const devDependencies = ['123'];
    const actual = baseConfig({
      mutations: [
        (c) => {
          c.devDependencies = devDependencies;
        },
      ],
    });
    configMocked.getConfig.mockReturnValueOnce(actual);

    await stylelint();

    const expected = { ...actual, devDependencies };

    expect(actual.devDependencies).toEqual(expected.devDependencies);
    expect(npmUtilsMocked.installDevelopmentDependencies).toHaveBeenCalledWith(...devDependencies);
  });

  test('should install all dev dependencies', async () => {
    const devDependencies = ['test'];
    configMocked.getConfig.mockReturnValueOnce(baseConfig({ devDependencies }));

    await stylelint();

    expect(npmUtilsMocked.installDevelopmentDependencies).toHaveBeenCalledWith(...devDependencies);
  });

  test('should add all scripts', async () => {
    const scripts = [{ name: 'test', script: 'test' }];
    configMocked.getConfig.mockReturnValueOnce(baseConfig({ scripts }));

    await stylelint();

    expect(npmUtilsMocked.addScripts).toHaveBeenCalledWith(...scripts);
  });

  test('should add stylelint config to root with spaces', async () => {
    const stylelintConfig = { extends: ['123'] } as Config['stylelintConfig'];
    configMocked.getConfig.mockReturnValueOnce(baseConfig({ stylelintConfig }));

    await stylelint();

    expect(fsUtilsMocked.addFileToRoot).toHaveBeenCalledWith('.stylelintrc', JSON.stringify(stylelintConfig, null, 2));
  });

  test('should add stylelint ignore to root with spaces', async () => {
    const stylelintIgnore = 'stylelint_ignore';
    configMocked.getConfig.mockReturnValueOnce(baseConfig({ stylelintIgnore }));

    await stylelint();

    expect(fsUtilsMocked.addFileToRoot).toHaveBeenCalledWith('.stylelintignore', stylelintIgnore);
  });
});
