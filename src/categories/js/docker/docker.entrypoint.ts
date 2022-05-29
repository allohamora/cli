import { addFileToRoot } from 'src/utils/fs';
import { getNodeVersion } from 'src/utils/node';
import { getConfig } from './docker.config';
import { FILE_NAME, IGNORE_NAME } from './docker.const';

export const docker = async () => {
  const { getDockerFile, dockerIgnore } = getConfig();
  const version = await getNodeVersion();
  const dockerFile = getDockerFile({ version });

  await addFileToRoot(FILE_NAME, dockerFile);
  await addFileToRoot(IGNORE_NAME, dockerIgnore);
};
