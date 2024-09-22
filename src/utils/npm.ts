import fsp from 'node:fs/promises';
import type { PackageJson as BasePackageJson } from 'type-fest';
import { rootPath } from './path';
import { runCommand } from './run-command';
import { addJsonFileToRoot } from './fs';

export const PACKAGE_JSON_NAME = 'package.json';
export const PACKAGE_JSON_PATH = rootPath(PACKAGE_JSON_NAME);

type PackageJson = {
  [key: string]: unknown;
} & BasePackageJson;

export const getPackageJson = async () => {
  const json = await fsp.readFile(PACKAGE_JSON_PATH, { encoding: 'utf-8' });

  return JSON.parse(json) as PackageJson;
};

export const setPackageJson = async (packageJson: PackageJson) => {
  await addJsonFileToRoot(PACKAGE_JSON_NAME, packageJson);
};

export const addToPackageJson = async <V>(name: keyof PackageJson, value: V) => {
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
    if (packageJson.scripts) {
      packageJson.scripts[name] = script;
    }
  });

  await setPackageJson(packageJson);
};

export const runScript = async (name: string) => {
  await runCommand(`npm run ${name}`);
};

export const installDevelopmentDependencies = async (...names: string[]) => {
  await runCommand(`npm i -D ${names.join(' ')}`);
};
