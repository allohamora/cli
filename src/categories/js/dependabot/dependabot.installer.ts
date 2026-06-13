import { writeGithubFile } from '#src/services/github.service.ts';
import { getDependabotPreset } from '#src/categories/js/dependabot/preset/index.ts';
import { FILENAME } from '#src/categories/js/dependabot/dependabot.const.ts';

export const dependabot = async () => {
  const { content } = getDependabotPreset();

  await writeGithubFile(FILENAME, content);
};
