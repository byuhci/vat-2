
# UI Front-End
This directory holds the web user-interface.

## Project Configuration
This part of the project has been implemented in [Typescript](https://www.typescriptlang.org/) using [Angular 2](https://angular.io/).
Most commands relevant to development can be run using [npm](https://www.npmjs.com/), and are defined in the `package.json` file.

### Compiling
Since Typescript compiles down to Javascript, make sure to run `tsc` after making changes.

To run the Typescript compiler via npm, run the command: `npm run tsc` or `npm run tsc:w` to run it in watch mode.

### Running
Since most of the content is rendered dynamically with Javascript, so to work properly it needs to be run from some sort of Javascript server.
For this project we use [lite-server](https://github.com/johnpapa/lite-server), which is listed in the development dependencies.

To start the front-end server, run the command: `npm run lite`

### Unit Tests
To run the suite of unit tests, run the command `npm run test`
