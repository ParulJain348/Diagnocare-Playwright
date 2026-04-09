// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/api',
  retries: 2,
  workers: 1,
  timeout: 40 * 1000,
  expect: {
    timeout: 30000
  },

 
  reporter:  [
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['line']
    
  ],
 
  use: {
   
    baseURL: process.env.UI_BASE_URL,
    screenshot: 'on',
    video: 'on',
    browserName: 'chromium',
    headless: false,
    trace: 'on',

  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});

