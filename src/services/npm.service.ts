import fsp from 'node:fs/promises';
import type { JsonValue, PackageJson as BasePackageJson } from 'type-fest';
import { resolveRootPath, writeRootJsonFile } from '#src/services/root.service.ts';
import { exec } from '#src/utils/terminal.utils.ts';

export const PACKAGE_JSON_NAME = 'package.json';
export const PACKAGE_JSON_PATH = resolveRootPath(PACKAGE_JSON_NAME);

type PackageJson = {
  [key: string]: unknown;
} & BasePackageJson;

export type NpmScript = {
  name: string;
  script: string;
};

export const readPackageJson = async () => {
  const json = await fsp.readFile(PACKAGE_JSON_PATH, { encoding: 'utf-8' });

  return JSON.parse(json) as PackageJson;
};

export const writePackageJson = async (packageJson: PackageJson) => {
  await writeRootJsonFile(PACKAGE_JSON_NAME, packageJson);
};

export const setPackageJsonField = async <V extends JsonValue>(name: keyof PackageJson, value: V) => {
  const packageJson = await readPackageJson();

  packageJson[name] = value;

  await writePackageJson(packageJson);
};

export const addNpmScripts = async (...scripts: NpmScript[]) => {
  const packageJson = await readPackageJson();

  packageJson.scripts ??= {};

  scripts.forEach(({ name, script }) => {
    // type-guard
    /* v8 ignore next 3 -- scripts is assigned above; this only narrows the package-json type. */
    if (packageJson.scripts) {
      packageJson.scripts[name] = script;
    }
  });

  await writePackageJson(packageJson);
};

export const runNpmScript = async (name: string) => {
  await exec('npm', ['run', name]);
};

export const installDevDependencies = async (...names: string[]) => {
  await exec('npm', ['i', '-D', ...names]);
};
