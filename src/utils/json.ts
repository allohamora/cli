export const stringify = <O extends unknown>(object: O) => {
  return JSON.stringify(object, null, 2);
}