export type PresetState<T extends string> = {
  getPreset: () => T;
  setPreset: (value: T) => void;
};

export type Preset<V> = [() => V];

type Values<V, K extends string = string> = {
  default: V;
} & {
  [key in K]?: V;
};

export type CategoryState<CT extends string = string, N extends string = string> = {
  name: N;
  presets: readonly ('default' | CT)[];
  presetState: PresetState<'default' | CT>;
  usePreset: <V>(values: Values<V, CT>) => Preset<V>;
};

type Handler = () => Promise<void>;

export type Category<CT extends string = string> = {
  options: Record<string, Handler>;
  state: CategoryState<CT>;
};

export const createPresetState = <T extends string>(presets: readonly T[]): PresetState<T> => {
  if (!presets[0]) {
    throw new Error('createPresetState requires at least one preset');
  }

  let preset = presets[0];

  const setPreset = (value: T) => {
    preset = value;
  };
  const getPreset = () => preset;

  return {
    getPreset,
    setPreset,
  };
};

const createPreset = <V, K extends string>(
  presetState: PresetState<'default' | K>,
  values: Values<V, K>,
): Preset<V> => {
  const getPreset = () => {
    const value = values[presetState.getPreset() as K] ?? values.default;

    return value;
  };

  return [getPreset];
};

export const createCategory = <N extends string, CT extends string>(
  name: N,
  restPresets: readonly CT[],
): CategoryState<CT, N> => {
  const presets = ['default', ...restPresets] as const;
  const presetState = createPresetState<(typeof presets)[number]>(presets);
  const usePreset = <V>(values: Values<V, CT>) => createPreset(presetState, values);

  return {
    name,
    presets,
    presetState,
    usePreset,
  };
};

export const jsCategory = createCategory('js', ['node:ts', 'react:ts']);
