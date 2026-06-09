import { isInstalledAndInRootCheck } from "#src/utils/installed.ts";
import {
  CONFIG_FILE_NAME,
  PACKAGE_NAME,
} from "#src/categories/js/prettier/prettier.const.ts";

export const isPrettierInstalled = isInstalledAndInRootCheck(
  PACKAGE_NAME,
  CONFIG_FILE_NAME,
);
