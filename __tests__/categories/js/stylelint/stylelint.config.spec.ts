import { expectJsConfig } from '#__tests__/test-utils/js-config.ts';
import { getConfig } from '#src/categories/js/stylelint/stylelint.config.ts';

describe('stylelint.config', () => {
  expectJsConfig(getConfig);
});
