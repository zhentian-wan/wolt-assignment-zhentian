# wolt-assignment-zhentian

## Quick access from [Codesandbox](https://codesandbox.io/s/github/zhentian-wan/wolt-assignment-zhentian)

or

## Run locally

### Install

`npm install` or `yarn install`

### Running the app

`npm start` or `yarn start`

Then view the app on `http://localhost:3000`

### Running the unit test

`npm test` or `yarn test`

### Structure of the application

Following the Domain Driven Design:

Since assignment app is simple, there is only one **Smart** component: App.txs.

src/components: **Domain layer.** contain TimeTable component & its model parser functions

src/components/**test**: related testing

src/system: **UI layer.** Primitive component for building other component using [styled system](https://styled-system.com/)

src/utils: **Util layer.** Helper functions to deal with time & date

src/models.ts: Types

src/data.ts: JSON data

src/theme.ts: Theme configuration

src/index.ts: Start from here
