import * as npm from 'src/utils/npm';
import * as config from 'src/categories/js/lint-staged/lint-staged.config';
import * as utils from 'src/categories/js/lint-staged/lint-staged.utils';
import { lintStaged } from 'src/categories/js/lint-staged/lint-staged.entrypoint';
import { Config, LintStagedConfig } from 'src/categories/js/lint-staged/config/config.interface';

jest.mock('src/utils/npm');
const npmMocked = jest.mocked(npm);

jest.mock('src/categories/js/lint-staged/lint-staged.config');
const configMocked = jest.mocked(config);

jest.mock('src/categories/js/lint-staged/lint-staged.utils');
const utilsMocked = jest.mocked(utils);

beforeEach(() => {
  jest.clearAllMocks();
});

const createConfig = ({ config = {}, mutators = [] }: Partial<Config> = {}) => ({
  config,
  mutators,
});

describe('lintStaged', () => {
  test('should get config from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce(createConfig());

    await lintStaged();

    expect(configMocked.getConfig).toBeCalled();
  });

  test('should apply mutators to config', async () => {
    const key = '*.ts';
    const value = '__test__';
    const testMutator = (config: LintStagedConfig) => (config[key] = value);
    const mutators = [testMutator];

    const actual = createConfig({ mutators });

    configMocked.getConfig.mockReturnValueOnce(actual);

    await lintStaged();

    const expected = createConfig({ config: { [key]: value }, mutators });

    expect(actual).toEqual(expected);
  });

  test('should install lint-staged package', async () => {
    configMocked.getConfig.mockReturnValueOnce(createConfig());

    await lintStaged();

    expect(npmMocked.installDevelopmentDependencies).toBeCalledWith('lint-staged');
  });

  test('should add config to package.json', async () => {
    const testConfig = createConfig({ config: { '*.ts': '__test__' } });

    configMocked.getConfig.mockReturnValueOnce(testConfig);

    await lintStaged();

    expect(npmMocked.addToPackageJson).toBeCalledWith('lint-staged', testConfig.config);
  });

  test('should run huskyIntegration', async () => {
    configMocked.getConfig.mockReturnValueOnce(createConfig());

    await lintStaged();

    expect(utilsMocked.huskyIntegration).toBeCalled();
  });
});