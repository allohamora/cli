import { TEMP_DIR_NAME } from '#src/categories/js/temp-dir/temp-dir.const.ts';
import { getTempDirPreset } from '#src/categories/js/temp-dir/preset/index.ts';
import { addGitkeep, addToGitignore } from '#src/services/git.service.ts';

export const tempDir = async () => {
  const { gitignoreComment, gitignoreRules } = getTempDirPreset();

  await addGitkeep(TEMP_DIR_NAME);
  await addToGitignore({ comment: gitignoreComment, rules: gitignoreRules });
};
