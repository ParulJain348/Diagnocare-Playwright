import {test, expect} from '@playwright/test';
import { LoginPages } from '../../pages/LoginPages';
import { PathologyPages } from '../../pages/pathloagyPages';
import dotenv from 'dotenv';    
import { readExcelFile } from '../../utils/excelReader';
dotenv.config();

test.beforeEach(async ({page}) => {  
    await page.goto('/Login');
        const loginPage = new LoginPages(page);
        await loginPage.loginToApplication(process.env.USERNAME1, process.env.PATHOLOGY_ID, process.env.PASSWORD);
        await loginPage.enterOTP(process.env.USERNAME1, process.env.PATHOLOGY_ID);
        await expect(page).toHaveTitle("Diagnocare Pathology");
});


test.describe('Pathlogy Creation', () => {
    test('@Sanity Create Pathology with valid details', async ({page}) => {
        const pathologyPage = new PathologyPages(page);
        await pathologyPage.navigateToAddNewPathology();
        await pathologyPage.fillPathologyDetails(readExcelFile('testData/diagnocareTestData.xlsx', 'Sheet1')[0]);
        await pathologyPage.clickSignUp();
        await pathologyPage.verifyPathologyCreation();
       // await page.pause();
    });
});

