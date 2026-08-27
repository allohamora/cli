import { getProjectName, getWorkspacePackages } from '#src/services/npm.service.ts';
import { writeDevcontainerFeature, writeDevcontainerJson } from '#src/services/devcontainer.service.ts';
import { hasDockerComposeYml } from '#src/services/docker.service.ts';
import { getPersonalDevcontainerPreset } from '#src/categories/js/personal-devcontainer/preset/index.ts';

export const personalDevcontainer = async () => {
  const { getDevcontainerJson, getFeatures } = getPersonalDevcontainerPreset();
  const name = await getProjectName();
  const workspacePackages = await getWorkspacePackages();
  const hasDockerCompose = await hasDockerComposeYml();

  await writeDevcontainerJson(getDevcontainerJson({ name, hasDockerCompose }));

  for (const feature of getFeatures({ name, workspacePackages, hasDockerCompose })) {
    await writeDevcontainerFeature(feature.name, feature);
  }
};
