import { APIResponse, request } from "@playwright/test";
import url from '../../../../global/urls'


async function postUser(body: object):
    Promise<APIResponse> {
    const context = await request.newContext({ baseURL: url.demoqa });
    return await context.post(`./Account/v1/User`,
        {
            data: body
        })
}

async function getUserAuthorization(body: Object):
    Promise<APIResponse> {
    const context = await request.newContext({ baseURL: url.demoqa });
    return await context.get(`./Account/v1/Authorized`,
        {
            data: body
        })
}

async function postToken(body: object):
    Promise<APIResponse> {
    const context = await request.newContext({ baseURL: url.demoqa });
    return await context.post(`./Account/v1/GenerateToken`,
        {
            data: body
        })
}
async function deleteUser(userId: string, auth: string) {
    const context = await request.newContext({ baseURL: url.demoqa });
    return await context.delete(`./Account/v1/User/${userId}`, {
        headers: { Authorization: auth }
    });
}
export default { postUser, getUserAuthorization, postToken, deleteUser }
