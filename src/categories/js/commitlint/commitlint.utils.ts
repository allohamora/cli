import { addHook } from '../husky/husky.utils';

export const huskyHandler = async () => {
  await addHook('commit-msg', 'npx --no-install -- commitlint --edit "$1"');
};
