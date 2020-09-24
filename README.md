# wolt-assignment-zhentian

### Install

`npm install` or `yarn install`

### Running the app

`npm start` or `yarn start`

Then view the app on `http://localhost:3000`

### Running the unit test

`npm test` or `yarn test`

### Structure of the application

src/components: contain TimeTable component & its model parser functions
src/components/**test**: related testing
src/system: Primitive component for building other component using (styled system)[https://styled-system.com/]
src/utils: Helper functions to deal with time & date

src/models.ts: Types
src/data.ts: JSON data
src/theme.ts: Theme configuration
src/index.ts: Start from here
