import { writeGithubFile } from '#src/services/github.service.ts';
import { getDependabotPreset } from '#src/categories/js/dependabot/preset/index.ts';
import { FILENAME } from '#src/categories/js/dependabot/dependabot.const.ts';
import { Document, isNode, isScalar, isSeq, type YAMLMap } from 'yaml';

const addSpaceBetweenUpdates = (node: YAMLMap) => {
  for (const pair of node.items) {
    if (isScalar(pair.key) && pair.key.value === 'updates' && isSeq(pair.value)) {
      pair.value.items.forEach((item, index) => {
        if (index > 0 && isNode(item)) {
          item.spaceBefore = true;
        }
      });
    }
  }
};

const stringifyDependabotConfig = (content: Record<string, unknown>) => {
  const document = new Document(content);

  addSpaceBetweenUpdates(document.contents as YAMLMap);

  return document.toString({
    indent: 2,
    lineWidth: 0,
    nullStr: '',
    simpleKeys: true,
  });
};

export const dependabot = async () => {
  const { content } = getDependabotPreset();

  await writeGithubFile(FILENAME, stringifyDependabotConfig(content));
};
