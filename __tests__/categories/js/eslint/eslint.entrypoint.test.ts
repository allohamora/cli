import * as fs from 'src/utils/fs';
import * as npm from 'src/utils/npm';
import * as mutator from 'src/utils/mutator';
import * as config from 'src/categories/js/eslint/eslint.config';
import * as utils from 'src/categories/js/eslint/eslint.utils';
import { eslint } from 'src/categories/js/eslint/eslint.entrypoint';
import { createConfig } from './eslint-test.utils';
import { Config } from 'src/categories/js/eslint/config/config.interface';

jest.mock('src/utils/fs');
const fsMocked = jest.mocked(fs);

jest.mock('src/utils/npm');
const npmMocked = jest.mocked(npm);

jest.mock('src/utils/mutator');
const mutatorMocked = jest.mocked(mutator);

jest.mock('src/categories/js/eslint/eslint.config');
const configMocked = jest.mocked(config);

jest.mock('src/categories/js/eslint/eslint.utils');
const utilsMocked = jest.mocked(utils);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('eslint', () => {
  test('should get config from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce(createConfig());

    await eslint();

    expect(configMocked.getConfig).toBeCalled();
  });

  test('should apply mutators to config', async () => {
    const testMutator = (config: Config) => {
      config.dependencies.push('__test__');
    };
    const config = createConfig({ mutators: [testMutator] });
    configMocked.getConfig.mockReturnValueOnce(config);

    await eslint();

    expect(mutatorMocked.applyMutators).toBeCalledWith(config, config.mutators);
  });

  test('should install eslint and dependencies', async () => {
    const config = createConfig({ dependencies: ['__test__'] });
    configMocked.getConfig.mockReturnValueOnce(config);

    await eslint();

    expect(npmMocked.installDevelopmentDependencies).toBeCalledWith('eslint', ...config.dependencies);
  });

  test('should add .eslintrc.json to root', async () => {
    const config = createConfig({ eslintConfig: { extends: ['__test__'] } });
    configMocked.getConfig.mockReturnValueOnce(config);

    await eslint();

    expect(fsMocked.addJsonFileToRoot).toBeCalledWith('.eslintrc.json', config.eslintConfig);
  });

  test('should add npm script to package.json', async () => {
    const config = createConfig({ scripts: [{ name: 'test', script: '__test__' }] });
    configMocked.getConfig.mockReturnValueOnce(config);

    await eslint();

    expect(npm.addScripts).toBeCalledWith(...config.scripts);
  });
});
