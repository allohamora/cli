import { getNodeVersion } from '#src/services/node.service.ts';
import { writeRootFile } from '#src/services/root.service.ts';
import { NVMRC_FILE_NAME } from '#src/categories/js/nvmrc/nvmrc.const.ts';

export const nvmrc = async () => {
  const version = await getNodeVersion();

  await writeRootFile(NVMRC_FILE_NAME, version);
};
