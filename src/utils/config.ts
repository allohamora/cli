type State<T extends string> = [T, (value: T) => void];

const createState = <T extends string>(types: readonly T[]): State<T> => {
  let config = types[0];
  
  const setConfig = (value: T) => {
    config = value;
  };

  return [config, setConfig] as State<T>;
};

export type LocalConfig<V extends unknown, K extends string = string> = {
  default: V
} & {
  [key in K]?: V
};

export const createLocalConfigManager = <V extends unknown, K extends string>(state: State<K>, config: LocalConfig<V, K>) => {
  const getConfig = () => {
    const [key] = state;
    const value = config[key as K] ?? config.default;

    return value;
  }

  return [getConfig];
}

export const jsStateValues = ['default', 'node:ts'] as const;
export type JsStateValue = typeof jsStateValues[number];
export const jsState = createState(jsStateValues);