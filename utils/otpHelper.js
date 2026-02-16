import { request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


async function getLoginOtp(username, pathologyId) {
    const apiContext = await request.newContext( {baseURL: process.env.API_BASE_URL},
        {Auth : {username: process.env.API_USERNAME, password: process.env.API_PASSWORD} });
        
    const response  =  await apiContext.get(`/LoginAPI/GenerateToken?userId=${username}&pathId=${pathologyId}`);
    const jsonBody = await response.json();
    return jsonBody.token;
}

export { getLoginOtp };