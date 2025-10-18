const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: 1,
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
