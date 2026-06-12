import fsp from 'node:fs/promises';
import type { JsonValue, PackageJson as BasePackageJson } from 'type-fest';
import { resolveRootPath, writeRootJsonFile } from '#src/services/root.service.ts';
import { runCommand } from '#src/utils/process.ts';

export const PACKAGE_JSON_NAME = 'package.json';
export const PACKAGE_JSON_PATH = resolveRootPath(PACKAGE_JSON_NAME);

type PackageJson = {
  [key: string]: unknown;
} & BasePackageJson;

export const getPackageJson = async () => {
  const json = await fsp.readFile(PACKAGE_JSON_PATH, { encoding: 'utf-8' });

  return JSON.parse(json) as PackageJson;
};

export const setPackageJson = async (packageJson: PackageJson) => {
  await writeRootJsonFile(PACKAGE_JSON_NAME, packageJson);
};

export const addToPackageJson = async <V extends JsonValue>(name: keyof PackageJson, value: V) => {
  const packageJson = await getPackageJson();

  packageJson[name] = value;

  await setPackageJson(packageJson);
};

export type NpmScript = {
  name: string;
  script: string;
};

export const addScripts = async (...scripts: NpmScript[]) => {
  const packageJson = await getPackageJson();

  packageJson.scripts ??= {};

  scripts.forEach(({ name, script }) => {
    // type-guard
    /* v8 ignore next 3 -- scripts is assigned above; this only narrows the package-json type. */
    if (packageJson.scripts) {
      packageJson.scripts[name] = script;
    }
  });

  await setPackageJson(packageJson);
};

export const runScript = async (name: string) => {
  await runCommand('npm', ['run', name]);
};

export const installDevelopmentDependencies = async (...names: string[]) => {
  await runCommand('npm', ['i', '-D', ...names]);
};
