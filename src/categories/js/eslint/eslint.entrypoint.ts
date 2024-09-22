import { getConfig } from './eslint.config';
import { addFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from './eslint.const';
import { applyMutations } from 'src/utils/mutation';
import { Config } from './config/config.interface';

const buildConfig = (config: Config) => {
  const start = config.typescript ? `// @ts-check\n` : '';

  const exportStart = config.typescript ? `export default tseslint.config(` : `export default [`;
  const exportEnd = config.typescript ? `);\n` : `];\n`;

  const imports = `${start}${config.imports.join(';\n')}${config.imports.length ? ';\n' : ''}`;
  const configs = config.configs.map((item) => `  ${item},`).join('\n');

  const files = config.eslintConfig.files
    ? `    files: ${JSON.stringify(config.eslintConfig.files).replace(/"/gim, `'`)},`
    : '';
  const ignores = config.eslintConfig.ignores
    ? `    ignores: [\n${config.eslintConfig.ignores.map((item) => `      '${item}'`).join(',\n')}\n    ],`
    : '';

  const globals = config.eslintConfig.languageOptions?.globals
    ? config.eslintConfig.languageOptions.globals.map((item) => `        ...globals.${item}`).join(',\n')
    : '';
  const parserOptions = config.eslintConfig.languageOptions?.parserOptions
    ? `      parserOptions: {\n${Object.entries(config.eslintConfig.languageOptions.parserOptions)
        .map(([key, value]) => `        ${key}: ${value}`)
        .join(',\n')}\n      }`
    : '';

  const plugins = config.eslintConfig.plugins
    ? `    plugins: { ${Object.entries(config.eslintConfig.plugins)
        .map(([key, value]) => `\n      '${key}': ${value}`)
        .join(',')}\n    },`
    : '';
  const rules = config.eslintConfig.rules
    ? `    rules: ${JSON.stringify(config.eslintConfig.rules, null, 2)
        .replace(/"/gim, "'")
        .replace(/\n {2}/gim, '\n' + ' '.repeat(6))
        .replace('\n}', '\n    }')},`
    : '';

  const languageOptions = config.eslintConfig.languageOptions
    ? `    languageOptions: {
      globals: {
${globals}
      }${parserOptions ? `,\n${parserOptions}` : ''}
    },`
    : '';

  const mainConfig = `  {\n${[files, ignores, languageOptions, plugins, rules].filter(Boolean).join('\n')}\n  }`;

  return [imports, exportStart, configs, mainConfig, exportEnd].filter(Boolean).join('\n');
};

export const eslint = async () => {
  const config = getConfig();
  await applyMutations(config, config.mutations);

  const { dependencies, scripts } = config;

  await installDevelopmentDependencies(PACKAGE_NAME, ...dependencies);

  const eslintConfig = buildConfig(config);

  await addFileToRoot(CONFIG_FILE_NAME, eslintConfig);
  await addScripts(...scripts);
};
