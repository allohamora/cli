export const mockObject = <T extends Record<string, unknown>>(target: T = {} as T) => {
  const cache: Record<string | symbol, typeof jest.fn> = {};

  const get = (target: T, name: string) => {
    if (name in target) {
      return target[name];
    }

    if (name in cache) {
      return cache[name];
    }

    return (cache[name] = jest.fn());
  };

  return new Proxy(target, {
    get,
  });
};
