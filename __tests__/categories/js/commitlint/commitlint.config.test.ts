import { getConfig } from 'src/categories/js/commitlint/commitlint.config';
import { expectJsConfig } from '__tests__/test-utils/js-config';

expectJsConfig(getConfig);
