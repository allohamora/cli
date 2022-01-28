import { jsCategoryState } from 'src/states/categories';
import { defaultConfig } from './config/default.config';

export const PACKAGE_NAME = 'standard-version';
export const CONFIG_FILE_NAME = '.versionrc.json';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});
