import { addFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { getConfig } from './stylelint.config';
import { STYLELINT_CONFIG_NAME, STYLELINT_IGNORE_NAME } from './stylelint.const';

export const stylelint = async () => {
  const config = getConfig();

  for (const mutation of config.mutations) {
    await mutation(config);
  }

  const { stylelintConfig, stylelintIgnore, scripts, devDependencies } = config;

  await installDevelopmentDependencies(...devDependencies);
  await addScripts(...scripts);

  await addFileToRoot(STYLELINT_CONFIG_NAME, JSON.stringify(stylelintConfig));
  await addFileToRoot(STYLELINT_IGNORE_NAME, stylelintIgnore);
};
