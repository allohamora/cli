import { isInstalledAndInRootCheck } from 'src/utils/installed';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from './prettier.config';

export const isPrettierInstalled = isInstalledAndInRootCheck(PACKAGE_NAME, CONFIG_FILE_NAME);
