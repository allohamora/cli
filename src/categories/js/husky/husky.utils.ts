import path from 'node:path';
import { HOOK_DIR, PACKAGE_NAME } from './husky.const';
import { isInstalledAndInRootCheck } from 'src/utils/installed';
import { addFileToRoot } from 'src/utils/fs';

export type HookName = 'pre-commit' | 'commit-msg';

export const addHook = async (name: HookName, script: string) => {
  const hookPath = path.join(HOOK_DIR, name);

  await addFileToRoot(hookPath, script);
};

export const isHuskyInstalled = isInstalledAndInRootCheck(PACKAGE_NAME, HOOK_DIR);
