import { getConfig } from '#src/categories/js/lint-staged/lint-staged.config.ts';
import { expectJsConfig } from '#__tests__/test-utils/js-config.ts';

describe('lint-staged.config', () => {
  expectJsConfig(getConfig);
});
