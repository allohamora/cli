import { addNpmScripts, installDevDependencies, runNpmScript } from '#src/services/npm.service.ts';
import { HUSKY_PACKAGE_NAME } from '#src/categories/js/husky/husky.const.ts';

export const husky = async () => {
  await installDevDependencies(HUSKY_PACKAGE_NAME);
  await addNpmScripts({ name: 'prepare', script: HUSKY_PACKAGE_NAME });
  await runNpmScript('prepare');
};
