import { isInstalledAndInRootCheck } from 'src/utils/installed';
import { SCRIPT_NAME } from './jest.const';
import { CONFIG_FILE_NAME } from './jest.const';

export const isJestInstalled = isInstalledAndInRootCheck(SCRIPT_NAME, CONFIG_FILE_NAME);
