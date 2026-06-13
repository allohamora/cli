import { addHook, isHuskyInstalled } from '#src/categories/js/husky/husky.service.ts';
import { COMMITLINT_CLI_NAME } from '#src/categories/js/commitlint/commitlint.const.ts';

export const huskyIntegration = async () => {
  if (await isHuskyInstalled()) {
    await addHook('commit-msg', `npx --no-install -- ${COMMITLINT_CLI_NAME} --edit "$1"`);
  }
};
