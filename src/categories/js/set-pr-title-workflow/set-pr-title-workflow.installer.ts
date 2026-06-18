import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getSetPrTitleWorkflowPreset } from '#src/categories/js/set-pr-title-workflow/preset/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/set-pr-title-workflow/set-pr-title-workflow.const.ts';
import { applyMutations } from '#src/utils/mutation.utils.ts';

export const setPrTitleWorkflow = async () => {
  const preset = getSetPrTitleWorkflowPreset();
  await applyMutations(preset, preset.mutations);

  await writeGithubWorkflow(WORKFLOW_FILENAME, preset.content);
};
