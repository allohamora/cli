import { getConfig } from 'src/categories/js/prettier/prettier.config';
import { expectJsConfig } from '__tests__/test-utils/js-config';

expectJsConfig(getConfig);
