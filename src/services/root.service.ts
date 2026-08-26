import fsp from 'node:fs/promises';
import path from 'node:path';

export const ROOT_PATH = process.cwd();

export const resolveRootPath = (...paths: string[]) => path.join(ROOT_PATH, ...paths);

export const existsInRoot = async (name: string) => {
  const checkPath = resolveRootPath(name);

  return await fsp
    .access(checkPath)
    .then(() => true)
    .catch(() => false);
};

export const ensureRootDir = async (name: string) => {
  const dirPath = resolveRootPath(name);

  if (await existsInRoot(name)) {
    return;
  }

  await fsp.mkdir(dirPath, { recursive: true });
};

export const readRootFile = async (name: string) => {
  const filePath = resolveRootPath(name);

  return await fsp.readFile(filePath, { encoding: 'utf-8' });
};

export const writeRootFile = async (name: string, content: string) => {
  const filePath = resolveRootPath(name);

  await fsp.writeFile(filePath, `${content.trimEnd()}\n`, { encoding: 'utf-8' });
};

export const writeRootJsonFile = async <C>(name: string, content: C) => {
  await writeRootFile(name, JSON.stringify(content, null, 2));
};

export const writeRootSymlink = async (name: string, target: string, type?: 'file' | 'dir') => {
  const filePath = resolveRootPath(name);

  if (await existsInRoot(name)) {
    await fsp.unlink(filePath);
  }

  await fsp.symlink(target, filePath, type);
};
