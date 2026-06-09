import { addHook, isHuskyInstalled } from '#src/categories/js/husky/husky.utils.ts';
import { CLI_NAME } from '#src/categories/js/commitlint/commitlint.const.ts';

export const huskyIntegration = async () => {
  if (await isHuskyInstalled()) {
    await addHook('commit-msg', `npx --no-install -- ${CLI_NAME} --edit "$1"`);
  }
};
