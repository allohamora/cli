import {
  multilineStringBuilder,
  camelize,
  kebablize,
  removeTabOnEachLine,
  multilineStringBuilderWithMiddlewares,
  trim,
  readableMultilineString,
} from 'src/utils/string';

describe('kebablize', () => {
  test('should kebablize string', () => {
    const actual = kebablize('helloWorld');
    const expected = 'hello-world';

    expect(actual).toBe(expected);
  });
});

describe('camelize', () => {
  test('should camelize string', () => {
    const actual = camelize('hello-world');
    const expected = 'helloWorld';

    expect(actual).toBe(expected);
  });
});

describe('multilineStringBuilder', () => {
  test('should correctly build template string', () => {
    const actual = multilineStringBuilder`${'hello'} ${'world'}${'!'}`;
    const expected = 'hello world!';

    expect(actual).toBe(expected);
  });
});

describe('multilineStringBuilderWithMiddlewares', () => {
  test('should correctly build template', () => {
    const actual = multilineStringBuilderWithMiddlewares()`${'hello'} ${'world'}${'!'}`;
    const expected = 'hello world!';

    expect(actual).toBe(expected);
  });

  test('should apply format funcs', () => {
    const actual = multilineStringBuilderWithMiddlewares((string) => string.trim())`   hello world!   `;
    const expected = 'hello world!';

    expect(actual).toBe(expected);
  });
});

describe('removeTabOnEachLine', () => {
  test('should remove tab on each line', () => {
    const actual = removeTabOnEachLine('\n\thello\n\tworld!');
    const expected = '\nhello\nworld!';

    expect(actual).toBe(expected);
  });
});

describe('trim', () => {
  test('should trim string', () => {
    const actual = trim('   hello world!   ');
    const expected = 'hello world!';

    expect(actual).toBe(expected);
  });
});

describe('readableMultilineString', () => {
  test('should remove one tab on each line', () => {
    const actual = readableMultilineString`\n\thello\n\tworld!`;
    const expected = `hello\nworld!`;

    expect(actual).toBe(expected);
  });

  test('should trim', () => {
    const actual = readableMultilineString`   hello world!   `;
    const expected = 'hello world!';

    expect(actual).toBe(expected);
  });
});
