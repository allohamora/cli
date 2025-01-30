import * as fs from 'src/utils/fs';
import * as npm from 'src/utils/npm';
import * as mutation from 'src/utils/mutation';
import * as config from 'src/categories/js/eslint/eslint.config';
import * as javascript from 'src/utils/javascript';
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

// we need to mock prettier because it doesn't work with jest
// TypeError: A dynamic import callback was invoked without --experimental-vm-modules
// https://github.com/prettier/prettier/issues/15769
jest.mock('src/utils/javascript', () => ({
  format: jest.fn().mockImplementation(async (config) => config),
}));
const javascriptMocked = jest.mocked(javascript);

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

  test('should add eslint.config.mjs to root', async () => {
    const config = createConfig({ eslintConfig: { ignores: ['__test__'] } });
    configMocked.getConfig.mockReturnValueOnce(config);

    const configFile = `export default [
{ignores: ["__test__"]}
];`;

    await eslint();

    expect(javascriptMocked.format).toHaveBeenCalledWith(configFile);
    expect(fsMocked.addFileToRoot).toHaveBeenCalledWith('eslint.config.mjs', configFile);
  });

  test('should handle empty eslintConfig gracefully', async () => {
    const config = createConfig({ eslintConfig: {} });
    configMocked.getConfig.mockReturnValueOnce(config);

    const configFile = `export default [
{}
];`;

    await eslint();

    expect(javascriptMocked.format).toHaveBeenCalledWith(configFile);
    expect(fsMocked.addFileToRoot).toHaveBeenCalledWith('eslint.config.mjs', configFile);
  });

  test('should handle empty parserOptions correctly', async () => {
    const config = createConfig({
      eslintConfig: {
        languageOptions: {
          parserOptions: undefined,
        },
      },
    });
    configMocked.getConfig.mockReturnValueOnce(config);

    const configFile = `export default [
{languageOptions: {}}
];`;

    await eslint();

    expect(javascriptMocked.format).toHaveBeenCalledWith(configFile);
    expect(fsMocked.addFileToRoot).toHaveBeenCalledWith('eslint.config.mjs', configFile);
  });

  test('should handle configs mapping correctly', async () => {
    const config = createConfig({
      configs: ['__test1__', '__test2__'],
    });
    configMocked.getConfig.mockReturnValueOnce(config);

    const configFile = `export default [
__test1__,
__test2__,
{}
];`;

    await eslint();

    expect(javascriptMocked.format).toHaveBeenCalledWith(configFile);
    expect(fsMocked.addFileToRoot).toHaveBeenCalledWith('eslint.config.mjs', configFile);
  });

  test('should handle complex eslintConfig correctly', async () => {
    const config = createConfig({
      typescript: true,
      imports: ['import globals from "globals"'],
      eslintConfig: {
        files: ['src/**/*.ts'],
        ignores: ['node_modules'],
        languageOptions: {
          globals: ['window'],
          parserOptions: {
            ecmaVersion: 2020,
          },
        },
        plugins: {
          '@typescript-eslint': 'eslintPluginTs',
        },
        rules: {
          'no-console': 'warn',
        },
      },
    });
    configMocked.getConfig.mockReturnValueOnce(config);

    const configFile = `// @ts-check
import globals from "globals";
export default tseslint.config(
{files: ["src/**/*.ts"],ignores: ["node_modules"],languageOptions: {globals: {...globals.window},parserOptions: {"ecmaVersion":2020}},plugins: {'@typescript-eslint': eslintPluginTs},rules: {"no-console":"warn"}}
);`;

    await eslint();

    expect(javascriptMocked.format).toHaveBeenCalledWith(configFile);
    expect(fsMocked.addFileToRoot).toHaveBeenCalledWith('eslint.config.mjs', configFile);
  });

  test('should add npm script to package.json', async () => {
    const config = createConfig({ scripts: [{ name: 'test', script: '__test__' }] });
    configMocked.getConfig.mockReturnValueOnce(config);

    await eslint();

    expect(npmMocked.addScripts).toHaveBeenCalledWith(...config.scripts);
  });
});
