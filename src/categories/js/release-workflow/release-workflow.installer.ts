import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { writeRootFile } from '#src/services/root.service.ts';
import { installDevDependencies, getRepositoryUrl } from '#src/services/npm.service.ts';
import { getReleaseWorkflowPreset } from '#src/categories/js/release-workflow/preset/index.ts';
import {
  WORKFLOW_FILENAME,
  GIT_CLIFF_PACKAGE_NAME,
  GIT_CLIFF_CONFIG_FILE_NAME,
} from '#src/categories/js/release-workflow/release-workflow.const.ts';

export const releaseWorkflow = async () => {
  const { createCliffConfig, content } = getReleaseWorkflowPreset();

  await installDevDependencies(GIT_CLIFF_PACKAGE_NAME);

  const repoUrl = await getRepositoryUrl();

  await writeRootFile(GIT_CLIFF_CONFIG_FILE_NAME, createCliffConfig(repoUrl));
  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
