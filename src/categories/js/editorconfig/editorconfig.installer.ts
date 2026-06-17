import { EDITORCONFIG_FILE_NAME } from '#src/categories/js/editorconfig/editorconfig.const.ts';
import { getEditorconfigPreset } from '#src/categories/js/editorconfig/preset/index.ts';
import { writeRootFile } from '#src/services/root.service.ts';

export const editorconfig = async () => {
  const { config } = getEditorconfigPreset();

  await writeRootFile(EDITORCONFIG_FILE_NAME, config);
};
