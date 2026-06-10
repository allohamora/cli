import { jsCategoryState } from '#src/states/categories.ts';

describe('categories', () => {
  describe('jsCategoryState', () => {
    it('is initialized', () => {
      expect(jsCategoryState).toBeDefined();
      expect(jsCategoryState.name).toBe('js');
      expect(jsCategoryState.configTypes).toEqual(['default', 'node:ts', 'react:ts']);
    });
  });
});
