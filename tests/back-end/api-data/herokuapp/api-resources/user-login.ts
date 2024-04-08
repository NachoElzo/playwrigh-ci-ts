import { APIResponse, expect } from '@playwright/test'
import getTokenUser from '../api-structure/post-login'
import random from '../../../../utilities/random'

interface TokenResponse {
    userID: string;
    username: string;
}
async function requestToken(): Promise<TokenResponse> {
    let userName: string = `@User ${random.randomString()}`
    let password: string = `@Pass1 ${random.randomString()}`
    const auth = {
        userName: userName,
        password: password
    }
    const response: APIResponse = await getTokenUser.getToken(auth)
    expect(response).toBeOK();
    const payload = await response.json();
    const userID = payload.userID;
    const username = payload.username;
    return { userID, username };
}

export default { requestToken };