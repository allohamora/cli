import { fileSystem, installationState } from '#__tests__/setup-test-context.ts';
import { createConfig } from '#__tests__/utils/eslint.utils.ts';
import { prettierMutation, jestMutation, isEslintInstalled } from '#src/categories/js/eslint/eslint.service.ts';

describe('eslint.service', () => {
  describe('prettierMutation', () => {
    it('adds prettier to empty config if prettier installed', async () => {
      installationState.setSelectedInstallOptions(['prettier']);

      const actual = createConfig();

      await prettierMutation(actual);

      const expected = {
        dependencies: ['eslint-plugin-prettier', 'eslint-config-prettier'],
        imports: [`import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'`],
        configs: ['eslintPluginPrettierRecommended'],
        eslintConfig: {},
        typescript: false,
        scripts: [],
        mutations: [],
      };

      expect(actual).toEqual(expected);
    });

    it('adds prettier to existing config if prettier installed', async () => {
      installationState.setSelectedInstallOptions(['prettier']);

      const actual = createConfig({
        dependencies: ['__test__'],
        imports: ['__test__'],
        configs: ['__test__'],
      });

      await prettierMutation(actual);

      const expected = {
        dependencies: ['__test__', 'eslint-plugin-prettier', 'eslint-config-prettier'],
        imports: ['__test__', `import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'`],
        configs: ['__test__', 'eslintPluginPrettierRecommended'],
        eslintConfig: {},
        typescript: false,
        scripts: [],
        mutations: [],
      };

      expect(actual).toEqual(expected);
    });

    it('does not add prettier if prettier is not installed', async () => {
      const actual = createConfig();
      const expected = {
        dependencies: [],
        imports: [],
        configs: [],
        eslintConfig: {},
        typescript: false,
        scripts: [],
        mutations: [],
      };

      await prettierMutation(actual);

      expect(actual).toEqual(expected);
    });
  });

  describe('jestMutation', () => {
    it('adds jest env if jest installed', async () => {
      const actual = createConfig({ eslintConfig: { languageOptions: { globals: [] } } });
      const expected = {
        dependencies: [],
        imports: [],
        configs: [],
        eslintConfig: { languageOptions: { globals: ['jest'] } },
        typescript: false,
        scripts: [],
        mutations: [],
      };

      installationState.setSelectedInstallOptions(['jest']);

      await jestMutation(actual);

      expect(actual).toEqual(expected);
    });

    it('adds jest env object if it does not exist', async () => {
      const actual = createConfig();
      const expected = {
        dependencies: [],
        imports: [],
        configs: [],
        eslintConfig: { languageOptions: { globals: ['jest'] } },
        typescript: false,
        scripts: [],
        mutations: [],
      };

      installationState.setSelectedInstallOptions(['jest']);

      await jestMutation(actual);

      expect(actual).toEqual(expected);
    });

    it('does not add jest if jest is not installed', async () => {
      const actual = createConfig();
      const expected = {
        dependencies: [],
        imports: [],
        configs: [],
        eslintConfig: {},
        typescript: false,
        scripts: [],
        mutations: [],
      };

      await jestMutation(actual);

      expect(actual).toEqual(expected);
    });
  });

  describe('isEslintInstalled', () => {
    it('returns true if eslint is selected for install', async () => {
      installationState.setSelectedInstallOptions(['eslint']);

      expect(await isEslintInstalled()).toBe(true);
    });

    it('returns true if eslint config exists', async () => {
      fileSystem.writeFile('eslint.config.mjs', '');

      expect(await isEslintInstalled()).toBe(true);
    });

    it('returns false if eslint is not selected for install and config does not exist', async () => {
      expect(await isEslintInstalled()).toBe(false);
    });
  });
});
