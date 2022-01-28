import { addHook } from '../husky/husky.utils';
import { CLI_NAME } from './commitlint.config';

export const huskyIntegration = async () => {
  await addHook('commit-msg', `npx --no-install -- ${CLI_NAME} --edit "$1"`);
};
