import * as nodeUtils from 'src/utils/node';
import * as fsUtils from 'src/utils/fs';
import * as config from 'src/categories/js/docker/docker.config';
import { docker } from 'src/categories/js/docker/docker.entrypoint';

jest.mock('src/utils/node');
const nodeUtilsMocked = jest.mocked(nodeUtils);

jest.mock('src/utils/fs');
const fsUtilsMocked = jest.mocked(fsUtils);

jest.mock('src/categories/js/docker/docker.config');
const configMocked = jest.mocked(config);

describe('docker', () => {
  const dockerFile = '__dockerfile__';
  const dockerIgnore = '__dockerignore__';

  beforeEach(() => {
    nodeUtilsMocked.getNodeVersion.mockResolvedValueOnce('16.14.2');
    fsUtilsMocked.addFileToRoot.mockImplementationOnce(() => Promise.resolve());
    configMocked.getConfig.mockReturnValueOnce({ getDockerFile: () => dockerFile, dockerIgnore });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should use value from getConfig', async () => {
    await docker();

    expect(configMocked.getConfig).toHaveBeenCalled();
  });

  test('should create Dockerfile', async () => {
    await docker();

    expect(fsUtilsMocked.addFileToRoot).toHaveBeenCalledWith('Dockerfile', dockerFile);
  });

  test('should create .dockerignore', async () => {
    await docker();

    expect(fsUtilsMocked.addFileToRoot).toHaveBeenCalledWith('.dockerignore', dockerIgnore);
  });
});
