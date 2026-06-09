import { execa } from 'execa';

export const getNodeVersion = async () => {
  const { stdout } = await execa`node -v`;

  return stdout.trim().replace('v', '');
};
