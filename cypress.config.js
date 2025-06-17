const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({
    e2e: {
        specPattern: "features/**/*.feature",
        supportFile: false,
        baseUrl: "http://localhost:3000",
        async setupNodeEvents(on, config) {
            await addCucumberPreprocessorPlugin(on, config);
            on("file:preprocessor", createBundler({
                plugins: [createEsbuildPlugin(config)],
            }));
            return config;
        },
    },
    reporter: "mochawesome",
    reporterOptions: {
        reportDir: "cypress/reports",
        overwrite: false,
        html: true,
        json: true
    }
});
