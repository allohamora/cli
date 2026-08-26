import { AGENTS_MD_FILE_NAME, CLAUDE_MD_FILE_NAME } from '#src/categories/js/agents-md/agents-md.const.ts';
import { getAgentsMdPreset } from '#src/categories/js/agents-md/preset/index.ts';
import { writeRootFile, writeRootSymlink } from '#src/services/root.service.ts';

export const agentsMd = async () => {
  const { content } = getAgentsMdPreset();

  await writeRootFile(AGENTS_MD_FILE_NAME, content);
  await writeRootSymlink(CLAUDE_MD_FILE_NAME, AGENTS_MD_FILE_NAME);
};
