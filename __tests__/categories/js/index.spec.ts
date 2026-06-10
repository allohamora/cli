import js from '#src/categories/js/index.ts';
import { jsCategoryState } from '#src/states/categories.ts';

describe('js', () => {
  test('should export state', () => {
    expect(js.state).toBe(jsCategoryState);
  });

  test('should export scripts', () => {
    expect(js.options).toBeDefined();
    expect(typeof js.options).toBe('object');
  });
});
