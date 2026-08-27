import path from 'node:path';
import { fileSystem } from '#__tests__/setup-test-context.ts';
import { describe, expect, it } from 'vitest';
import { writeDevcontainerFeature, writeDevcontainerJson } from '#src/services/devcontainer.service.ts';

describe('devcontainer.service', () => {
  describe('writeDevcontainerJson', () => {
    it('writes devcontainer.json to .devcontainer', async () => {
      const content = { name: 'foo' };

      await writeDevcontainerJson(content);

      expect(fileSystem.readJson(path.join('.devcontainer', 'devcontainer.json'))).toEqual(content);
    });
  });

  describe('writeDevcontainerFeature', () => {
    it('writes devcontainer-feature.json and install.sh to .devcontainer/features/<name>', async () => {
      const name = 'foo-node';
      const featureJson = { id: name };
      const installScript = '#!/bin/sh\necho hello';

      await writeDevcontainerFeature(name, { featureJson, installScript });

      const featurePath = path.join('.devcontainer', 'features', name);
      expect(fileSystem.readJson(path.join(featurePath, 'devcontainer-feature.json'))).toEqual(featureJson);
      expect(fileSystem.readFile(path.join(featurePath, 'install.sh'))).toBe(`${installScript}\n`);
    });
  });
});
