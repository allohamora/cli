import { jsCategoryState } from 'src/states/categories';
import { defaultConfig } from './config/default.config';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});
