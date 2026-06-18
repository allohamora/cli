import { TEMP_DIR_NAME } from '#src/categories/js/temp-dir/temp-dir.const.ts';

export const defaultPreset = {
  gitignoreComment: '# Temp files',
  gitignoreRules: [`${TEMP_DIR_NAME}/**/*`, `!${TEMP_DIR_NAME}/.gitkeep`],
};
