import fps from 'fs/promises';
import path from 'path';
import { spawnCommand } from 'src/utils/run-command';
import { ROOT_PATH } from 'src/utils/path';
import { HOOK_DIR, PACKAGE_NAME } from './husky.const';
import { isInstalledAndInRootCheck } from 'src/utils/installed';

export type HookName = 'pre-commit' | 'commit-msg';
const ADD_HOOK_PLACEHOLDER = 'placeholder';

export const addHook = async (name: HookName, script: string) => {
  const huskyPath = path.join(HOOK_DIR, name);
  await spawnCommand('npx', [PACKAGE_NAME, 'add', huskyPath, ADD_HOOK_PLACEHOLDER]);

  const fileWithPlaceholder = await fps.readFile(huskyPath, { encoding: 'utf-8' });
  const fileWithScript = fileWithPlaceholder.replace(ADD_HOOK_PLACEHOLDER, script);

  const filePath = path.join(ROOT_PATH, huskyPath);
  await fps.writeFile(filePath, fileWithScript, { encoding: 'utf-8' });
};

export const isHuskyInstalled = isInstalledAndInRootCheck(PACKAGE_NAME, HOOK_DIR);
