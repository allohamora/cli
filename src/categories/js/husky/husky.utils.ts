import fps from 'node:fs/promises';
import path from 'node:path';
import { ROOT_PATH } from 'src/utils/path';
import { HOOK_DIR, PACKAGE_NAME } from './husky.const';
import { isInstalledAndInRootCheck } from 'src/utils/installed';
import { addDirToRootIfNotExists } from 'src/utils/fs';

export type HookName = 'pre-commit' | 'commit-msg';

export const addHook = async (name: HookName, script: string) => {
  const hookPath = path.join(ROOT_PATH, HOOK_DIR, name);

  await addDirToRootIfNotExists(HOOK_DIR);

  await fps.writeFile(hookPath, script, { encoding: 'utf-8' });
};

export const isHuskyInstalled = isInstalledAndInRootCheck(PACKAGE_NAME, HOOK_DIR);
