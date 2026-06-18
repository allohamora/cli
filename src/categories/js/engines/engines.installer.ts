import { getNodeVersion } from '#src/services/node.service.ts';
import { getNpmVersion, setPackageJsonField } from '#src/services/npm.service.ts';

export const engines = async () => {
  const nodeVersion = await getNodeVersion();
  const npmVersion = await getNpmVersion();

  await setPackageJsonField('engines', {
    node: `>=${nodeVersion}`,
    npm: `>=${npmVersion}`,
  });
};
