import { addNpmScripts, installDevDependencies, runNpmScript } from '#src/services/npm.service.ts';
import { PACKAGE_NAME } from '#src/categories/js/husky/husky.const.ts';

export const husky = async () => {
  await installDevDependencies(PACKAGE_NAME);
  await addNpmScripts({ name: 'prepare', script: PACKAGE_NAME });
  await runNpmScript('prepare');
};
