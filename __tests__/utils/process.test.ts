import { terminal } from '#__tests__/setup-test-context.ts';
import { runCommand } from '#src/utils/process.ts';

describe('runCommand', () => {
  test('should run command with arguments', async () => {
    const file = 'npm';
    const args = ['run', 'test'];

    await runCommand(file, args);

    expect(terminal.getCommands()).toEqual([[file, args]]);
  });
});
