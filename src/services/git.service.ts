import path from 'node:path';
import { ensureRootDir, existsInRoot, readRootFile, writeRootFile } from '#src/services/root.service.ts';

const GITIGNORE_FILE_NAME = '.gitignore';
const GITKEEP_FILE_NAME = '.gitkeep';

type AddToGitignoreOptions = {
  comment: string;
  rules: string[];
};

export const addToGitignore = async ({ comment, rules }: AddToGitignoreOptions) => {
  const gitignoreExists = await existsInRoot(GITIGNORE_FILE_NAME);
  const gitignoreContent = gitignoreExists ? await readRootFile(GITIGNORE_FILE_NAME) : '';

  const block = [comment, ...rules].join('\n');
  if (gitignoreContent.includes(block)) {
    return;
  }

  const blockEntries = new Set([comment, ...rules]);
  const cleanedContent = gitignoreContent
    .split('\n')
    .filter((line) => !blockEntries.has(line))
    .join('\n')
    .trimEnd();

  const newContent = cleanedContent.length > 0 ? `${cleanedContent}\n\n${block}` : block;

  await writeRootFile(GITIGNORE_FILE_NAME, newContent);
};

export const addGitkeep = async (dir: string) => {
  await ensureRootDir(dir);
  await writeRootFile(path.join(dir, GITKEEP_FILE_NAME), '');
};
