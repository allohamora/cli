import { jsCategoryState } from 'src/states/categories';
import { defaultConfig } from './config/default.config';
import { reactTsConfig } from './config/react:ts.config';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
  'react:ts': reactTsConfig,
});
