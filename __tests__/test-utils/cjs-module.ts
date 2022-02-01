import vm from 'vm';

interface Context {
  module: {
    exports?: Record<string, unknown>;
  };
  [key: string]: unknown;
}

export const parse = (script: string) => {
  const context: Context = { module: { exports: {} } };

  vm.createContext(context);
  vm.runInContext(script, context);

  return context;
};
