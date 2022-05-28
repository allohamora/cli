import { jsCategoryState } from 'src/states/categories';

describe('jsCategoryState', () => {
  test('should be initialized', () => {
    expect(jsCategoryState).toBeDefined();
    expect(jsCategoryState.name).toBe('js');
    expect(jsCategoryState.configTypes).toEqual(['default', 'node:ts', 'react:ts']);
  });
});
