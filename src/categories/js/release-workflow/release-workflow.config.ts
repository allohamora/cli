import { jsCategoryState } from 'src/states/categories';
import { defaultConfig } from './config/default.config';

export const WORKFLOW_FILENAME = 'release.yml';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});
