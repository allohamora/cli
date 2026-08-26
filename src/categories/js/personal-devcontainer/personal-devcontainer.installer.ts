import { getProjectName, getWorkspacePackages } from '#src/services/npm.service.ts';
import { writeDevcontainerFeature, writeDevcontainerJson } from '#src/services/devcontainer.service.ts';
import { getPersonalDevcontainerPreset } from '#src/categories/js/personal-devcontainer/preset/index.ts';

export const personalDevcontainer = async () => {
  const { getDevcontainerJson, getFeatures } = getPersonalDevcontainerPreset();
  const name = await getProjectName();
  const workspacePackages = await getWorkspacePackages();

  await writeDevcontainerJson(getDevcontainerJson({ name }));

  for (const feature of getFeatures({ name, workspacePackages })) {
    await writeDevcontainerFeature(feature.name, feature);
  }
};
