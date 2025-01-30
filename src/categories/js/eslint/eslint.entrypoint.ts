import { getConfig } from './eslint.config';
import { addFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from './eslint.const';
import { applyMutations } from 'src/utils/mutation';
import { Config } from './config/config.interface';
import { format } from 'src/utils/javascript';

const optional = <T>(value: T | undefined, map: (value: T) => string) => (value ? map(value) : '');

export const buildConfig = (config: Config) => {
  const start = optional(config.typescript, () => '// @ts-check');

  const imports = `${config.imports.map((item) => `${item};`).join('\n')}\n`.trim();

  const exportStart = config.typescript ? `export default tseslint.config(` : `export default [`;
  const exportEnd = config.typescript ? `);` : `];`;

  const configs = config.configs.map((item) => `${item},`).join('\n');

  const files = optional(config.eslintConfig.files, (value) => `files: ${JSON.stringify(value)}`);
  const ignores = optional(config.eslintConfig.ignores, (value) => `ignores: ${JSON.stringify(value)}`);

  const plugins = optional(
    config.eslintConfig.plugins,
    (values) =>
      `plugins: {${Object.entries(values)
        .map(([key, value]) => `'${key}': ${value}`)
        .join(',')}}`,
  );

  const rules = optional(config.eslintConfig.rules, (value) => `rules: ${JSON.stringify(value)}`);

  const globals = optional(
    config.eslintConfig.languageOptions?.globals,
    (value) => `globals: {${value.map((item) => `...globals.${item}`).join(',')}}`,
  );
  const parserOptions = optional(
    config.eslintConfig.languageOptions?.parserOptions,
    (value) => `parserOptions: ${JSON.stringify(value)}`,
  );

  const languageOptions = optional(
    config.eslintConfig.languageOptions,
    () => `languageOptions: {${[globals, parserOptions].filter(Boolean).join(',')}}`,
  );

  const mainConfig = `{${[files, ignores, languageOptions, plugins, rules].filter(Boolean).join(',')}}`;

  return [start, imports, exportStart, configs, mainConfig, exportEnd].filter(Boolean).join('\n');
};

export const eslint = async () => {
  const config = getConfig();
  await applyMutations(config, config.mutations);

  const { dependencies, scripts } = config;

  await installDevelopmentDependencies(PACKAGE_NAME, ...dependencies);

  const eslintConfig = await format(buildConfig(config));

  await addFileToRoot(CONFIG_FILE_NAME, eslintConfig);
  await addScripts(...scripts);
};
