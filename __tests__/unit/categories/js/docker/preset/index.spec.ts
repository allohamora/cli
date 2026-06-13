import { getDockerPreset } from '#src/categories/js/docker/preset/index.ts';
import { describe, expect, it } from 'vitest';

describe('docker/preset', () => {
  it('returns Dockerfile content for the requested node version', () => {
    expect(getDockerPreset().getDockerFile({ version: '24.14.1' })).toBe(
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
      ].join('\n'),
    );
  });

  it('returns the default docker ignore content', () => {
    expect(getDockerPreset().dockerIgnore).toBe(
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
      ].join('\n'),
    );
  });
});
