import prettier from "prettier";
import { isInstalledAndInRootCheck } from "#src/utils/installed.ts";
import { getConfig } from "#src/categories/js/prettier/prettier.config.ts";
import {
  CONFIG_FILE_NAME,
  PACKAGE_NAME,
} from "#src/categories/js/prettier/prettier.const.ts";

export const isPrettierInstalled = isInstalledAndInRootCheck(
  PACKAGE_NAME,
  CONFIG_FILE_NAME,
);

export const formatJavascript = async (input: string) => {
  const { config } = getConfig();

  return await prettier.format(input, {
    parser: "typescript",
    ...config,
  } as prettier.Options);
};
