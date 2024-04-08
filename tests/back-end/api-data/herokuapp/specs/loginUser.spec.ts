import { test } from '@playwright/test'
import userToken from '../common/login'
// import userToken from '../api-structure/post-login'

test.describe('Given a user that request a user token', () => {
    test('Then he will store the token', async ({ }) => {
        const { userID, username } = await userToken.token()
        console.log(`userID: ${userID}, username: ${username}`);
    })

})