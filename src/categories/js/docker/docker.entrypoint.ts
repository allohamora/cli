import { addFileToRoot } from 'src/utils/fs';
import { getNodeVersion } from 'src/utils/node';
import { getConfig } from './docker.config';
import { DOCKER_FILE_NAME, DOCKER_IGNORE_NAME } from './docker.const';

export const docker = async () => {
  const { getDockerFile, dockerIgnore } = getConfig();
  const version = await getNodeVersion();
  const dockerFile = getDockerFile({ version });

  await addFileToRoot(DOCKER_FILE_NAME, dockerFile);
  await addFileToRoot(DOCKER_IGNORE_NAME, dockerIgnore);
};
