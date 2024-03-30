import * as fs from 'src/utils/fs';
import * as npm from 'src/utils/npm';
import * as mutation from 'src/utils/mutation';
import * as config from 'src/categories/js/eslint/eslint.config';
import { eslint } from 'src/categories/js/eslint/eslint.entrypoint';
import { createConfig } from './eslint-test.utils';
import { Config } from 'src/categories/js/eslint/config/config.interface';

jest.mock('src/utils/fs');
const fsMocked = jest.mocked(fs);

jest.mock('src/utils/npm');
const npmMocked = jest.mocked(npm);

jest.mock('src/utils/mutation');
const mutationMocked = jest.mocked(mutation);

jest.mock('src/categories/js/eslint/eslint.config');
const configMocked = jest.mocked(config);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('eslint', () => {
  test('should get config from getConfig', async () => {
    configMocked.getConfig.mockReturnValueOnce(createConfig());

    await eslint();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should apply mutations to config', async () => {
    const testMutator = (config: Config) => {
      config.dependencies.push('__test__');
    };
    const config = createConfig({ mutations: [testMutator] });
    configMocked.getConfig.mockReturnValueOnce(config);

    await eslint();

    expect(mutationMocked.applyMutations).toHaveBeenCalledWith(config, config.mutations);
  });

  test('should install eslint and dependencies', async () => {
    const config = createConfig({ dependencies: ['__test__'] });
    configMocked.getConfig.mockReturnValueOnce(config);

    await eslint();

    expect(npmMocked.installDevelopmentDependencies).toHaveBeenCalledWith('eslint', ...config.dependencies);
  });

  test('should add .eslintrc.json to root', async () => {
    const config = createConfig({ eslintConfig: { extends: ['__test__'] } });
    configMocked.getConfig.mockReturnValueOnce(config);

    await eslint();

    expect(fsMocked.addJsonFileToRoot).toHaveBeenCalledWith('.eslintrc.json', config.eslintConfig);
  });

  test('should add .eslintignore to root', async () => {
    const config = createConfig({ ignore: ['node_modules', 'dist'] });
    configMocked.getConfig.mockReturnValueOnce(config);

    await eslint();

    expect(fsMocked.addFileToRoot).toHaveBeenCalledWith('.eslintignore', 'node_modules\ndist');
  });

  test('should add npm script to package.json', async () => {
    const config = createConfig({ scripts: [{ name: 'test', script: '__test__' }] });
    configMocked.getConfig.mockReturnValueOnce(config);

    await eslint();

    expect(npmMocked.addScripts).toHaveBeenCalledWith(...config.scripts);
  });
});
