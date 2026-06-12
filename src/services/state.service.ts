export type PresetState<T extends string> = {
  getPreset: () => T;
  setPreset: (value: T) => void;
};

export type Config<V> = {
  getConfig: () => V;
};

type Values<V, K extends string = string> = {
  default: V;
} & {
  [key in K]?: V;
};

export type CategoryState<CT extends string = string, N extends string = string> = {
  name: N;
  presets: readonly ('default' | CT)[];
  presetState: PresetState<'default' | CT>;
  useConfig: <V>(values: Values<V, CT>) => Config<V>;
};

type Handler = () => Promise<void>;

export type Category<CT extends string = string> = {
  options: Record<string, Handler>;
  state: CategoryState<CT>;
};

export const createPresetState = <T extends string>(presets: readonly T[]): PresetState<T> => {
  let preset = presets[0]!;

  const setPreset = (value: T) => {
    preset = value;
  };
  const getPreset = () => preset;

  return {
    getPreset,
    setPreset,
  };
};

const createConfig = <V, K extends string>(
  presetState: PresetState<'default' | K>,
  values: Values<V, K>,
): Config<V> => {
  const getConfig = () => {
    const value = values[presetState.getPreset() as K] ?? values.default;

    return value;
  };

  return {
    getConfig,
  };
};

export const createCategory = <N extends string, CT extends string>(
  name: N,
  restPresets: readonly CT[],
): CategoryState<CT, N> => {
  const presets = ['default', ...restPresets] as const;
  const presetState = createPresetState<(typeof presets)[number]>(presets);
  const useConfig = <V>(values: Values<V, CT>) => createConfig(presetState, values);

  return {
    name,
    presets,
    presetState,
    useConfig,
  };
};

export const jsCategory = createCategory('js', ['node:ts', 'react:ts']);
