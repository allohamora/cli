import fps from 'fs/promises';
import path from 'path';
import { spawnCommand } from 'src/utils/run-command';
import { ROOT_PATH } from 'src/utils/path';
import { getInstalling } from 'src/states/context';
import { isExistsInRoot } from 'src/utils/fs';

export type HookName = 'pre-commit' | 'commit-msg';
const ADD_HOOK_PLACEHOLDER = 'placeholder';

export const PACKAGE_NAME = 'husky';
export const HOOK_DIR = `.${PACKAGE_NAME}`;

export const addHook = async (name: HookName, script: string) => {
  const huskyPath = path.join(HOOK_DIR, name);
  await spawnCommand('npx', [PACKAGE_NAME, 'add', huskyPath, ADD_HOOK_PLACEHOLDER]);

  const fileWithPlaceholder = await fps.readFile(huskyPath, { encoding: 'utf-8' });
  const fileWithScript = fileWithPlaceholder.replace(ADD_HOOK_PLACEHOLDER, script);

  const filePath = path.join(ROOT_PATH, huskyPath);
  await fps.writeFile(filePath, fileWithScript, { encoding: 'utf-8' });
};

export const isHuskyInstalled = async () => {
  const installing = getInstalling();

  if (installing.includes(PACKAGE_NAME)) {
    return true;
  }

  return await isExistsInRoot(HOOK_DIR);
};