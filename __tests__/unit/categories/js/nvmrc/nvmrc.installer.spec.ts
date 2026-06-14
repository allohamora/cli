import { fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { nvmrc } from '#src/categories/js/nvmrc/nvmrc.installer.ts';
import { describe, expect, it } from 'vitest';

describe('nvmrc.installer', () => {
  describe('nvmrc', () => {
    it('writes .nvmrc for the current node version', async () => {
      terminal.setCommandResult({ stdout: 'v24.14.1\n' });

      await nvmrc();

      expect(terminal.getCommands()).toEqual([['node', ['-v']]]);
      expect(fileSystem.readFile('.nvmrc')).toBe('24.14.1\n');
    });
  });
});
