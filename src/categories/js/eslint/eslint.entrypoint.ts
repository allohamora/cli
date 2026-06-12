import { getConfig } from '#src/categories/js/eslint/config/index.ts';
import { writeRootFile } from '#src/services/root.service.ts';
import { addNpmScripts, installDevDependencies } from '#src/services/npm.service.ts';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from '#src/categories/js/eslint/eslint.const.ts';
import { applyMutations } from '#src/utils/mutation.utils.ts';
import type { Config } from '#src/categories/js/eslint/config/config.interface.ts';
import { formatJavascript } from '#src/categories/js/prettier/prettier.service.ts';

const optional = <T>(value: T | undefined, map: (value: T) => string) => (value ? map(value) : '');

export const buildConfig = (config: Config) => {
  const start = optional(config.typescript, () => '// @ts-check');

  const imports = [...config.imports, `import { defineConfig } from 'eslint/config'`]
    .map((item) => `${item};\n`)
    .join('');

  const exportStart = 'export default defineConfig(';
  const exportEnd = ');';

  const configs = config.configs.map((item) => `${item},`).join('\n');

  const files = optional(config.eslintConfig.files, (value) => `files: ${JSON.stringify(value)}`);

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

  const ignoresConfig = optional(config.ignores, (value) => `{ignores: ${JSON.stringify(value)}},`);

  const mainContent = [files, languageOptions, plugins, rules].filter(Boolean).join(',');
  const mainConfig = optional(mainContent, (content) => `{${content}}`);

  return [start, imports, exportStart, configs, ignoresConfig, mainConfig, exportEnd].filter(Boolean).join('\n');
};

export const eslint = async () => {
  const config = getConfig();
  await applyMutations(config, config.mutations);

  const { dependencies, scripts } = config;

  await installDevDependencies(PACKAGE_NAME, ...dependencies);

  const eslintConfig = await formatJavascript(buildConfig(config));

  await writeRootFile(CONFIG_FILE_NAME, eslintConfig);
  await addNpmScripts(...scripts);
};
