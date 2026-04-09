import { request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

async function getLoginOtp(username1, pathologyId) {

    const apiContext = await request.newContext({
        baseURL: process.env.API_BASE_URL,
    });

    try {
        for (let i = 0; i < 3; i++) {

            const response = await apiContext.get(
                `/LoginAPI/GenerateToken?userId=${username1}&pathId=${pathologyId}`);
            
            console.log(`Waiting for OTP API response... ${(await response.body()).toString()}`)
            if (!response.ok()) {
                throw new Error(`OTP API failed: ${response.status()}`);}
            const jsonBody = await response.json();
            if (jsonBody.token) {
                return jsonBody.token;
            }

            // wait 1 second before retry
            await new Promise(res => setTimeout(res, 1000));
        }

        throw new Error('OTP not generated after retries');

    } finally {
        await apiContext.dispose();
    }
}

export { getLoginOtp };