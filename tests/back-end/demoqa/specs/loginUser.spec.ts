import { test } from '@playwright/test'
import userCommon from '../common/users-functions.ts'
import random from '../../../../utilities/random.ts'
let userName: string = `@User${random.randomString()}`
let password: string = `@Pass1${random.randomString()}`

test.describe('Given a user that request a user token', () => {
    test('Then he will store the token', async ({ }) => {
        const { userID, username } = await userCommon.createUser(userName, password)
        console.log(`The user id is: ${userID} \nThe username is: ${username}`);
        await userCommon.authorizeUser(userName, password)
        console.log('Your user is authorized to use the API')
        const token = await userCommon.createToken(userName, password)
        console.log(`The user token is: ${token}`)

    })

})