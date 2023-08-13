import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://www.homagames.com/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    supportFile: false, // not necessary for this case study
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
