import { configState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { defaultConfig } from '#src/categories/js/docker/config/default.config.ts';
import { docker } from '#src/categories/js/docker/docker.entrypoint.ts';

describe('docker.entrypoint', () => {
  beforeEach(() => {
    configState.setConfig('default');
    terminal.setCommandResult({ stdout: 'v24.14.1\n' });
  });

  describe('docker', () => {
    it('writes Dockerfile for the current node version and default .dockerignore', async () => {
      await docker();

      expect(terminal.getCommands()).toEqual([[expect.arrayContaining(['node -v'])]]);
      expect(fileSystem.readFile('Dockerfile')).toBe(`${defaultConfig.getDockerFile({ version: '24.14.1' })}\n`);
      expect(fileSystem.readFile('.dockerignore')).toBe(`${defaultConfig.dockerIgnore}\n`);
    });
  });
});
