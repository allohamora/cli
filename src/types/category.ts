import { createCategoryState } from '../utils/state';
import { Context } from './context';

type Handler = (ctx: Context) => Promise<void>;

export type Category = {
  options: Record<string, Handler>;
  state: ReturnType<typeof createCategoryState>;
};
