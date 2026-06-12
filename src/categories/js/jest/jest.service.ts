import { createRootInstalledCheck } from '#src/services/installation.service.ts';
import { SCRIPT_NAME } from '#src/categories/js/jest/jest.const.ts';
import { CONFIG_FILE_NAME } from '#src/categories/js/jest/jest.const.ts';

export const isJestInstalled = createRootInstalledCheck(SCRIPT_NAME, CONFIG_FILE_NAME);
