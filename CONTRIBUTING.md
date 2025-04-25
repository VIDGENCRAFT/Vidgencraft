# Contributing to Vidgencraft

We love your input! We want to make contributing to Vidgencraft as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/VIDGENCRAFT/Vidgencraft.git
cd vidgencraft
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start development servers:
```bash
yarn dev
```

## Project Structure

```
vidgencraft/
├── apps/                    # Application modules
│   ├── web/                # Next.js web application
│   ├── api/                # Express.js API server
│   └── blockchain/         # Blockchain integration
├── contracts/              # Smart contracts
├── docs/                   # Documentation
├── scripts/               # Utility scripts
├── shared/                # Shared utilities and components
└── tests/                 # Test suites
```

## Testing

Run the test suite:

```bash
yarn test
```

For smart contract tests:

```bash
yarn workspace @vidgencraft/blockchain test
```

## Code Style

- We use ESLint and Prettier for code formatting
- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages

## Pull Request Process

1. Update the README.md with details of changes to the interface
2. Update the documentation with details of any new functionality
3. The PR must be approved by at least one maintainer
4. PR title should follow conventional commits format

## License

By contributing, you agree that your contributions will be licensed under its MIT License. 