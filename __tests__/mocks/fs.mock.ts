import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { MockInstance } from 'vitest';
import { ROOT_PATH } from '#src/utils/path.ts';

vi.mock('node:fs/promises');

type PackageJson = Record<string, unknown>;

type SeedProjectOptions = {
  dirs?: string[];
  files?: Record<string, string>;
  packageJson?: PackageJson | null;
};

export class FileSystem {
  private spies: MockInstance[] = [];

  private dirs = new Set<string>();
  private files = new Map<string, string>();

  public setup(options?: SeedProjectOptions) {
    this.seed(options);
    this.clear();

    this.spies = [
      vi.spyOn(fsp, 'access').mockImplementation(async (filepath) => {
        const relativePath = this.toRootRelativePath(filepath);

        if (this.exists(relativePath)) {
          return;
        }

        throw new Error(`${relativePath} does not exist`);
      }),
      vi.spyOn(fsp, 'mkdir').mockImplementation(async (filepath) => {
        this.dirs.add(this.toRootRelativePath(filepath));

        return undefined;
      }),
      vi.spyOn(fsp, 'readFile').mockImplementation(async (filepath) => {
        const relativePath = this.toRootRelativePath(filepath);
        const content = this.readFile(relativePath);

        if (typeof content === 'undefined') {
          throw new Error(`${relativePath} does not exist`);
        }

        return content;
      }),
      vi.spyOn(fsp, 'writeFile').mockImplementation(async (filepath, content) => {
        this.writeFile(this.toRootRelativePath(filepath), content.toString());

        return undefined;
      }),
    ];
  }

  public clear() {
    for (const spy of this.spies) {
      spy.mockRestore();
    }

    this.spies = [];
  }

  public seed({ dirs = [], files = {}, packageJson = {} }: SeedProjectOptions = {}) {
    this.files.clear();
    this.dirs.clear();

    for (const dir of dirs) {
      this.dirs.add(dir);
    }

    for (const [filename, content] of Object.entries(files)) {
      this.files.set(filename, content);
    }

    if (packageJson !== null) {
      this.files.set('package.json', JSON.stringify(packageJson));
    }
  }

  public exists(name: string) {
    return this.files.has(name) || this.dirs.has(name);
  }

  public readFile(name: string) {
    return this.files.get(name);
  }

  public readJson<T = unknown>(name: string) {
    return JSON.parse(this.files.get(name) ?? 'null') as T;
  }

  public writeFile(name: string, content: string) {
    this.files.set(name, content);
  }

  public getDirs() {
    return [...new Set(this.dirs)];
  }

  public getFiles() {
    return Object.fromEntries(new Map(this.files).entries());
  }

  private toRootRelativePath(value: unknown) {
    const filepath = value instanceof URL ? fileURLToPath(value) : String(value);

    if (path.isAbsolute(filepath)) {
      return path.relative(ROOT_PATH, filepath);
    }

    return filepath;
  }
}
