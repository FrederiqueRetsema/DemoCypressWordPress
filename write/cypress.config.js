const { defineConfig } = require("cypress");
const siteIpAddress = "172.25.0.1"

module.exports = defineConfig({
  env: {
	siteIpAddress: siteIpAddress
  },
  e2e: {
    baseUrl: "http://"+siteIpAddress,
	experimentalSessionAndOrigin: true,
	specPattern: "\\demo\\write\\cypress\\**\\*.cy.js",
    supportFile: "\\demo\\write\\support\\e2e.js",
    setupNodeEvents(on, config) {
    }
  }
})