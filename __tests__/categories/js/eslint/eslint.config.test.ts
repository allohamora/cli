import { getConfig } from '#src/categories/js/eslint/eslint.config.ts';
import { expectJsConfig } from '#__tests__/test-utils/js-config.ts';

expectJsConfig(getConfig);
