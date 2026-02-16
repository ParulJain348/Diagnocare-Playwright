import { expect } from "@playwright/test";
import { getLoginOtp } from "../utils/otpHelper";


export class LoginPages{
    constructor(page){
        this.page = page;
        this.username = page.locator("//label[text()='User Name']/following::input[1]");
        this.PathologyId = page.locator("//label[text()='Pathology Id']/following::input[1]");
        this.password = page.locator(   "//label[text()='Password']/following::input[1]");
        this.loginButton = page.locator('button.btnOTP');
        this.otpText = page.getByText('Enter OTP from SMS to validate for login as two way authentication');  
        this.otpBoxs = page.locator("input.otp-box");
        this.otpLoginButton = page.locator("//div[@id='loginQRModal']//button[text()='Login']");

    }

    async loginToApplication(un, pathId, pwd){
        await this.username.fill(un);
        await this.PathologyId.fill(pathId);
        await this.password.fill(pwd);
        await this.loginButton.click();
    }      
    
    async getOTP(username, pathologyId){
        const otp = await getLoginOtp(username, pathologyId);
        console.log("OTP received from API: ", typeof(otp), otp);
        return otp;
    }

    async enterOTP(un, pathId){
        const otp = await this.getOTP(un, pathId);
        await expect(this.otpText).toBeVisible();
        const otpBoxes = await this.otpBoxs.all();
        for(let i=0; i<otp.length; i++){
            await otpBoxes[i].fill(otp[i]);     
        }   
        //await this.otpLoginButton.click();
    }

}