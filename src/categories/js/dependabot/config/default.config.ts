import { readableMultilineString } from 'src/utils/string';

export const content = readableMultilineString`
  version: 2
  updates:
    - package-ecosystem: "github-actions"
      directory: "/"
      schedule:
        interval: daily
      open-pull-requests-limit: 0

    - package-ecosystem: npm
      directory: "/"
      schedule:
        interval: daily
      open-pull-requests-limit: 0
`;

export const defaultConfig = {
  content,
};
