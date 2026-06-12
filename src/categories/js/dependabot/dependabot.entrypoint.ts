import { writeGithubFile } from '#src/services/github.service.ts';
import { getConfig } from '#src/categories/js/dependabot/config/index.ts';
import { FILENAME } from '#src/categories/js/dependabot/dependabot.const.ts';

export const dependabot = async () => {
  const { content } = getConfig();

  await writeGithubFile(FILENAME, content);
};
