import { getConfig } from '#src/categories/js/commitlint/commitlint.config.ts';
import { expectJsConfig } from '#__tests__/test-utils/js-config.ts';

describe('commitlint.config', () => {
  expectJsConfig(getConfig);
});
