import { createLocalConfigManager, jsState } from "src/utils/config";
import { addFileToRoot, addJsonFileToRoot } from "src/utils/fs";
import { addScripts, installDevelopmentDependencies } from "src/utils/npm"

const defaultConfig = {
  config: {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 2,
    overrides: [
      {
        files: '*.yml',
        options: {
          singleQuote: false
        }
      }
    ]
  },
  ignore: ['dist', 'node_modules', 'public', '.husky', 'package-lock.json'],
  scripts: [
    { name: 'format', script: 'prettier' },
    { name: 'format:fix', script: 'prettier --write .' }
  ]
}

const [getConfig] = createLocalConfigManager(jsState, {
  default: defaultConfig
});

export const prettier = async () => {
  const { config, ignore, scripts } = getConfig();

  await installDevelopmentDependencies('prettier');
  await addJsonFileToRoot('.prettierrc', config);
  
  await addFileToRoot('.prettierignore', ignore.join('\n'));
  
  await addScripts(...scripts);
}