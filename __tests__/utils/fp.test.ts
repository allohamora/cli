import { compose } from 'src/utils/fp';

describe('compose', () => {
  test('should compose funcs to one', () => {
    const value = 'hello';

    const add123 = (value: string) => `${value}123`;
    const add321 = (value: string) => `${value}321`;

    const actual = compose(add123, add321);
    const expected = (value: string) => add321(add123(value));

    expect(actual(value)).toBe(expected(value));
  });
});
