type State<T extends string> = [() => T, (value: T) => void];

const createState = <T extends string>(types: readonly T[]): State<T> => {
  let config = types[0];

  const setConfig = (value: T) => {
    config = value;
  };

  const getConfig = () => config;

  return [getConfig, setConfig] as State<T>;
};

export type LocalConfig<V, K extends string = string> = {
  default: V;
} & {
  [key in K]?: V;
};

export const createLocalConfigManager = <V, K extends string>(state: State<K>, config: LocalConfig<V, K>) => {
  const getConfig = () => {
    const [getKey] = state;
    const value = config[getKey()] ?? config.default;

    return value;
  };

  return [getConfig];
};

export const jsStateValues = ['default', 'node:ts'] as const;
export type JsStateValue = typeof jsStateValues[number];
export const jsState = createState(jsStateValues);
