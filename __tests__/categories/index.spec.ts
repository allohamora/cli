import categories from '#src/categories/index.ts';

describe('categories', () => {
  test('should export js state', () => {
    expect(categories).toBeDefined();
    expect(typeof categories).toBe('object');

    expect(categories.js).toBeDefined();
    expect(typeof categories.js).toBe('object');
  });
});
