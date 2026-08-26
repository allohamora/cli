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

const VALID_PROJECT_NAME_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/;

const extractOwner = (packageJson: PackageJson) => {
  const repositoryUrl = packageJson.homepage?.replace(/#.*$/, '');

  return repositoryUrl ? new URL(repositoryUrl).pathname.split('/').filter(Boolean)[0] : undefined;
};

const extractProjectName = (packageJson: PackageJson) => {
  const rawName = packageJson.name;
  if (!rawName) {
    throw new CliError('name is missing in package.json');
  }

  if (!rawName.startsWith('@')) {
    return rawName;
  }

  const owner = extractOwner(packageJson);
  const [scope, name] = rawName.slice(1).split('/');

  return scope === owner ? name : scope;
};

const validateProjectName = (name?: string) => {
  if (!name || !VALID_PROJECT_NAME_REGEX.test(name)) {
    throw new CliError(`"${name}" is not a valid devcontainer project name`);
  }

  return name;
};

export const getProjectName = async () => {
  const packageJson = await readPackageJson();

  return validateProjectName(extractProjectName(packageJson));
};
