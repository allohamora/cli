import { nvmrcWorkflowMutation, type WorkflowPreset } from '#src/categories/js/nvmrc/nvmrc.service.ts';

export const defaultPreset = {
  content: {
    name: 'publish',
    on: {
      workflow_dispatch: null,
    },
    concurrency: {
      group: 'publish',
      'cancel-in-progress': false,
    },
    jobs: {
      publish: {
        'runs-on': 'ubuntu-latest',
        'timeout-minutes': 15,
        permissions: {
          'id-token': 'write',
          contents: 'read',
        },
        steps: [
          {
            name: 'Checkout code',
            uses: 'actions/checkout@v7',
          },
          {
            name: 'Setup Node.js',
            uses: 'actions/setup-node@v6',
            with: {
              'registry-url': 'https://registry.npmjs.org',
              'package-manager-cache': false,
            },
          },
          {
            name: 'Install dependencies',
            run: 'npm ci',
          },
          {
            name: 'Build',
            run: 'npm run build',
          },
          {
            name: 'Publish to npm',
            run: 'npm publish',
          },
        ],
      },
    },
  },
  mutations: [nvmrcWorkflowMutation],
} satisfies WorkflowPreset;
