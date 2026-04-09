import { request } from '@playwright/test';
import dotenv from 'dotenv';
import { log } from 'node:console';

dotenv.config();

export class ApiHelper {
    constructor() {
        this.apiContext = null;
        this.authUsername = process.env.authUsername;
        this.authPassword = process.env.authPassword;
    }

    async initContext() {
        const authString = `${this.authUsername}:${this.authPassword}`;
        const encoded = Buffer.from(authString).toString('base64');

        this.apiContext = await request.newContext({
            baseURL: process.env.API_BASE_URL,
            extraHTTPHeaders: {
                'Authorization': `Basic ${encoded}`,
                'Content-Type': 'application/json'
            },
        });
        console.log('API context initialized with base URL:', process.env.API_BASE_URL);

    }

    async disposeContext() {
        if (this.apiContext) {
            await this.apiContext.dispose();
            console.log('API context disposed');
    }
}

    async postApi(endpoint, body, retries = 3) {
        // Manually log the request details right before the call

        if (!this.apiContext) {
            throw new Error('API context not initialized. Call initContext() first.');
        }
        console.log(`Making POST request to ${endpoint} with body:`, body);
            const response = await this.apiContext.post(endpoint, {
                data: body
            });
            console.log('📋 RESPONSE HEADERS:', response.headers());
            console.log("Status Code:", response.status());
            console.log('Response:', await response.text());
            return response;
        }
    


    async getApi(endpoint, retries) {
        if (!this.apiContext) {
            throw new Error('API context not initialized. Call initContext() first.');
        }
            const response = await this.apiContext.get(endpoint);
            console.log("Status Code:", response.status());
            console.log('Response:', await response.text());
                return await response.json();
            
}
}