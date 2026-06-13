import { writeRootFile } from '#src/services/root.service.ts';
import { getNodeVersion } from '#src/services/node.service.ts';
import { getDockerConfig } from '#src/categories/js/docker/config/index.ts';
import { FILE_NAME, IGNORE_NAME } from '#src/categories/js/docker/docker.const.ts';

export const docker = async () => {
  const { getDockerFile, dockerIgnore } = getDockerConfig();
  const version = await getNodeVersion();
  const dockerFile = getDockerFile({ version });

  await writeRootFile(FILE_NAME, dockerFile);
  await writeRootFile(IGNORE_NAME, dockerIgnore);
};
