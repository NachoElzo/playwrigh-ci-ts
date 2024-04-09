import { expect, test } from '@playwright/test'
import url from '../../../../global/urls'

test.describe('Given a user that aborts styles calls in the home page', async () => {
    //for this type of request you need to import the context in the beforeeach (isolated instace of a browser)
    test.beforeEach(async ({ context }) => {
        //route method works for modify requets, abort will abort the specified responses (png,jpg,jpeg,css)
        await context.route('**/*.{png,jpg,jpeg,css}', route => route.abort());
    });
    test('Then user will see home page without styles', async ({ page }) => {
        await page.goto(url.apiConduit)
    })
})

test.describe('Given a user that intercepts api response and post with empty object', async () => {
    test('The user will assert that in web the object is not visible', async ({ page }) => {
        await page.route('**/api/articles*', async route => {
            //since we are not in the web page the if the response do not have any data, will post as {empty}
            const responseBody = JSON.parse(route.request().postData() || JSON.stringify({ "nada": null }))
        })
        await page.goto(url.apiConduit);
        //we validate that the object is not visible since we post with empty object
        await expect(page.locator('[ng-bind="$ctrl.article.title"]').first()).not.toBeVisible()
    })
})


//Also this case in handy when you pass parameters in the url that send api request to the backend and then check if the response changes
//EX: expect(responseBody.articles[0].title).toBe('valuePassedIntheUrl')

test.describe('Given a user that intercepts api response and post with empty object then continue', async () => {
    test('The user will get a response and asse', async ({ page }) => {
        await page.goto(url.apiConduit);
        await page.route('**/api/articles*', async route => {
            //parse the response to an empty object
            const responseBody = JSON.parse(route.request().postData() || '{}');
            //with route.continue the response will be reloaded with the real values
            route.continue()
        })
        await page.goto(url.apiConduit);
        //we validate that the object have his real value since we continue after the intercept
        await expect(page.locator('[ng-bind="$ctrl.article.title"]').first()).toContainText('Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!')
    })
})