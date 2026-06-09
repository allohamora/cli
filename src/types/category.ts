import { createCategoryState } from '#src/utils/state.ts';

type Handler = () => Promise<void>;

export type Category = {
  options: Record<string, Handler>;
  state: ReturnType<typeof createCategoryState>;
};
