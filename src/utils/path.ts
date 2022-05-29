import path from 'node:path';

export const ROOT_PATH = process.cwd();
export const PACKAGE_JSON_PATH = path.join(ROOT_PATH, 'package.json');

export const rootPath = (...paths: string[]) => path.join(ROOT_PATH, ...paths);
