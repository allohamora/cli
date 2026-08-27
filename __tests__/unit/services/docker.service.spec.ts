import { fileSystem } from '#__tests__/setup-test-context.ts';
import { describe, expect, it } from 'vitest';
import { hasDockerComposeFile } from '#src/services/docker.service.ts';

describe('docker.service', () => {
  describe('hasDockerComposeFile', () => {
    it('returns false when there is no docker-compose file', async () => {
      fileSystem.seed({});

      expect(await hasDockerComposeFile()).toBe(false);
    });

    it.each(['compose.yaml', 'compose.yml', 'docker-compose.yaml', 'docker-compose.yml'])(
      'returns true when %s exists',
      async (composeFileName) => {
        fileSystem.seed({ files: { [composeFileName]: 'services: {}' } });

        expect(await hasDockerComposeFile()).toBe(true);
      },
    );
  });
});
