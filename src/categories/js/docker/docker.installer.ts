import { writeRootFile } from '#src/services/root.service.ts';
import { getNodeVersion } from '#src/services/node.service.ts';
import { getDockerPreset } from '#src/categories/js/docker/preset/index.ts';
import { FILE_NAME, IGNORE_NAME } from '#src/categories/js/docker/docker.const.ts';

export const docker = async () => {
  const { getDockerFile, dockerIgnore } = getDockerPreset();
  const version = await getNodeVersion();
  const dockerFile = getDockerFile({ version });

  await writeRootFile(FILE_NAME, dockerFile);
  await writeRootFile(IGNORE_NAME, dockerIgnore);
};
