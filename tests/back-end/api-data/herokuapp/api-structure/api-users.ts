import { APIResponse, request } from "@playwright/test";
import urls from '../../../../utilities/urls'

async function postUser(body):
    Promise<APIResponse> {
    const context = await request.newContext({ baseURL: urls.demoqa });
    return await context.post(`./Account/v1/User`,
        {
            data: body
        }
    )
}

async function getUserAuthorization(body):
    Promise<APIResponse> {
    const context = await request.newContext({ baseURL: urls.demoqa });
    return await context.get(`./Account/v1/Authorized`,
        {
            data: body
        }
    )
}

async function postToken(body):
    Promise<APIResponse> {
    const context = await request.newContext({ baseURL: urls.demoqa });
    return await context.post(`./Account/v1/GenerateToken`,
        {
            data: body
        }
    )
}


export default { postUser, getUserAuthorization, postToken }
