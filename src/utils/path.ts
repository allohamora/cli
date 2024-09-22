import path from 'node:path';

export const ROOT_PATH = process.cwd();

export const rootPath = (...paths: string[]) => path.join(ROOT_PATH, ...paths);
