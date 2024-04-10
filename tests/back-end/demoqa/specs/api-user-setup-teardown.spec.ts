import { expect, test } from '@playwright/test';
import userCommon from '../common/users-functions.ts';
import random from '../../../../utilities/random.ts';

test.describe('Given a user that requests a user token', () => {
    let userName: string, password: string, userId: string, token: string;
    userName = `@User${random.randomString()}`;
    password = `@Pass1${random.randomString()}`;

    test.beforeEach('setup user', async () => {
        const { userId: createdUserId, books } = await userCommon.createUser(userName, password);
        userId = createdUserId;
        console.log(`The user id is: ${userId}\nThe username is: ${userName}\nThe password is: ${password}`);
        //since user is new, books array should be empty
        expect(books).toStrictEqual([]);
    });
    test('Then the user will be authorized and will generate a token', async ({ }) => {
        await userCommon.authorizeUser(userName, password);
        console.log('Your user is authorized to use the API');
        token = await userCommon.createToken(userName, password);
        console.log(`The user token is: ${token}`);
    });
    test.afterEach('teardown delete user', async () => {
        await userCommon.deleteUser(userId, token);
        console.log('The user was deleted successfully');
    });

});
