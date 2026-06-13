import { writeGithubFile } from '#src/services/github.service.ts';
import { getDependabotConfig } from '#src/categories/js/dependabot/config/index.ts';
import { FILENAME } from '#src/categories/js/dependabot/dependabot.const.ts';

export const dependabot = async () => {
  const { content } = getDependabotConfig();

  await writeGithubFile(FILENAME, content);
};
