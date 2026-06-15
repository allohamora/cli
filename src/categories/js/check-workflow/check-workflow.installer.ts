import { CHECK_WORKFLOW_FILENAME } from '#src/categories/js/check-workflow/check-workflow.const.ts';
import {
  CheckScriptName,
  type CheckScriptNameValue,
  getAvailableCheckScripts,
} from '#src/categories/js/check-workflow/check-workflow.service.ts';
import { getCheckWorkflowPreset } from '#src/categories/js/check-workflow/preset/index.ts';
import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { applyMutations } from '#src/utils/mutation.utils.ts';

const checkStepNames = {
  [CheckScriptName.Lint]: 'Run lint',
  [CheckScriptName.Format]: 'Run format',
  [CheckScriptName.Typecheck]: 'Run typecheck',
  [CheckScriptName.Build]: 'Run build',
} satisfies Record<CheckScriptNameValue, string>;

const createCheckSteps = (scripts: CheckScriptNameValue[]) => {
  return scripts.map((script) => ({
    name: checkStepNames[script],
    run: `npm run ${script}`,
  }));
};

export const checkWorkflow = async () => {
  const sourcePreset = getCheckWorkflowPreset();
  const preset = { ...sourcePreset, content: structuredClone(sourcePreset.content) };
  await applyMutations(preset, preset.mutations);

  const { content } = preset;
  const scripts = await getAvailableCheckScripts();
  const workflow = {
    ...content,
    jobs: {
      ...content.jobs,
      check: {
        ...content.jobs.check,
        steps: [...content.jobs.check.steps, ...createCheckSteps(scripts)],
      },
    },
  };

  await writeGithubWorkflow(CHECK_WORKFLOW_FILENAME, workflow);
};
