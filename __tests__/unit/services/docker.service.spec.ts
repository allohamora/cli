import { fileSystem } from '#__tests__/setup-test-context.ts';
import { describe, expect, it } from 'vitest';
import { hasDockerComposeYml } from '#src/services/docker.service.ts';

describe('docker.service', () => {
  describe('hasDockerComposeYml', () => {
    it('returns false when there is no docker-compose file', async () => {
      fileSystem.seed({});

      expect(await hasDockerComposeYml()).toBe(false);
    });

    it('returns true when docker-compose.yml exists', async () => {
      fileSystem.seed({ files: { 'docker-compose.yml': 'services: {}' } });

      expect(await hasDockerComposeYml()).toBe(true);
    });

    it('returns true when docker-compose.yaml exists', async () => {
      fileSystem.seed({ files: { 'docker-compose.yaml': 'services: {}' } });

      expect(await hasDockerComposeYml()).toBe(true);
    });
  });
});
