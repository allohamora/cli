import { getEslintPreset } from '#src/categories/js/eslint/preset/index.ts';
import { writeRootFile } from '#src/services/root.service.ts';
import { addNpmScripts, installDevDependencies } from '#src/services/npm.service.ts';
import { ESLINT_CONFIG_FILE_NAME, ESLINT_PACKAGE_NAME } from '#src/categories/js/eslint/eslint.const.ts';
import { applyMutations } from '#src/utils/mutation.utils.ts';
import type { Preset } from '#src/categories/js/eslint/preset/preset.type.ts';
import { formatJavascript } from '#src/categories/js/prettier/prettier.service.ts';

const optional = <T>(value: T | undefined, map: (value: T) => string) => (value ? map(value) : '');

export const buildConfig = (preset: Preset) => {
  const start = optional(preset.typescript, () => '// @ts-check');

  const imports = [...preset.imports, `import { defineConfig } from 'eslint/config'`]
    .map((item) => `${item};\n`)
    .join('');

  const exportStart = 'export default defineConfig(';
  const exportEnd = ');';

  const configs = preset.configs.map((item) => `${item},`).join('\n');

  const files = optional(preset.eslintConfig.files, (value) => `files: ${JSON.stringify(value)}`);

  const rules = optional(preset.eslintConfig.rules, (value) => `rules: ${JSON.stringify(value)}`);

  const globals = optional(
    preset.eslintConfig.languageOptions?.globals,
    (value) => `globals: {${value.map((item) => `...globals.${item}`).join(',')}}`,
  );
  const parserOptions = optional(
    preset.eslintConfig.languageOptions?.parserOptions,
    (value) => `parserOptions: ${JSON.stringify(value)}`,
  );

  const languageOptions = optional(
    preset.eslintConfig.languageOptions,
    () => `languageOptions: {${[globals, parserOptions].filter(Boolean).join(',')}}`,
  );

  const ignoresConfig = optional(preset.ignores, (value) => `{ignores: ${JSON.stringify(value)}},`);

  const mainContent = [files, languageOptions, rules].filter(Boolean).join(',');
  const mainConfig = optional(mainContent, (content) => `{${content}}`);

  return [start, imports, exportStart, configs, ignoresConfig, mainConfig, exportEnd].filter(Boolean).join('\n');
};

export const eslint = async () => {
  const preset = getEslintPreset();
  await applyMutations(preset, preset.mutations);

  const { dependencies, scripts } = preset;

  await installDevDependencies(ESLINT_PACKAGE_NAME, ...dependencies);

  const eslintConfig = await formatJavascript(buildConfig(preset));

  await writeRootFile(ESLINT_CONFIG_FILE_NAME, eslintConfig);
  await addNpmScripts(...scripts);
};
