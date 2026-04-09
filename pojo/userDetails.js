import { expect } from '@playwright/test';

class UserDetailsRequest {
  constructor(userId, pathId, password) {
    this.userId = userId;
    this.pathId = pathId;   
    this.password = password
  } 
}

class UserDetailsResponse {
  constructor(responseBody) {
    Object.assign(this, responseBody);
  }
}

class verifyUserDetailsResponse {

  constructor(response){
    this.response = response;
  }

  async verifySuccessResponse() {
    expect(this.response.status()).toBe(200);
    const responseBody = new UserDetailsResponse(await this.response.json());
    expect(responseBody.success).toBe(true);
    expect(responseBody.token).toBe("");
    expect(responseBody.message).toBe("User Found");
  }

  async verifyInvalidResponse() {
    expect(this.response.status()).toBe(200);
            const responseBody = new UserDetailsResponse(await this.response.json());
            expect(responseBody.message).toBe("Invalid credentials");
            expect(responseBody.success).toBe(false);
            expect(responseBody.token).toBe("");
  }

  async verifyBlankResponse(field) {
    if(field === "UserId" || field === "Password" || field === "PathId") {  
    expect(this.response.status()).toBe(400);
            const responseBody = new UserDetailsResponse(await this.response.json());
            expect(responseBody.title).toBe("One or more validation errors occurred.");
            expect(responseBody.errors[field]).toContain("The " + field + " field is required.");
            expect(responseBody.traceId).not.toBe();
  }
  else {
    throw new Error("Invalid field for blank response verification. Valid fields are: UserId, Password, PathId.");
  }

} 
}

export { UserDetailsRequest, UserDetailsResponse, verifyUserDetailsResponse };