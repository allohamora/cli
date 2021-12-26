type TypeState<T extends string> = [() => T, (value: T) => void];

const createTypeState = <T extends string>(types: readonly T[]): TypeState<T> => {
  let type = types[0];

  const setType = (value: T) => {
    type = value;
  };
  const getType = () => type;

  return [getType, setType] as TypeState<T>;
};

export type Values<V, K extends string = string> = {
  default: V;
} & {
  [key in K]?: V;
};

export const createConfigState = <V, K extends string>(configState: TypeState<K>, values: Values<V, K>) => {
  const getConfig = () => {
    const [getKey] = configState;
    const value = values[getKey()] ?? values.default;

    return value;
  };

  return [getConfig];
};

export const createCategoryState = <N extends string, CT extends string>(name: N, configTypes: readonly CT[]) => {
  const configState = createTypeState(configTypes);
  const useConfigState = <V>(values: Values<V, CT>) => createConfigState(configState, values);

  return {
    name,
    configTypes,
    configState,
    useConfigState,
  };
};
