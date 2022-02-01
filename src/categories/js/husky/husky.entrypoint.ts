import { addScripts, installDevelopmentDependencies, runScript } from 'src/utils/npm';
import { PACKAGE_NAME } from './husky.const';

export const husky = async () => {
  await installDevelopmentDependencies(PACKAGE_NAME);
  await addScripts({ name: 'prepare', script: `${PACKAGE_NAME} install` });
  await runScript('prepare');
};
