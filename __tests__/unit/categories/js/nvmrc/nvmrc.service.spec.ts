import { fileSystem, installationState } from '#__tests__/setup-test-context.ts';
import {
  isNvmrcInstalled,
  nvmrcWorkflowMutation,
  type WorkflowPreset,
} from '#src/categories/js/nvmrc/nvmrc.service.ts';
import { describe, expect, it } from 'vitest';

const createWorkflowPreset = (): WorkflowPreset => ({
  content: {
    name: 'test',
    jobs: {
      test: {
        steps: [
          {
            name: 'Checkout code',
            uses: 'actions/checkout@v4',
          },
          {
            name: 'Install node',
            uses: 'actions/setup-node@v4',
            with: {
              cache: 'npm',
            },
          },
        ],
      },
    },
  },
  mutations: [],
});

describe('nvmrc.service', () => {
  describe('isNvmrcInstalled', () => {
    it('returns true if nvmrc is selected for install', async () => {
      installationState.setSelectedInstallOptions(['nvmrc']);

      expect(await isNvmrcInstalled()).toBe(true);
    });

    it('returns true if .nvmrc exists', async () => {
      fileSystem.writeFile('.nvmrc', '24.14.1\n');

      expect(await isNvmrcInstalled()).toBe(true);
    });

    it('returns false if nvmrc is not selected for install and .nvmrc does not exist', async () => {
      expect(await isNvmrcInstalled()).toBe(false);
    });
  });

  describe('nvmrcWorkflowMutation', () => {
    it('adds node-version-file to setup-node steps if nvmrc is installed', async () => {
      installationState.setSelectedInstallOptions(['nvmrc']);
      const preset = createWorkflowPreset();

      await nvmrcWorkflowMutation(preset);

      expect(preset.content.jobs.test?.steps?.[1]).toEqual({
        name: 'Install node',
        uses: 'actions/setup-node@v4',
        with: {
          cache: 'npm',
          'node-version-file': '.nvmrc',
        },
      });
    });

    it('does not mutate setup-node steps if nvmrc is not installed', async () => {
      const preset = createWorkflowPreset();

      await nvmrcWorkflowMutation(preset);

      expect(preset.content.jobs.test?.steps?.[1]).toEqual({
        name: 'Install node',
        uses: 'actions/setup-node@v4',
        with: {
          cache: 'npm',
        },
      });
    });

    it('does not mutate workflows without setup-node steps', async () => {
      installationState.setSelectedInstallOptions(['nvmrc']);
      const preset: WorkflowPreset = {
        content: {
          name: 'release',
          jobs: {
            release: {
              steps: [
                {
                  name: 'Release to github',
                  uses: 'softprops/action-gh-release@v2',
                },
              ],
            },
          },
        },
        mutations: [],
      };

      await nvmrcWorkflowMutation(preset);

      expect(preset.content.jobs.release?.steps).toEqual([
        {
          name: 'Release to github',
          uses: 'softprops/action-gh-release@v2',
        },
      ]);
    });
  });
});
