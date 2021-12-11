export const stringify = <O>(object: O) => {
  return JSON.stringify(object, null, 2);
};
