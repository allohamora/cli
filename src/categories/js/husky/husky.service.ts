import path from 'node:path';
import { HOOK_DIR, PACKAGE_NAME } from '#src/categories/js/husky/husky.const.ts';
import { createRootInstalledCheck } from '#src/services/installation.service.ts';
import { writeRootFile } from '#src/services/root.service.ts';

export type HookName = 'pre-commit' | 'commit-msg';

export const addHook = async (name: HookName, script: string) => {
  const hookPath = path.join(HOOK_DIR, name);

  await writeRootFile(hookPath, script);
};

export const isHuskyInstalled = createRootInstalledCheck(PACKAGE_NAME, HOOK_DIR);
