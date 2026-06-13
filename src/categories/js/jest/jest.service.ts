import { createRootInstalledCheck } from '#src/services/installation.service.ts';
import { JEST_SCRIPT_NAME, JEST_CONFIG_FILE_NAME } from '#src/categories/js/jest/jest.const.ts';

export const isJestInstalled = createRootInstalledCheck(JEST_SCRIPT_NAME, JEST_CONFIG_FILE_NAME);
