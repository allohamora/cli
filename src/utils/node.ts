import { runCommand } from '#src/utils/process.ts';

export const getNodeVersion = async () => {
  const { stdout } = await runCommand('node', ['-v']);

  return stdout.trim().replace('v', '');
};
