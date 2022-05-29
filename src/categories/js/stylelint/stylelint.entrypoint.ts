import { addFileToRoot } from 'src/utils/fs';
import { stringify } from 'src/utils/json';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { getConfig } from './stylelint.config';
import { CONFIG_NAME, IGNORE_NAME } from './stylelint.const';

export const stylelint = async () => {
  const config = getConfig();

  for (const mutation of config.mutations) {
    await mutation(config);
  }

  const { stylelintConfig, stylelintIgnore, scripts, devDependencies } = config;

  await installDevelopmentDependencies(...devDependencies);
  await addScripts(...scripts);

  await addFileToRoot(CONFIG_NAME, stringify(stylelintConfig));
  await addFileToRoot(IGNORE_NAME, stylelintIgnore);
};
