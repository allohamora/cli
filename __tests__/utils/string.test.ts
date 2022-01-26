import { buildTemplate, camelize, kebablize, removeTabOnEachLine, templateWithFormat, trim } from 'src/utils/string';

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

describe('buildTemplate', () => {
  test('should correctly build template string', () => {
    const actual = buildTemplate`${'hello'} ${'world'}${'!'}`;
    const expected = 'hello world!';

    expect(actual).toBe(expected);
  });
});

describe('templateWithFormat', () => {
  test('should correctly build template', () => {
    const actual = templateWithFormat()`${'hello'} ${'world'}${'!'}`;
    const expected = 'hello world!';

    expect(actual).toBe(expected);
  });

  test('should apply format funcs', () => {
    const actual = templateWithFormat((string) => string.trim())`   hello world!   `;
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
