export const defaultPreset = {
  content: {
    name: 'check',
    on: {
      push: {
        branches: ['**'],
      },
    },
    jobs: {
      check: {
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
        ],
      },
    },
  },
};
