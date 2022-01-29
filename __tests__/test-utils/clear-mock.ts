export const clearMock = <T extends Record<string, unknown>>(obj: T) => {
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'function') {
      (value as unknown as jest.Mock).mockClear();
    }
  }
};
