import { createLocalConfigManager, jsState } from 'src/utils/config';
import { addJsonFileToRoot } from 'src/utils/fs';
import { installDevelopmentDependencies } from 'src/utils/npm';
import { addHook } from './husky';

const defaultConfig = {
  rules: '@commitlint/config-conventional',
  config: { extends: ['@commitlint/config-conventional'] },
};

const [getConfig] = createLocalConfigManager(jsState, {
  default: defaultConfig,
});

export const commitlint = async () => {
  const { config, rules } = getConfig();

  await installDevelopmentDependencies('@commitlint/cli', rules);
  await addJsonFileToRoot('.commitlintrc.json', config);
  await addHook('commit-msg', 'npx --no -- commitlint --edit "$1"');
};
