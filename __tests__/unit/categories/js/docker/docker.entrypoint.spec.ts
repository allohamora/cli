import { configState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
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
      expect(fileSystem.readFile('Dockerfile')).toBe(
        [
          'FROM node:24.14.1',
          'WORKDIR /app',
          '',
          'COPY package*.json ./',
          'RUN npm ci',
          '',
          'COPY . .',
          'ENV NODE_ENV production',
          'RUN npm run build',
          '',
          'EXPOSE 3000',
          '',
          'CMD npm run start',
          '',
        ].join('\n'),
      );
      expect(fileSystem.readFile('.dockerignore')).toBe(
        [
          'node_modules',
          'dist',
          'build',
          '',
          '.husky',
          '.git',
          '',
          '.dockerignore',
          'Dockerfile',
          '.docker-compose.yml',
          '',
        ].join('\n'),
      );
    });
  });
});
