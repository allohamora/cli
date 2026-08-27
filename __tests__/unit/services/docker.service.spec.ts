import { fileSystem } from '#__tests__/setup-test-context.ts';
import { describe, expect, it } from 'vitest';
import { hasDockerComposeFile } from '#src/services/docker.service.ts';

describe('docker.service', () => {
  describe('hasDockerComposeFile', () => {
    it('returns false when there is no docker-compose file', async () => {
      fileSystem.seed({});

      expect(await hasDockerComposeFile()).toBe(false);
    });

    it('returns true when docker-compose.yml exists', async () => {
      fileSystem.seed({ files: { 'docker-compose.yml': 'services: {}' } });

      expect(await hasDockerComposeFile()).toBe(true);
    });

    it('returns true when docker-compose.yaml exists', async () => {
      fileSystem.seed({ files: { 'docker-compose.yaml': 'services: {}' } });

      expect(await hasDockerComposeFile()).toBe(true);
    });
  });
});
