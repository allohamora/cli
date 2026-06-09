import { addToGithubDir } from '#src/utils/github.ts';
import { getConfig } from '#src/categories/js/dependabot/dependabot.config.ts';
import { FILENAME } from '#src/categories/js/dependabot/dependabot.const.ts';

export const dependabot = async () => {
  const { content } = getConfig();

  await addToGithubDir(FILENAME, content);
};
