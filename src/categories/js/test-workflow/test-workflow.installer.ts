import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getTestWorkflowPreset } from '#src/categories/js/test-workflow/preset/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/test-workflow/test-workflow.const.ts';
import { applyMutations } from '#src/utils/mutation.utils.ts';

export const testWorkflow = async () => {
  const sourcePreset = getTestWorkflowPreset();
  const preset = { ...sourcePreset, content: structuredClone(sourcePreset.content) };
  await applyMutations(preset, preset.mutations);

  await writeGithubWorkflow(WORKFLOW_FILENAME, preset.content);
};
