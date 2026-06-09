import { runCommand } from '#src/utils/run-command.ts';

export const getNodeVersion = async () => {
  const versionConsoleOutput = await runCommand('node -v');

  return versionConsoleOutput.trim().replace('v', '');
};
