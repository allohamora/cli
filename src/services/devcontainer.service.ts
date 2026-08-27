import path from 'node:path';
import { ensureRootDir, writeRootFile, writeRootJsonFile } from '#src/services/root.service.ts';

export const DEVCONTAINER_DIR_NAME = '.devcontainer';
export const DEVCONTAINER_FEATURES_DIR_NAME = 'features';
export const DEVCONTAINER_FEATURES_PATH = path.join(DEVCONTAINER_DIR_NAME, DEVCONTAINER_FEATURES_DIR_NAME);

export const DEVCONTAINER_JSON_NAME = 'devcontainer.json';
export const DEVCONTAINER_FEATURE_JSON_NAME = 'devcontainer-feature.json';
export const DEVCONTAINER_INSTALL_SCRIPT_NAME = 'install.sh';

export const writeDevcontainerJson = async (content: object) => {
  await ensureRootDir(DEVCONTAINER_DIR_NAME);
  await writeRootJsonFile(path.join(DEVCONTAINER_DIR_NAME, DEVCONTAINER_JSON_NAME), content);
};

type DevcontainerFeature = {
  featureJson: object;
  installScript: string;
};

export const writeDevcontainerFeature = async (name: string, { featureJson, installScript }: DevcontainerFeature) => {
  await ensureRootDir(DEVCONTAINER_DIR_NAME);
  await ensureRootDir(DEVCONTAINER_FEATURES_PATH);

  const featurePath = path.join(DEVCONTAINER_FEATURES_PATH, name);
  await ensureRootDir(featurePath);

  await writeRootJsonFile(path.join(featurePath, DEVCONTAINER_FEATURE_JSON_NAME), featureJson);
  await writeRootFile(path.join(featurePath, DEVCONTAINER_INSTALL_SCRIPT_NAME), installScript);
};
