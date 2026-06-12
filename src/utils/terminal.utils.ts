import { execa } from 'execa';

export const exec = async (command: string, args: string[]) => {
  return await execa(command, args);
};
