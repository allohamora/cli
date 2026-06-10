import { getConfig } from '#src/categories/js/prettier/prettier.config.ts';
import { expectJsConfig } from '#__tests__/test-utils/js-config.ts';

expectJsConfig(getConfig);
