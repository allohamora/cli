import path from 'path';
import fsp from 'fs/promises';
import { ROOT_PATH } from './path';
import { stringify } from './json';

export const addFileToRoot = async (name: string, content: string) => {
  const filePath = path.join(ROOT_PATH, name);
  await fsp.writeFile(filePath, content, { encoding: 'utf-8' });
};

export const addJsonFileToRoot = async <C extends unknown>(name: string, content: C) => {
  await addFileToRoot(name, stringify(content));
};