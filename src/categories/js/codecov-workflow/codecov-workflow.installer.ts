import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getCodecovWorkflowPreset } from '#src/categories/js/codecov-workflow/preset/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/codecov-workflow/codecov-workflow.const.ts';
import { applyMutations } from '#src/utils/mutation.utils.ts';

export const codecovWorkflow = async () => {
  const sourcePreset = getCodecovWorkflowPreset();
  const preset = { ...sourcePreset, content: structuredClone(sourcePreset.content) };
  await applyMutations(preset, preset.mutations);

  await writeGithubWorkflow(WORKFLOW_FILENAME, preset.content);
};
