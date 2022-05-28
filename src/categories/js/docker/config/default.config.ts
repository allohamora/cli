import { readableMultilineString } from 'src/utils/string';
import { DOCKER_FILE_NAME, DOCKER_IGNORE_NAME } from '../docker.const';

interface GetDockerFileArgs {
  version: string;
}

export const getDockerFile = ({ version }: GetDockerFileArgs) => readableMultilineString`
  FROM node:${version}
  WORKDIR /app

  COPY package*.json ./
  RUN npm ci

  COPY . .
  ENV NODE_ENV production
  RUN npm run build

  EXPOSE 3000

  CMD npm run start
`;

export const dockerIgnore = readableMultilineString`
  node_modules
  dist
  build

  .husky
  .git

  ${DOCKER_IGNORE_NAME}
  ${DOCKER_FILE_NAME}
  .docker-compose.yml
`;

export const defaultConfig = {
  getDockerFile,
  dockerIgnore,
};
