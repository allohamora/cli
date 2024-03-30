import * as fs from 'src/utils/fs';
import * as npm from 'src/utils/npm';
import * as config from 'src/categories/js/commitlint/commitlint.config';
import * as utils from 'src/categories/js/commitlint/commitlint.utils';
import { commitlint } from 'src/categories/js/commitlint/commitlint.entrypoint';

jest.mock('src/utils/fs');
const fsMocked = jest.mocked(fs);

jest.mock('src/utils/npm');
const npmMocked = jest.mocked(npm);

jest.mock('src/categories/js/commitlint/commitlint.config');
const configMocked = jest.mocked(config);

jest.mock('src/categories/js/commitlint/commitlint.utils');
const utilsMocked = jest.mocked(utils);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('commitlint', () => {
  const testConfig = { config: { extends: ['__test__'] }, rules: '__test__' };

  beforeEach(() => {
    configMocked.getConfig.mockReturnValueOnce(testConfig);
  });

  test('should get config from getConfig', async () => {
    await commitlint();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should installs commitlint and rules', async () => {
    await commitlint();

    expect(npmMocked.installDevelopmentDependencies).toHaveBeenCalledWith('@commitlint/cli', testConfig.rules);
  });

  test('should add json config to root', async () => {
    await commitlint();

    expect(fsMocked.addJsonFileToRoot).toHaveBeenCalledWith('.commitlintrc.json', testConfig.config);
  });

  test('should run husky integration', async () => {
    await commitlint();

    expect(utilsMocked.huskyIntegration).toHaveBeenCalled();
  });
});
