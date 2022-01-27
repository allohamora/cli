import { jsCategoryState } from 'src/utils/categories';
import { defaultConfig } from './config/default.config';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});
