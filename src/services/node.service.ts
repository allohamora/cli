import { exec } from '#src/utils/terminal.utils.ts';

export const getNodeVersion = async () => {
  const { stdout } = await exec('node', ['-v']);

  return stdout.trim().replace('v', '');
};
