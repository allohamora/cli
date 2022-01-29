export type Mutator<C> = (config: C) => Promise<unknown> | unknown;

export const applyMutators = async <C>(config: C, mutators: Mutator<C>[]) => {
  return await Promise.all(mutators.map(async (mutator) => await Promise.resolve(mutator(config))));
};
