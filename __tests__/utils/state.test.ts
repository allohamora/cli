import { createTypeState } from 'src/utils/state';

describe('createTypeState', () => {
  const types = ['1', '2'];
  let [getType, setType] = createTypeState(types);

  beforeEach(() => {
    [getType, setType] = createTypeState(types);
  });

  test('should return type', () => {
    expect(getType()).toBeDefined();
  });

  test('should init state with first type', () => {
    expect(getType()).toBe(types[0]);
  });

  test('should set type', () => {
    const newType = types[1];

    setType(newType);

    expect(getType()).toBe(newType);
  });
});
