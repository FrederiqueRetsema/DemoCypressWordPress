const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://192.168.2.78",
	specPattern: "\\demo\\cypress\\**\\*.cy.js",
    supportFile: false,
    setupNodeEvents(on, config) {
    }
  }
})