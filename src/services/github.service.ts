import path from 'node:path';
import { ensureRootDir, writeRootFile } from '#src/services/root.service.ts';
import { Document, isMap, isNode, isSeq, isScalar } from 'yaml';

export const GITHUB_DIR_NAME = '.github';
export const GITHUB_WORKFLOWS_DIR_NAME = 'workflows';
export const GITHUB_WORKFLOWS_PATH = path.join(GITHUB_DIR_NAME, GITHUB_WORKFLOWS_DIR_NAME);

export const ensureGithubDir = async () => {
  await ensureRootDir(GITHUB_DIR_NAME);
};

export const ensureGithubWorkflowsDir = async () => {
  await ensureGithubDir();
  await ensureRootDir(GITHUB_WORKFLOWS_PATH);
};

const addSpaceBetweenSteps = (node: unknown) => {
  if (isMap(node)) {
    for (const pair of node.items) {
      if (isScalar(pair.key) && pair.key.value === 'steps' && isSeq(pair.value)) {
        pair.value.items.forEach((item, index) => {
          if (index > 0 && isNode(item)) {
            item.spaceBefore = true;
          }
        });
      }

      addSpaceBetweenSteps(pair.value);
    }

    return;
  }

  if (isSeq(node)) {
    node.items.forEach(addSpaceBetweenSteps);
  }
};

const addSpaceBetweenTopLevelEntries = (node: unknown) => {
  if (!isMap(node)) {
    return;
  }

  node.items.forEach((pair, index) => {
    if (index > 0 && isNode(pair.key)) {
      pair.key.spaceBefore = true;
    }
  });
};

const stringifyGithubWorkflow = (content: Record<string, unknown>) => {
  const document = new Document(content);

  addSpaceBetweenTopLevelEntries(document.contents);
  addSpaceBetweenSteps(document.contents);

  return document.toString({
    indent: 2,
    lineWidth: 0,
    nullStr: '',
    simpleKeys: true,
  });
};

export const writeGithubWorkflow = async (filename: string, content: Record<string, unknown>) => {
  await ensureGithubWorkflowsDir();

  const relativeFilePath = path.join(GITHUB_WORKFLOWS_PATH, filename);
  await writeRootFile(relativeFilePath, stringifyGithubWorkflow(content));
};

export const writeGithubFile = async (filename: string, content: string) => {
  await ensureGithubDir();

  const relativeFilePath = path.join(GITHUB_DIR_NAME, filename);
  await writeRootFile(relativeFilePath, content);
};
