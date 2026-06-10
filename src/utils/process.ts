import { execa } from 'execa';

export const runCommand = async (file: string, args: string[]) => {
  await execa(file, args);
};
