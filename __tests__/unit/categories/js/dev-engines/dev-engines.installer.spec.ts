import { fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { devEngines } from '#src/categories/js/dev-engines/dev-engines.installer.ts';
import { PACKAGE_JSON_NAME } from '#src/services/npm.service.ts';
import { describe, expect, it } from 'vitest';

describe('dev-engines.installer', () => {
  describe('devEngines', () => {
    it('sets devEngines field with the current node and npm versions', async () => {
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

      await devEngines();

      expect(terminal.getCommands()).toEqual([
        ['node', ['-v']],
        ['npm', ['-v']],
      ]);
      expect(fileSystem.readJson(PACKAGE_JSON_NAME)).toEqual({
        devEngines: {
          runtime: {
            name: 'node',
            version: '>=24.14.1',
          },
          packageManager: {
            name: 'npm',
            version: '>=11.11.0',
          },
        },
      });
    });
  });
});
