import { addScripts, installDevelopmentDependencies, runScript } from "src/utils/npm";
import { spawnCommand } from "src/utils/run-command";

type HookName = 'pre-commit' | 'commit-msg';

export const addHook = async (name: HookName, script: string) => {
  await spawnCommand('npx', ['husky', 'add', `.husky/${name}`, `'${script}'`]);
};

export const husky = async () => {
  await installDevelopmentDependencies('husky');
  await addScripts({ name: 'prepare', script: 'husky install' });
  await runScript('prepare');
};