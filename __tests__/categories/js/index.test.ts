import js from 'src/categories/js';
import { jsCategoryState } from 'src/states/categories';

describe('js', () => {
  test('should export state', () => {
    expect(js.state).toBe(jsCategoryState);
  });

  test('should export scripts', () => {
    expect(js.options).toBeDefined();
    expect(typeof js.options).toBe('object');
  });
});
