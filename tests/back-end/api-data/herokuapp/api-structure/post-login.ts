import { APIResponse, request } from "@playwright/test";
import urls from '../../../../utilities/urls'

async function getToken(body):
    Promise<APIResponse> {
    const context = await request.newContext({ baseURL: urls.demoqa });
    return await context.post(`./Account/v1/User`,
        {
            data: body
        }
    )
}
export default { getToken }
