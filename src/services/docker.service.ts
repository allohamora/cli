import { existsInRoot } from '#src/services/root.service.ts';

export const hasDockerComposeFile = async () => {
  return (await existsInRoot('docker-compose.yml')) || (await existsInRoot('docker-compose.yaml'));
};
