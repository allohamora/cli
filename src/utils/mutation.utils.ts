export type Mutation<C> = (config: C) => Promise<unknown> | unknown;

export const applyMutations = async <C>(config: C, mutations: Mutation<C>[]) => {
  return await Promise.all(mutations.map(async (mutation) => await Promise.resolve(mutation(config))));
};
