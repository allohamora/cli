import { addScripts, installDevelopmentDependencies, runScript } from '#src/utils/npm.ts';
import { PACKAGE_NAME } from '#src/categories/js/husky/husky.const.ts';

export const husky = async () => {
  await installDevelopmentDependencies(PACKAGE_NAME);
  await addScripts({ name: 'prepare', script: PACKAGE_NAME });
  await runScript('prepare');
};
