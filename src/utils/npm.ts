import fsp from 'node:fs/promises';
import type { PackageJson as BasePackageJson } from 'type-fest';
import { stringify } from './json';
import { PACKAGE_JSON_PATH } from './path';
import { runCommand } from './run-command';

interface PackageJson extends BasePackageJson {
  [key: string]: unknown;
}

export const getPackageJson = async () => {
  const json = await fsp.readFile(PACKAGE_JSON_PATH, { encoding: 'utf-8' });

  return JSON.parse(json) as PackageJson;
};

export const setPackageJson = async (packageJson: PackageJson) => {
  const string = stringify(packageJson);

  await fsp.writeFile(PACKAGE_JSON_PATH, string, { encoding: 'utf-8' });
};

export const addToPackageJson = async <V>(name: keyof PackageJson, value: V) => {
  const packageJson = await getPackageJson();

  packageJson[name] = value;

  await setPackageJson(packageJson);
};

export interface NpmScript {
  name: string;
  script: string;
}

export const addScripts = async (...scripts: NpmScript[]) => {
  const packageJson = await getPackageJson();

  packageJson.scripts ??= {};

  scripts.forEach(({ name, script }) => {
    packageJson.scripts![name] = script;
  });

  await setPackageJson(packageJson);
};

export const runScript = async (name: string) => {
  await runCommand(`npm run ${name}`);
};

export const installDevelopmentDependencies = async (...names: string[]) => {
  await runCommand(`npm i -D ${names.join(' ')}`);
};
