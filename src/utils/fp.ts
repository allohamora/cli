type ComposeFunction<V> = (value: V) => V;

export const compose = <V>(...funcs: ComposeFunction<V>[]) => {
  const fun = (value: V) => funcs.reduce((state, fun) => fun(state), value);

  return fun;
};
