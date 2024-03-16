import { readableMultilineString } from 'src/utils/string';
import { FILE_NAME, IGNORE_NAME } from '../docker.const';

type GetDockerFileArgs = {
  version: string;
};

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

  ${IGNORE_NAME}
  ${FILE_NAME}
  .docker-compose.yml
`;

export const defaultConfig = {
  getDockerFile,
  dockerIgnore,
};
