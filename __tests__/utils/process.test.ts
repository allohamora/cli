import { execa } from 'execa';
import { runCommand } from '#src/utils/process.ts';

vi.mock('execa');
const execaMocked = vi.mocked(execa);

describe('runCommand', () => {
  test('should run command with arguments', async () => {
    const file = 'npm';
    const args = ['run', 'test'];

    await runCommand(file, args);

    expect(execaMocked).toHaveBeenCalledWith(file, args);
  });
});
