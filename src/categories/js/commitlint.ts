import { jsCategoryState } from 'src/libs/categories';
import { addJsonFileToRoot } from 'src/libs/fs';
import { installDevelopmentDependencies } from 'src/libs/npm';
import { addHook } from './husky';

const defaultConfig = {
  rules: '@commitlint/config-conventional',
  config: { extends: ['@commitlint/config-conventional'] },
};

const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});

export const commitlint = async () => {
  const { config, rules } = getConfig();

  await installDevelopmentDependencies('@commitlint/cli', rules);
  await addJsonFileToRoot('.commitlintrc.json', config);
  await addHook('commit-msg', 'npx --no-install -- commitlint --edit "$1"');
};
