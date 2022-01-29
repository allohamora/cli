import { getConfig } from 'src/categories/js/eslint/eslint.config';
import { expectJsConfig } from '__tests__/test-utils/js-config';

expectJsConfig(getConfig);
