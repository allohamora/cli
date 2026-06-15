import { nvmrcWorkflowMutation, type WorkflowPreset } from '#src/categories/js/nvmrc/nvmrc.service.ts';

export const defaultPreset = {
  content: {
    name: 'test',
    on: {
      push: {
        branches: ['**'],
      },
    },
    jobs: {
      test: {
        'runs-on': 'ubuntu-latest',
        env: {
          CI: true,
        },
        steps: [
          {
            name: 'Checkout code',
            uses: 'actions/checkout@v6',
          },
          {
            name: 'Install node',
            uses: 'actions/setup-node@v6',
            with: {
              cache: 'npm',
            },
          },
          {
            name: 'Install dependencies',
            run: 'npm ci',
          },
          {
            name: 'Run tests',
            run: 'npm run test',
          },
        ],
      },
    },
  },
  mutations: [nvmrcWorkflowMutation],
} satisfies WorkflowPreset;
