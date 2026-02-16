import {test, expect} from '@playwright/test';
import { LoginPages } from '../pages/LoginPages';
import dotenv from 'dotenv';

dotenv.config();



test.describe('Login Functionality', () => {

    test('@Sanity Login with valid credentials', async ({page}) => {
        await page.goto('/Login');
        const loginPage = new LoginPages(page);
        await loginPage.loginToApplication(process.env.USERNAME1, process.env.PATHOLOGY_ID, process.env.PASSWORD);
        await loginPage.enterOTP(process.env.USERNAME1, process.env.PATHOLOGY_ID);
        await expect(page).toHaveTitle("Diagnocare Pathology");

    });


});

