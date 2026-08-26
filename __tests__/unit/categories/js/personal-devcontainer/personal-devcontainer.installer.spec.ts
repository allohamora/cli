import path from 'node:path';
import { fileSystem } from '#__tests__/setup-test-context.ts';
import { personalDevcontainer } from '#src/categories/js/personal-devcontainer/personal-devcontainer.installer.ts';
import { getDevcontainerJson, getFeatures } from '#src/categories/js/personal-devcontainer/preset/default.preset.ts';
import { describe, expect, it } from 'vitest';

describe('personal-devcontainer.installer', () => {
  describe('personalDevcontainer', () => {
    it('writes devcontainer.json and all feature files under .devcontainer', async () => {
      const name = 'my-app';

      fileSystem.seed({
        packageJson: { name: '@allohamora/my-app', homepage: 'https://github.com/allohamora/my-app' },
      });

      await personalDevcontainer();

      expect(fileSystem.readJson(path.join('.devcontainer', 'devcontainer.json'))).toEqual(
        getDevcontainerJson({ name }),
      );

      for (const feature of getFeatures({ name })) {
        const featurePath = path.join('.devcontainer', 'features', feature.name);

        expect(fileSystem.readJson(path.join(featurePath, 'devcontainer-feature.json'))).toEqual(feature.featureJson);
        expect(fileSystem.readFile(path.join(featurePath, 'install.sh'))).toBe(`${feature.installScript}\n`);
      }
    });

    it('mounts a node_modules volume per workspace package for a monorepo', async () => {
      const name = 'ridge-bridge';
      const workspacePackages = [
        { name: 'api', dirPath: 'apps/api' },
        { name: 'client', dirPath: 'apps/client' },
      ];

      fileSystem.seed({
        packageJson: { name: 'ridge-bridge', workspaces: ['apps/*'] },
        files: {
          'apps/api/package.json': JSON.stringify({ name: 'api' }),
          'apps/client/package.json': JSON.stringify({ name: 'client' }),
        },
      });

      await personalDevcontainer();

      const nodeFeaturePath = path.join('.devcontainer', 'features', `${name}-node`);
      const { featureJson, installScript } = getFeatures({ name, workspacePackages })[0]!;

      expect(fileSystem.readJson(path.join(nodeFeaturePath, 'devcontainer-feature.json'))).toEqual(featureJson);
      expect(fileSystem.readFile(path.join(nodeFeaturePath, 'install.sh'))).toBe(`${installScript}\n`);
    });
  });
});
