import { writeGithubFile } from '#src/services/github.service.ts';
import { getDependabotPreset } from '#src/categories/js/dependabot/preset/index.ts';
import { FILENAME } from '#src/categories/js/dependabot/dependabot.const.ts';
import { stringify } from 'yaml';

export const dependabot = async () => {
  const { content } = getDependabotPreset();

  await writeGithubFile(FILENAME, stringify(content));
};
