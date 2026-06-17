import path from 'node:path';
import {
  PUBLISH_WORKFLOW_OPTION_NAME,
  WORKFLOW_FILENAME,
} from '#src/categories/js/publish-workflow/publish-workflow.const.ts';
import { createRootInstalledCheck } from '#src/services/installation.service.ts';
import { GITHUB_WORKFLOWS_PATH } from '#src/services/github.service.ts';
import type { WorkflowPreset } from '#src/categories/js/nvmrc/nvmrc.service.ts';

export const isPublishWorkflowInstalled = createRootInstalledCheck(
  PUBLISH_WORKFLOW_OPTION_NAME,
  path.join(GITHUB_WORKFLOWS_PATH, WORKFLOW_FILENAME),
);

const triggerPublishStep = {
  name: 'Trigger publish',
  env: {
    GH_TOKEN: '${{ github.token }}',
  },
  run: 'gh workflow run publish.yml --ref v${{ steps.version.outputs.version }}',
};

export const publishWorkflowReleaseMutation = async (preset: WorkflowPreset) => {
  if (!(await isPublishWorkflowInstalled())) {
    return;
  }

  for (const job of Object.values(preset.content.jobs)) {
    job.steps?.push(triggerPublishStep);
  }
};
