export type Context = {
  installing: string[];
};

export const context: Context = { installing: [] };

export const setInstalling = (scripts: string[]) => (context.installing = scripts);
export const getInstalling = () => context.installing;
