// we need to mock prettier in all tests because it doesn't work with jest
// TypeError: A dynamic import callback was invoked without --experimental-vm-modules
// https://github.com/prettier/prettier/issues/15769
jest.mock('prettier', () => jest.fn());
