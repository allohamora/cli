import { addToGithubDir } from 'src/utils/github';
import { getConfig } from './dependabot.config';
import { FILENAME } from './dependabot.const';

export const dependabot = async () => {
  const { content } = getConfig();

  await addToGithubDir(FILENAME, content);
};
