import { getConfig } from 'src/categories/js/lint-staged/lint-staged.config';
import { expectJsConfig } from '__tests__/test-utils/js-config';

expectJsConfig(getConfig);
