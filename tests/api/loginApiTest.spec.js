import {test, expect} from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import { UserDetailsRequest, UserDetailsResponse, verifyUserDetailsResponse } from '../../pojo/userDetails';
import dotenv from 'dotenv';

dotenv.config();
 let api;

test.beforeEach(async () => {
   api = new ApiHelper();
   await api.initContext();
});

test.afterEach(async () => {
    await api.disposeContext();
}); 


test.describe('Login API', () => {
    test('@Sanity verify user valid credential ', async () => {
        const requestBody = new UserDetailsRequest(
            process.env.USERNAME1,
            process.env.PATHOLOGY_ID,
            process.env.PASSWORD
        );
        const response = await api.postApi(`/LoginAPI/GetUserDetails`, requestBody);
        await new verifyUserDetailsResponse(response).verifySuccessResponse();
    });

    test('@Sanity verify invalid username credential ', async () => {
        const requestBody = new UserDetailsRequest(
            "InvalidUser",
            process.env.PATHOLOGY_ID,
            process.env.PASSWORD
        );
        const response = await api.postApi(`/LoginAPI/GetUserDetails`, requestBody);
        await new verifyUserDetailsResponse(response).verifyInvalidResponse();
    });

    test('@Sanity verify invalid password credential ', async () => {
        const requestBody = new UserDetailsRequest(
           process.env.USERNAME1,
            process.env.PATHOLOGY_ID,
            "WrongPassword"
        );
        const response = await api.postApi(`/LoginAPI/GetUserDetails`, requestBody);
        await new verifyUserDetailsResponse(response).verifyInvalidResponse();
    });

    test('@Sanity verify invalid pathology ID credential ', async () => {
        const requestBody = new UserDetailsRequest(
           process.env.USERNAME1,
            "InvalidPathologyID",
            process.env.PASSWORD
        );
        const response = await api.postApi(`/LoginAPI/GetUserDetails`, requestBody);
        await new verifyUserDetailsResponse(response).verifyInvalidResponse();
    });

    test('@Sanity verify blank credential ', async () => {
        const requestBody = new UserDetailsRequest(
            null,
            null, 
            null
        );
        const response = await api.postApi(`/LoginAPI/GetUserDetails`, requestBody);
        await new verifyUserDetailsResponse(response).verifyBlankResponse("UserId");
        await new verifyUserDetailsResponse(response).verifyBlankResponse("Password");
        await new verifyUserDetailsResponse(response).verifyBlankResponse("PathId");    
    });

    test('@Sanity verify blank username credential ', async () => {
        const requestBody = new UserDetailsRequest(
            null,
            process.env.PATHOLOGY_ID,
            process.env.PASSWORD
        );
        const response = await api.postApi(`/LoginAPI/GetUserDetails`, requestBody);
        await new verifyUserDetailsResponse(response).verifyBlankResponse("UserId");
    });

    test('@Sanity verify blank password credential ', async () => {
        const requestBody = new UserDetailsRequest( 
            process.env.USERNAME1,
            process.env.PATHOLOGY_ID,
            null
            
        );
        const response = await api.postApi(`/LoginAPI/GetUserDetails`, requestBody);
        await new verifyUserDetailsResponse(response).verifyBlankResponse("Password");
    });

    test('@Sanity verify blank pathology ID credential ', async () => {     
        const requestBody = new UserDetailsRequest(
            process.env.USERNAME1,
            null,
            process.env.PASSWORD
            );
        const response = await api.postApi(`/LoginAPI/GetUserDetails`, requestBody);
         await new verifyUserDetailsResponse(response).verifyBlankResponse("PathId");
    });

//     //test('@Sanity verify No Auth Headers', async () => {
//         const unauthenticatedApi = new ApiHelper();
//         await unauthenticatedApi.initContext(); 
//         await unauthenticatedApi.initContext({
//     extraHTTPHeaders: {
//         'Content-Type': 'application/json'
//     }
// });
//         const requestBody = new UserDetailsRequest(
//             process.env.USERNAME1,
//             process.env.PATHOLOGY_ID,   
//             process.env.PASSWORD
//         );
//         const response = await unauthenticatedApi.postApi(`/LoginAPI/GetUserDetails`, requestBody);
//         expect(response.status()).toBe(401);
//     });


});