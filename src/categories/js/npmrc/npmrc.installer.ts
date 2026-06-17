import { NPMRC_FILE_NAME } from '#src/categories/js/npmrc/npmrc.const.ts';
import { getNpmrcPreset } from '#src/categories/js/npmrc/preset/index.ts';
import { writeRootFile } from '#src/services/root.service.ts';

export const npmrc = async () => {
  const { config } = getNpmrcPreset();

  await writeRootFile(NPMRC_FILE_NAME, config.join('\n'));
};
