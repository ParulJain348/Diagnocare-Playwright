import { expect } from "@playwright/test";


export class PathologyPages{
    constructor(page){
        this.page = page;
        this.addNewPathology = page.getByText('Add New Pathology');

        this.license =  page.getByText('License');
        this.trial = page.getByText('Trial');
        this.signUpButton = page.getByText('Sign Up');
        this.cancelButton = page.getByText('Cancel');

    }

    async navigateToAddNewPathology(){
        await this.addNewPathology.click();
        await expect(this.page.getByText('Add Pathology Form')).toBeVisible();
    }

    async clickSignUp(){
       await this.signUpButton.click();
    }

    async verifyPathologyCreation(){
        await expect(this.page.getByText('Pathology created successfully')).toBeVisible();
    }
    

    async fillPathologyDetails(excelData){

       for (const key in excelData) {
    // Handle License Type
    if (key === 'license_Type') {

        if (excelData[key] === 'License') {
            await this.license.click();
        } 
        else if (excelData[key] === 'Trial') {
            await this.trial.click();
        }
    }

    // Handle Image Upload
    else if (key === 'path_Image') {

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.locator(`[formcontrolname="${key.trim()}"]`).click()
        ]);

        await fileChooser.setFiles(excelData[key]);
    }

    // Handle Dropdowns
    else if (key === 'path_State' || key === 'path_Country') {

        await this.page
            .locator(`[formcontrolname="${key.trim()}"]`)
            .selectOption({ value: excelData[key].toString().trim() });
    }

    // Handle Input Fields
    else {

        const locator = this.page.locator(`[formcontrolname="${key.trim()}"]`);
        console.log(`Filling field: ${key} with value: ${excelData[key]}`);
        await locator.fill(excelData[key].toString().trim());
    }
}


    }



}