import { ESLINT_SCRIPT_NAME } from '#src/categories/js/eslint/eslint.const.ts';
import { PRETTIER_PACKAGE_NAME } from '#src/categories/js/prettier/prettier.const.ts';
import { isSelectedForInstall } from '#src/services/installation.service.ts';
import { hasNpmScript } from '#src/services/npm.service.ts';

export const CheckScriptName = {
  Lint: 'lint',
  Format: 'format',
  Typecheck: 'typecheck',
  Check: 'check',
  Build: 'build',
} as const;

export type CheckScriptNameValue = (typeof CheckScriptName)[keyof typeof CheckScriptName];

const checkScriptNames = Object.values(CheckScriptName);

export const isLintAvailable = async () => {
  return isSelectedForInstall(ESLINT_SCRIPT_NAME) || (await hasNpmScript(CheckScriptName.Lint));
};

export const isFormatAvailable = async () => {
  return isSelectedForInstall(PRETTIER_PACKAGE_NAME) || (await hasNpmScript(CheckScriptName.Format));
};

export const isCheckAvailable = async () => {
  return await hasNpmScript(CheckScriptName.Check);
};

export const isTypecheckAvailable = async () => {
  return await hasNpmScript(CheckScriptName.Typecheck);
};

export const isBuildAvailable = async () => {
  return await hasNpmScript(CheckScriptName.Build);
};

const availabilityChecks = {
  [CheckScriptName.Lint]: isLintAvailable,
  [CheckScriptName.Format]: isFormatAvailable,
  [CheckScriptName.Typecheck]: isTypecheckAvailable,
  [CheckScriptName.Check]: isCheckAvailable,
  [CheckScriptName.Build]: isBuildAvailable,
} satisfies Record<CheckScriptNameValue, () => Promise<boolean>>;

export const getAvailableCheckScripts = async () => {
  const availableScripts: CheckScriptNameValue[] = [];

  for (const name of checkScriptNames) {
    if (await availabilityChecks[name]()) {
      availableScripts.push(name);
    }
  }

  return availableScripts;
};
