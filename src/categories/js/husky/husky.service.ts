import path from 'node:path';
import { HOOK_DIR, PACKAGE_NAME } from '#src/categories/js/husky/husky.const.ts';
import { isInstalledAndInRootCheck } from '#src/utils/installed.ts';
import { addFileToRoot } from '#src/utils/fs.ts';

export type HookName = 'pre-commit' | 'commit-msg';

export const addHook = async (name: HookName, script: string) => {
  const hookPath = path.join(HOOK_DIR, name);

  await addFileToRoot(hookPath, script);
};

export const isHuskyInstalled = isInstalledAndInRootCheck(PACKAGE_NAME, HOOK_DIR);
