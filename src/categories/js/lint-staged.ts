import { createLocalConfigManager, jsState } from 'src/utils/config';
import { addToPackageJson, installDevelopmentDependencies } from 'src/utils/npm';
import { addHook } from './husky';

interface Config {
  config: Record<string, unknown>;
}

const defaultConfig: Config = {
  config: {
    '*.{js,json,yml,md}': 'npm run format -- --write',
  },
};

const nodeTsConfig: Config = {
  config: {
    '*.ts': 'npm run lint -- --fix',
    ...defaultConfig.config,
  },
};

const [getConfig] = createLocalConfigManager(jsState, {
  default: defaultConfig,
  'node:ts': nodeTsConfig,
});

export const lintStaged = async () => {
  const { config } = getConfig();

  await installDevelopmentDependencies('lint-staged');
  await addToPackageJson('lint-staged', config);
  await addHook('pre-commit', 'npx --no-install lint-staged');
};
