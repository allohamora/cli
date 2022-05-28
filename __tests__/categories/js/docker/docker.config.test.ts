import { getConfig } from 'src/categories/js/docker/docker.config';
import { expectJsConfig } from '__tests__/test-utils/js-config';

interface ExpectDockerConfigArgs {
  getDockerFile: ({ version }: { version: string }) => string;
  dockerIgnore: string;
}

const expectDockerConfig = ({ getDockerFile, dockerIgnore }: ExpectDockerConfigArgs) => {
  const version = '16.14.2';
  const dockerFile = getDockerFile({ version });

  expect(dockerFile.startsWith(`FROM node:${version}`)).toBe(true);
  expect(typeof dockerIgnore === 'string').toBe(true);
};

expectJsConfig(getConfig, [expectDockerConfig]);
