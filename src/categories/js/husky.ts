import fps from 'fs/promises';
import path from 'path';
import { addScripts, installDevelopmentDependencies, runScript } from 'src/libs/npm';
import { spawnCommand } from 'src/libs/run-command';
import { ROOT_PATH } from 'src/libs/path';

type HookName = 'pre-commit' | 'commit-msg';
const ADD_HOOK_PLACEHOLDER = 'placeholder';

export const addHook = async (name: HookName, script: string) => {
  const huskyPath = `.husky/${name}`;
  await spawnCommand('npx', ['husky', 'add', huskyPath, ADD_HOOK_PLACEHOLDER]);

  const fileWithPlaceholder = await fps.readFile(huskyPath, { encoding: 'utf-8' });
  const fileWithScript = fileWithPlaceholder.replace(ADD_HOOK_PLACEHOLDER, script);

  const filePath = path.join(ROOT_PATH, huskyPath);
  await fps.writeFile(filePath, fileWithScript, { encoding: 'utf-8' });
};

export const husky = async () => {
  await installDevelopmentDependencies('husky');
  await addScripts({ name: 'prepare', script: 'husky install' });
  await runScript('prepare');
};
