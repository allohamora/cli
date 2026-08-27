import { existsInRoot } from '#src/services/root.service.ts';

export const hasDockerComposeYml = async () => {
  return (await existsInRoot('docker-compose.yml')) || (await existsInRoot('docker-compose.yaml'));
};
