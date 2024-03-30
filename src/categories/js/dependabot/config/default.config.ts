import { readableMultilineString } from 'src/utils/string';

export const content = readableMultilineString`
  version: 2
  updates:
    - package-ecosystem: "github-actions"
      directory: "/"
      schedule:
        interval: "weekly"
        day: "monday"
      open-pull-requests-limit: 10

    - package-ecosystem: npm
      directory: "/"
      schedule:
        interval: "weekly"
        day: "monday"
      open-pull-requests-limit: 0
`;

export const defaultConfig = {
  content,
};
