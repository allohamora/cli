import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT_PATH } from '#src/services/root.service.ts';
import { vi, type MockInstance } from 'vitest';

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
  private symlinks = new Map<string, string>();
  private symlinkTypes = new Map<string, string>();

  public setup(options?: SeedProjectOptions) {
    this.seed(options);
    this.clear();

    this.spies = [
      vi.spyOn(fsp, 'access').mockImplementation(async (filepath) => {
        const relativePath = this.toRootRelativePath(filepath);

        if (this.resolvesToExistingEntry(relativePath)) {
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
      vi.spyOn(fsp, 'symlink').mockImplementation(async (target, filepath, type) => {
        const relativePath = this.toRootRelativePath(filepath);

        this.symlinks.set(relativePath, String(target));

        if (type) {
          this.symlinkTypes.set(relativePath, String(type));
        }

        return undefined;
      }),
      vi.spyOn(fsp, 'unlink').mockImplementation(async (filepath) => {
        const relativePath = this.toRootRelativePath(filepath);

        if (!this.exists(relativePath)) {
          throw Object.assign(new Error(`${relativePath} does not exist`), { code: 'ENOENT' });
        }

        this.files.delete(relativePath);
        this.symlinks.delete(relativePath);
        this.symlinkTypes.delete(relativePath);

        return undefined;
      }),
      vi.spyOn(fsp, 'glob').mockImplementation(((patterns: string | readonly string[]) => {
        const patternList = (Array.isArray(patterns) ? patterns : [patterns]).map((pattern: string) =>
          pattern.replace(/\/$/, ''),
        );
        const matches = [...this.dirPaths()].filter((dirPath) =>
          patternList.some((pattern) => this.matchesGlobPattern(pattern, dirPath)),
        );

        return (async function* () {
          for (const match of matches) {
            yield match;
          }
        })();
      }) as typeof fsp.glob),
    ];
  }

  private dirPaths() {
    const paths = new Set<string>();

    const addSegments = (fullPath: string, includeSelf: boolean) => {
      const segments = fullPath.split('/');
      const depth = includeSelf ? segments.length : segments.length - 1;

      for (let i = 1; i <= depth; i++) {
        paths.add(segments.slice(0, i).join('/'));
      }
    };

    for (const dir of this.dirs) {
      addSegments(dir, true);
    }

    for (const file of this.files.keys()) {
      addSegments(file, false);
    }

    return paths;
  }

  private matchesGlobPattern(pattern: string, candidate: string) {
    const patternSegments = pattern.split('/');
    const candidateSegments = candidate.split('/');

    return (
      patternSegments.length === candidateSegments.length &&
      patternSegments.every((segment, i) => segment === '*' || segment === candidateSegments[i])
    );
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
    this.symlinks.clear();
    this.symlinkTypes.clear();

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
    return this.files.has(name) || this.dirs.has(name) || this.symlinks.has(name);
  }

  public readFile(name: string) {
    return this.files.get(name);
  }

  public readSymlink(name: string) {
    return this.symlinks.get(name);
  }

  public readSymlinkType(name: string) {
    return this.symlinkTypes.get(name);
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

  private resolvesToExistingEntry(name: string, seen = new Set<string>()): boolean {
    if (this.files.has(name) || this.dirs.has(name)) {
      return true;
    }

    const target = this.symlinks.get(name);

    if (target === undefined || seen.has(name)) {
      return false;
    }

    seen.add(name);

    return this.resolvesToExistingEntry(target, seen);
  }

  private toRootRelativePath(value: unknown) {
    const filepath = value instanceof URL ? fileURLToPath(value) : String(value);

    if (path.isAbsolute(filepath)) {
      return path.relative(ROOT_PATH, filepath);
    }

    return filepath;
  }
}
