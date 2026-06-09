import * as nodeUtils from '#src/utils/node.ts';
import * as fsUtils from '#src/utils/fs.ts';
import * as config from '#src/categories/js/docker/docker.config.ts';
import { docker } from '#src/categories/js/docker/docker.entrypoint.ts';

vi.mock('#src/utils/node.ts');
const nodeUtilsMocked = vi.mocked(nodeUtils);

vi.mock('#src/utils/fs.ts');
const fsUtilsMocked = vi.mocked(fsUtils);

vi.mock('#src/categories/js/docker/docker.config.ts');
const configMocked = vi.mocked(config);

describe('docker', () => {
  const dockerFile = '__dockerfile__';
  const dockerIgnore = '__dockerignore__';

  beforeEach(() => {
    nodeUtilsMocked.getNodeVersion.mockResolvedValueOnce('16.14.2');
    fsUtilsMocked.addFileToRoot.mockImplementationOnce(() => Promise.resolve());
    configMocked.getConfig.mockReturnValueOnce({ getDockerFile: () => dockerFile, dockerIgnore });
  });

  afterEach(() => {
    vi.clearAllMocks();
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
