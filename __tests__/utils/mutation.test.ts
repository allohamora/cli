import { applyMutations } from 'src/utils/mutation';
import { delay } from '__tests__/test-utils/delay';

describe('applyMutations', () => {
  test('should apply mutations', async () => {
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

  test('should work with async mutations', async () => {
    const actual: Record<string, boolean> = {};
    const mutationA = async (config: typeof actual) => {
      await delay(200);
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
