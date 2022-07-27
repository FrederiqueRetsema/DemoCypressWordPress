const { defineConfig } = require("cypress");
const siteIpAddress = '172.19.176.1'

module.exports = defineConfig({
  env: {
	siteIpAddress: siteIpAddress
  },
  e2e: {
    baseUrl: 'http://'+siteIpAddress,
	specPattern: '\\demo\\initialize_wp_db\\cypress\\**\\*.cy.js',
    supportFile: false,
    setupNodeEvents(on, config) {
    }
  }
})