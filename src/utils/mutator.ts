export type Mutator<C> = (config: C) => Promise<void> | void;

export const applyMutators = async <C>(config: C, mutators: Mutator<C>[]) => {
  return await Promise.all(mutators.map(async (mutator) => await Promise.resolve(mutator(config))));
};
