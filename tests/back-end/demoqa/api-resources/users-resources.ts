import { APIResponse, expect } from '@playwright/test'
import apiUsers from '../api-structure/api-users'

async function userCreation(userName, password) {
    const auth = {
        userName: userName,
        password: password
    }
    const response: APIResponse = await apiUsers.postUser(auth)
    expect(response).toBeOK();
    const payload = await response.json();
    const userID = payload.userID;
    const username = payload.username;
    return { userID, username };
}


async function userAuthorization(userName, password) {
    const auth = {
        userName: userName,
        password: password
    }
    const response: APIResponse = await apiUsers.getUserAuthorization(auth)
    expect(response).toBeOK();
}


async function tokenCreation(userName, password) {
    const auth = {
        userName: userName,
        password: password
    }
    const response: APIResponse = await apiUsers.postToken(auth)
    expect(response).toBeOK();
    const payload = await response.json();
    const token = payload.token;
    return token;
}


export default { userCreation, tokenCreation, userAuthorization };