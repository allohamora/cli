import fsp from 'node:fs/promises';
import type { JsonValue, PackageJson as BasePackageJson } from 'type-fest';
import { resolveRootPath, writeRootJsonFile } from '#src/services/root.service.ts';
import { exec } from '#src/utils/terminal.utils.ts';
import { CliError } from '#src/utils/error.utils.ts';

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

export const hasNpmScript = async (name: string) => {
  const packageJson = await readPackageJson();

  return typeof packageJson.scripts?.[name] === 'string';
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
  const packageJsonScripts = (packageJson.scripts ??= {});

  for (const { name, script } of scripts) {
    packageJsonScripts[name] = script;
  }

  await writePackageJson(packageJson);
};

export const runNpmScript = async (name: string) => {
  await exec('npm', ['run', name]);
};

export const installDevDependencies = async (...names: string[]) => {
  await exec('npm', ['i', '-D', ...names]);
};

export const getNpmVersion = async () => {
  const { stdout } = await exec('npm', ['-v']);

  return stdout.trim();
};

export const getRepositoryUrl = async () => {
  const packageJson = await readPackageJson();
  const repositoryUrl = packageJson.homepage?.replace(/#.*$/, '');
  if (!repositoryUrl) {
    throw new CliError('homepage is missing in package.json');
  }

  return repositoryUrl;
};
