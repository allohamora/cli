import { runCommand, spawnCommand } from './run-command';

export const getNodeVersion = async () => {
  const versionConsoleOutput = await runCommand('node -v');

  return versionConsoleOutput.trim().replace('v', '');
};
