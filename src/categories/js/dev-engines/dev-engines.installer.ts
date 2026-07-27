import { getNodeVersion } from '#src/services/node.service.ts';
import { getNpmVersion, setPackageJsonField } from '#src/services/npm.service.ts';

export const devEngines = async () => {
  const nodeVersion = await getNodeVersion();
  const npmVersion = await getNpmVersion();

  await setPackageJsonField('devEngines', {
    runtime: {
      name: 'node',
      version: `>=${nodeVersion}`,
    },
    packageManager: {
      name: 'npm',
      version: `>=${npmVersion}`,
    },
  });
};
