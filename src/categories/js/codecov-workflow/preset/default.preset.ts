import { nvmrcWorkflowMutation, type WorkflowPreset } from '#src/categories/js/nvmrc/nvmrc.service.ts';

export const defaultPreset = {
  content: {
    name: 'codecov',
    on: {
      push: {
        branches: ['**'],
      },
    },
    jobs: {
      codecov: {
        'runs-on': 'ubuntu-latest',
        steps: [
          {
            name: 'Checkout code',
            uses: 'actions/checkout@v7',
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
            name: 'Collect coverage',
            run: 'npm run test:coverage',
          },
          {
            name: 'Upload coverage to Codecov',
            uses: 'codecov/codecov-action@v7',
          },
        ],
      },
    },
  },
  mutations: [nvmrcWorkflowMutation],
} satisfies WorkflowPreset;
