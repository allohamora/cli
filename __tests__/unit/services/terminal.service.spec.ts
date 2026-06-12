import { terminal } from '#__tests__/setup-test-context.ts';
import { exec } from '#src/services/terminal.service.ts';

describe('terminal.service', () => {
  describe('exec', () => {
    it('executes a command with arguments', async () => {
      const command = 'npm';
      const args = ['run', 'test'];

      await exec(command, args);

      expect(terminal.getCommands()).toEqual([[command, args]]);
    });
  });
});
