# ![Image](./docs/cttIcon.svg) Continuous Time Tracking (CTT)

[![Build Status](https://drone.dev.sart.solutions/api/badges/electron2302/continuous-time-tracking/status.svg?ref=refs/heads/develop)](https://drone.dev.sart.solutions/electron2302/continuous-time-tracking)

## Usage

## Development Setup

Prerequisites:

- Node.js v10.x or later
- npm v5.x or later
- git v2.14.1 or later

Install the aws-amplify cli with (you might need <code>sudo</code>):

- <code>npm install -g @aws-amplify/cli</code>

Configure Amplify with:

- <code>amplify configure</code>
- region: us-east-1

Install Amplify libraries:

- <code>npm install --save aws-amplify @aws-amplify/ui-angular</code>

Get implemented api, database and authentication with:

- <code>amplify pull</code>

Check your Amplify status with:

- <code>amplify status</code>

### Code style

We use the default ESLint angular configuration.
Furthermore we use the default prettier configuration.

### Integration into Visual Studio Code

Plugins:

- Name: ESLint
  Id: dbaeumer.vscode-eslint
  Description: Integrates ESLint JavaScript into VS Code.
  Version: 2.1.14
  Publisher: Dirk Baeumer
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- Name: Prettier - Code formatter
  Id: esbenp.prettier-vscode
  Description: Code formatter using prettier
  Version: 5.9.1
  Publisher: Prettier
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

### Build and serve

You can build and serve your local changes locally by running:

- <code>npm install</code>
- <code>ng serve</code>

in the ./ctt-frontend directory.

### Run tests

You can run the tests by running:

- <code>ng test</code>

in the ./ctt-frontend directory.

## Contributors

The following authors have contributed to this project (in alphabetical order):

- [AndHager](https://github.com/AndHager)
- [electron2302](https://github.com/electron2302)
- [sschoetz](https://github.com/sschoetz)
- [walli545](https://github.com/walli545)
