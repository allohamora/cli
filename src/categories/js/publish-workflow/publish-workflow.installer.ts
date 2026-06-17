import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getPublishWorkflowPreset } from '#src/categories/js/publish-workflow/preset/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/publish-workflow/publish-workflow.const.ts';
import { applyMutations } from '#src/utils/mutation.utils.ts';

export const publishWorkflow = async () => {
  const preset = getPublishWorkflowPreset();
  await applyMutations(preset, preset.mutations);

  await writeGithubWorkflow(WORKFLOW_FILENAME, preset.content);
};
