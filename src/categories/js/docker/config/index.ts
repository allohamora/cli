import { jsCategory } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/docker/config/default.config.ts';

export const [getDockerConfig] = jsCategory.useConfig({
  default: defaultConfig,
});
