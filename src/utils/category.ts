import { createCategoryState } from './state';

type Handler = () => Promise<void>;

export type Category = {
  options: Record<string, Handler>;
  state: ReturnType<typeof createCategoryState>;
};
