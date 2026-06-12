import vm from 'node:vm';

type CjsContext = {
  module: {
    exports?: Record<string, unknown>;
  };
  [key: string]: unknown;
};

export const parseCjsModule = (script: string) => {
  const context: CjsContext = { module: { exports: {} } };

  vm.createContext(context);
  vm.runInContext(script, context);

  return context;
};
