import { WORKFLOW_FILENAME } from '#src/categories/js/check-workflow/check-workflow.const.ts';
import {
  CheckScriptName,
  type CheckScriptNameValue,
  getAvailableCheckScripts,
} from '#src/categories/js/check-workflow/check-workflow.service.ts';
import { getCheckWorkflowPreset } from '#src/categories/js/check-workflow/preset/index.ts';
import { writeGithubWorkflow } from '#src/services/github.service.ts';

const checkStepNames = {
  [CheckScriptName.Lint]: 'Run lint',
  [CheckScriptName.Format]: 'Run format',
  [CheckScriptName.Typecheck]: 'Run typecheck',
  [CheckScriptName.Build]: 'Run build',
} satisfies Record<CheckScriptNameValue, string>;

const createCheckSteps = (scripts: CheckScriptNameValue[]) => {
  return scripts.flatMap((script) => ['', `      - name: ${checkStepNames[script]}`, `        run: npm run ${script}`]);
};

export const checkWorkflow = async () => {
  const { content } = getCheckWorkflowPreset();
  const scripts = await getAvailableCheckScripts();
  const workflow = [...content, ...createCheckSteps(scripts)].join('\n');

  await writeGithubWorkflow(WORKFLOW_FILENAME, workflow);
};
