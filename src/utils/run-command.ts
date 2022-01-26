import { spawn } from 'child_process';

export const spawnCommand = async (command: string, args: string[]) =>
  new Promise((res, rej) => {
    const child = spawn(command, args);

    child.on('error', (err) => rej(err));
    child.on('exit', () => res(undefined));
  });

export const runCommand = async (command: string) => {
  const [name, ...args] = command.split(' ');

  return await spawnCommand(name, args);
};
