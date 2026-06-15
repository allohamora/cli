import { NVMRC_FILE_NAME } from '#src/categories/js/nvmrc/nvmrc.const.ts';
import { createRootInstalledCheck } from '#src/services/installation.service.ts';

type WorkflowStep = Record<string, unknown> & {
  uses?: string;
  with?: Record<string, unknown>;
};

type WorkflowJob = Record<string, unknown> & {
  steps?: WorkflowStep[];
};

export type WorkflowPreset = {
  content: Record<string, unknown> & {
    jobs: Record<string, WorkflowJob>;
  };
  mutations: ((preset: WorkflowPreset) => Promise<void> | void)[];
};

export const isNvmrcInstalled = createRootInstalledCheck('nvmrc', NVMRC_FILE_NAME);

export const nvmrcWorkflowMutation = async (preset: WorkflowPreset) => {
  if (!(await isNvmrcInstalled())) {
    return;
  }

  for (const job of Object.values(preset.content.jobs)) {
    for (const step of job.steps ?? []) {
      if (!step.uses?.startsWith('actions/setup-node@')) {
        continue;
      }

      step.with = {
        ...step.with,
        'node-version-file': NVMRC_FILE_NAME,
      };
    }
  }
};
