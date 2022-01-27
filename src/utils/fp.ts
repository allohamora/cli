type ComposeFunction<V> = (value: V) => V;

export const compose = <V>(...funcs: ComposeFunction<V>[]) => {
  const fun = (value: V) => funcs.reduce((state, fun) => fun(state), value);

  return fun;
};

type PromiseChainFunc<V> = (value: V) => Promise<unknown>;

export const promiseChain = <V>(...funcs: PromiseChainFunc<V>[]) => {
  return async (value: V) => {
    await funcs.reduce(
      (chain, next) =>
        chain.then(async () => {
          await next(value);
        }),
      Promise.resolve(),
    );
  };
};
