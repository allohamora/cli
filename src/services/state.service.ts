export type TypeState<T extends string> = readonly [() => T, (value: T) => void];
export type ConfigState<V> = readonly [() => V];

export type Values<V, K extends string = string> = {
  default: V;
} & {
  [key in K]?: V;
};

export type CategoryState<CT extends string = any, N extends string = string> = {
  name: N;
  configTypes: readonly ('default' | CT)[];
  configState: TypeState<'default' | CT>;
  useConfigState: <V>(values: Values<V, CT>) => ConfigState<V>;
};

type Handler = () => Promise<void>;

export type Category<CT extends string = any> = {
  options: Record<string, Handler>;
  state: CategoryState<CT>;
};

export const createTypeState = <T extends string>(types: readonly T[]): TypeState<T> => {
  let type = types[0]!;

  const setType = (value: T) => {
    type = value;
  };
  const getType = () => type;

  return [getType, setType] as const;
};

export const createConfigState = <V, K extends string>(
  configState: TypeState<'default' | K>,
  values: Values<V, K>,
): ConfigState<V> => {
  const getConfig = () => {
    const [getKey] = configState;
    const value = values[getKey() as K] ?? values.default;

    return value;
  };

  return [getConfig] as const;
};

export const createCategoryState = <N extends string, CT extends string>(
  name: N,
  restConfigTypes: readonly CT[],
): CategoryState<CT, N> => {
  const configTypes = ['default', ...restConfigTypes] as const;
  const configState = createTypeState<(typeof configTypes)[number]>(configTypes);
  const useConfigState = <V>(values: Values<V, CT>) => createConfigState(configState, values);

  return {
    name,
    configTypes,
    configState,
    useConfigState,
  };
};

export const jsCategoryState = createCategoryState('js', ['node:ts', 'react:ts']);
