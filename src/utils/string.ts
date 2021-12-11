export const kebablize = (camel: string) => {
  return camel
    .split('')
    .map(word => word.toUpperCase() === word ? `-${word.toLowerCase()}` : word)
    .join('');
};

export const camelize = (kebab: string) => {
  const [first, ...rest] = kebab.split('-');
  const capilazedRest = rest
    .map(word => {
      const [first, ...rest] = word;

      return [first.toUpperCase(), ...rest].join('');
    })
    .join('');

  return `${first}${capilazedRest}`;
};