import { exec } from '#src/services/terminal.service.ts';

export const getNodeVersion = async () => {
  const { stdout } = await exec('node', ['-v']);

  return stdout.trim().replace('v', '');
};
