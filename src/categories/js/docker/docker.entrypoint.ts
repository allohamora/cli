import { addFileToRoot } from '#src/utils/fs.ts';
import { getNodeVersion } from '#src/utils/node.ts';
import { getConfig } from '#src/categories/js/docker/docker.config.ts';
import { FILE_NAME, IGNORE_NAME } from '#src/categories/js/docker/docker.const.ts';

export const docker = async () => {
  const { getDockerFile, dockerIgnore } = getConfig();
  const version = await getNodeVersion();
  const dockerFile = getDockerFile({ version });

  await addFileToRoot(FILE_NAME, dockerFile);
  await addFileToRoot(IGNORE_NAME, dockerIgnore);
};
