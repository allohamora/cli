import path from 'node:path';
import { HUSKY_HOOK_DIR, HUSKY_PACKAGE_NAME } from '#src/categories/js/husky/husky.const.ts';
import { createRootInstalledCheck } from '#src/services/installation.service.ts';
import { writeRootFile } from '#src/services/root.service.ts';

export type HookName = 'pre-commit' | 'commit-msg';

export const addHook = async (name: HookName, script: string) => {
  const hookPath = path.join(HUSKY_HOOK_DIR, name);

  await writeRootFile(hookPath, script);
};

export const isHuskyInstalled = createRootInstalledCheck(HUSKY_PACKAGE_NAME, HUSKY_HOOK_DIR);
