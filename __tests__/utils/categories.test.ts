import { jsCategoryState } from 'src/utils/categories';

describe('jsCategoryState', () => {
  test('should be initialized', () => {
    expect(jsCategoryState).toBeDefined();
    expect(jsCategoryState.name).toBe('js');
    expect(jsCategoryState.configTypes).toEqual(['default', 'node:ts']);
  });
});
