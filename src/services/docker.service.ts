import { existsInRoot } from '#src/services/root.service.ts';

export const hasDockerComposeFile = async () => {
  const filenames = ['compose.yaml', 'compose.yml', 'docker-compose.yaml', 'docker-compose.yml'];

  return (await Promise.all(filenames.map(existsInRoot))).some(Boolean);
};
