import { getInstalling } from 'src/states/context';
import { isExistsInRoot } from './fs';

type AdditionalHandler = () => Promise<boolean>;

export const isInstalling = (scriptName: string) => {
  const installing = getInstalling();

  return installing.includes(scriptName);
};

export const isInstalled = (scriptName: string, aditionalHandlers: AdditionalHandler[] = []) => {
  const handlers = [async () => isInstalling(scriptName), ...aditionalHandlers];

  const handler = async () => {
    for (const handler of handlers) {
      if (await handler()) {
        return true;
      }
    }

    return false;
  };

  return handler;
};

export const isInstalledAndInRootCheck = (
  scriptName: string,
  relativePath: string,
  additionalHandlers: AdditionalHandler[] = [],
) => {
  const handler = async () => isExistsInRoot(relativePath);

  return isInstalled(scriptName, [handler, ...additionalHandlers]);
};
