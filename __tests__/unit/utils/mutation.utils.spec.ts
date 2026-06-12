import { scheduler } from 'node:timers/promises';
import { applyMutations } from '#src/utils/mutation.utils.ts';
import { describe, expect, it } from 'vitest';

describe('mutation.utils', () => {
  describe('applyMutations', () => {
    it('applies mutations', async () => {
      const actual = { a: 1, b: 2 };
      const mutationA = (config: typeof actual) => {
        config.a = 2;
      };
      const mutationB = (config: typeof actual) => {
        config.b = 1;
      };

      await applyMutations(actual, [mutationA, mutationB]);

      const expected = { a: 2, b: 1 };

      expect(actual).toEqual(expected);
    });

    it('works with async mutations', async () => {
      const actual: Record<string, boolean> = {};
      const mutationA = async (config: typeof actual) => {
        await scheduler.wait(200);
        config.a = true;
      };
      const mutationB = (config: typeof actual) => {
        config.b = true;
      };

      await applyMutations(actual, [mutationA, mutationB]);

      const expected = { a: true, b: true };

      expect(actual).toEqual(expected);
    });
  });
});
