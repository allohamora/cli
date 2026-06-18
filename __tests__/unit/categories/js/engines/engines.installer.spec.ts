import { fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { PACKAGE_JSON_NAME } from '#src/services/npm.service.ts';
import { engines } from '#src/categories/js/engines/engines.installer.ts';
import { describe, expect, it } from 'vitest';

describe('engines.installer', () => {
  describe('engines', () => {
    it('sets engines field in package.json with current node and npm versions', async () => {
      fileSystem.seed({ packageJson: {} });
      terminal.setCommandHandler((bin, args) => {
        if (bin === 'node' && args[0] === '-v') {
          return { stdout: 'v24.14.1\n' };
        }

        if (bin === 'npm' && args[0] === '-v') {
          return { stdout: '11.11.0\n' };
        }

        return { stdout: '' };
      });

      await engines();

      expect(terminal.getCommands()).toEqual([
        ['node', ['-v']],
        ['npm', ['-v']],
      ]);
      expect(fileSystem.readJson(PACKAGE_JSON_NAME)).toEqual({
        engines: {
          node: '>=24.14.1',
          npm: '>=11.11.0',
        },
      });
    });
  });
});
