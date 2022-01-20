import fsp from 'fs/promises';
import { rootPath } from './path';
import { stringify } from './json';

export const existsInRoot = async (name: string) => {
  const checkPath = rootPath(name);

  return await fsp
    .access(checkPath)
    .then(() => true)
    .catch(() => false);
};

export const addDirToRootIfNotExists = async (name: string) => {
  const dirPath = rootPath(name);

  if (await existsInRoot(name)) {
    return;
  }

  await fsp.mkdir(dirPath);
};

export const addFileToRoot = async (name: string, content: string) => {
  const filePath = rootPath(name);

  await fsp.writeFile(filePath, content, { encoding: 'utf-8' });
};

export const addJsonFileToRoot = async <C>(name: string, content: C) => {
  await addFileToRoot(name, stringify(content));
};
