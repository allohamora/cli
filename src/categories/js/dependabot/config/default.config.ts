import { readableMultilineString } from 'src/utils/string';

export const content = readableMultilineString`
  version: 2
  updates:
    - package-ecosystem: npm
      directory: "/"
      schedule:
        interval: daily
      open-pull-requests-limit: 10
`;

export const defaultConfig = {
  content,
};
