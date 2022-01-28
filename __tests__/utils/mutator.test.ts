import { applyMutators } from 'src/utils/mutator';
import { delay } from '__tests__/test-utils/delay';

describe('applyMutators', () => {
  test('should apply mutators', async () => {
    const actual = { a: 1, b: 2 };
    const mutatorA = (config: typeof actual) => {
      config.a = 2;
    };
    const mutatorB = (config: typeof actual) => {
      config.b = 1;
    };

    await applyMutators(actual, [mutatorA, mutatorB]);

    const expected = { a: 2, b: 1 };

    expect(actual).toEqual(expected);
  });

  test('should work with async mutators', async () => {
    const actual: Record<string, boolean> = {};
    const mutatorA = async (config: typeof actual) => {
      await delay(200);
      config.a = true;
    };
    const mutatorB = (config: typeof actual) => {
      config.b = true;
    };

    await applyMutators(actual, [mutatorA, mutatorB]);

    const expected = { a: true, b: true };

    expect(actual).toEqual(expected);
  });
});
