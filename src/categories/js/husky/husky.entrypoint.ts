import { installDevelopmentDependencies } from 'src/utils/npm';
import { PACKAGE_NAME } from './husky.const';
import { runCommand } from 'src/utils/run-command';

export const husky = async () => {
  await installDevelopmentDependencies(PACKAGE_NAME);
  await runCommand(`npx ${PACKAGE_NAME} init`);
};
