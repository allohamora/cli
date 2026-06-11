import { isInstalledAndInRootCheck } from '#src/utils/installed.ts';
import { SCRIPT_NAME } from '#src/categories/js/jest/jest.const.ts';
import { CONFIG_FILE_NAME } from '#src/categories/js/jest/jest.const.ts';

export const isJestInstalled = isInstalledAndInRootCheck(SCRIPT_NAME, CONFIG_FILE_NAME);
