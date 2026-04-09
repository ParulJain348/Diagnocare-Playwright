import { expect } from "@playwright/test";
import { getLoginOtp } from "../utils/otpHelper";


export class LoginPages{
    constructor(page){
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.username = page.locator("//label[text()='User Name']/following::input[1]");
        this.PathologyId = page.locator("//label[text()='Pathology Id']/following::input[1]");
        this.password = page.locator(   "//label[text()='Password']/following::input[1]");
        this.GenerateOTPButton = page.locator('button.btnOTP');
        this.otpText = page.getByLabel('Enter OTP');
        this.otpBoxs = page.locator("input.otp-box");
        this.otpLoginButton = page.locator("//div[@id='loginQRModal']//button[text()='Login']");
        this.otpPopupCloseButton = page.locator('h3:has-text("Enter OTP from SMS to validate login") + button[aria-label="Close"]')

    }

    async loginToApplication(un, pathId, pwd){
        await this.loginButton.click();
        await this.username.fill(un);
        await this.PathologyId.fill(pathId);
        await this.password.fill(pwd);
        for (let attempt = 0; attempt < 5; attempt++) {
        await this.GenerateOTPButton.click();
        const otpBoxes = await this.otpBoxs.all();
        const otp = await this.getOTP(un, pathId);
        await this.enterOTP(otp);
        try {
        await this.page.getByText('OTP Validation failed')
            .waitFor({ state: 'visible', timeout: 2000 });
        console.log("OTP failed. Retrying...");
        await this.otpPopupCloseButton.click();
        await this.page.waitForTimeout(4000); // wait before retrying
        continue;
        } catch (e) {
        console.log("OTP Success ✅");
        return;
        }  
        }   
    } 
    

   async enterOTP(otp) {
          for (let i = 0; i < otp.length; i++) {
          const box = this.otpBoxs.nth(i);
          await box.fill('');
          await box.type(otp[i]);
          }
}

 async getOTP(username, pathologyId){
        const otp = await getLoginOtp(username, pathologyId);
        console.log("OTP received from API: ", typeof(otp), otp);
        return otp;
    }



}