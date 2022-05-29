import * as childProcess from 'node:child_process';
import { EventEmitter } from 'node:events';
import { delay } from '__tests__/test-utils/delay';
import { runCommand, spawnCommand } from 'src/utils/run-command';

jest.mock('node:child_process');
const childProcessMocked = jest.mocked(childProcess);

beforeEach(() => {
  jest.clearAllMocks();
});

class ChildMock extends EventEmitter {
  public stdout = new EventEmitter();
}

const spawnMock = <EV>(event: 'exit' | 'error' = 'exit', emitValue?: EV, delayMs = 200) => {
  const child = new ChildMock();

  const exitHandler = () => child.emit(event, emitValue);
  delay(delayMs).then(exitHandler);

  childProcessMocked.spawn.mockReturnValueOnce(child as ReturnType<typeof childProcess.spawn>);

  return child;
};

describe('spawnCommand', () => {
  const command = '__test__';
  const args = ['1', '2', '3'];

  const expectSpawnWasCalledWithArgs = () => {
    expect(childProcessMocked.spawn).toBeCalledWith(command, args);
  };

  test('should spawn command with command name and args', async () => {
    spawnMock('exit');

    await spawnCommand(command, args);

    expectSpawnWasCalledWithArgs();
  });

  test('should throw error if command was crashed', async () => {
    const expected = new Error();

    spawnMock('error', expected);

    try {
      await spawnCommand(command, args);
    } catch (actual) {
      expectSpawnWasCalledWithArgs();
      expect(actual).toBe(expected);

      return;
    }

    throw new Error(`command doesn't crashed`);
  });

  test('should return stdout result', async () => {
    const child = spawnMock('exit');
    const chunks = ['Hello', 'World'].map((value) => Buffer.from(value, 'utf-8'));

    const spawnResult = spawnCommand(command, args);

    for (const chunk of chunks) {
      child.stdout.emit('data', chunk);
    }

    const result = await spawnResult;

    expect(result).toBe(chunks.join(''));
  });
});

describe('runCommand', () => {
  test('should split full command to command name and args and spawn', async () => {
    spawnMock('exit');

    const fullCommand = 'npm run test';
    const [name, ...args] = fullCommand.split(' ');

    await runCommand(fullCommand);

    expect(childProcessMocked.spawn).toBeCalledWith(name, args);
  });
});
