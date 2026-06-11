import { execa } from 'execa';

export const runCommand = async (file: string, args: string[]) => {
  return await execa(file, args);
};
