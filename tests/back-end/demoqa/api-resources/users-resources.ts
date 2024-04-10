import { APIResponse, expect } from '@playwright/test'
import apiUsers from '../api-structure/api-users'

async function userCreation(userName: string, password: string) {
    const auth: object = {
        userName: userName,
        password: password
    }
    const request: APIResponse = await apiUsers.postUser(auth)
    expect(request).toBeOK();
    const response = await request.json();
    const userId = response.userID;
    const books = response.books;
    return { userId, books };
}


async function userAuthorization(userName: string, password: string) {
    const auth = {
        userName: userName,
        password: password
    }
    const request: APIResponse = await apiUsers.getUserAuthorization(auth)
    expect(request).toBeOK();
}


async function tokenCreation(userName: string, password: string) {
    const auth = {
        userName: userName,
        password: password
    }
    const request: APIResponse = await apiUsers.postToken(auth)
    expect(request).toBeOK();
    const response = await request.json();
    const token = response.token;
    return token;
}

async function deletingUser(userId: string, token: string) {
    const auth = `Bearer ${token}`
    const request: APIResponse = await apiUsers.deleteUser(userId, auth)
    expect(request).toBeOK();
}


export default { userCreation, userAuthorization, tokenCreation, deletingUser };