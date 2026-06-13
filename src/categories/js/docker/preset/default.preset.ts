import dedent from 'dedent';
import { FILE_NAME, IGNORE_NAME } from '#src/categories/js/docker/docker.const.ts';

type GetDockerFileArgs = {
  version: string;
};

export const getDockerFile = ({ version }: GetDockerFileArgs) => dedent`
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

export const dockerIgnore = dedent`
  node_modules
  dist
  build

  .husky
  .git

  ${IGNORE_NAME}
  ${FILE_NAME}
  .docker-compose.yml
`;

export const defaultPreset = {
  getDockerFile,
  dockerIgnore,
};
