import { expect, test } from '@playwright/test'
import url from '../../../../urls.ts'
import tags from '../../api-data/mock-home-tags.json'


test.describe('Given a user that aborts styles calls in the home page', async () => {
    //for this type of request you need to import the context in the beforeeach (isolated instace of a browser)
    test.beforeEach('', async ({ context }) => {
        //route method works for modify requets, abort will abort the specified responses (png,jpg,jpeg,css)
        await context.route('**/*.{png,jpg,jpeg,css}', route => route.abort());
    });
    test('Then user will see home page without styles', async ({ page }) => {
        await page.goto(url.apiConduit)
    })
})

test.describe('Given a user that mock the data of an api response', async () => {
    test('Then the user will be able to see the data modified in the ui', async ({ page }) => {
        await page.route('**/api/tags', async route => {
            await route.fulfill({
                //fill the response as JSON with the file inside api-data folder
                body: JSON.stringify(tags)
            })
        })
        //you will see the web page with the changes in the response
        await page.goto(url.apiConduit);
    })
});

test.describe('Given a user that mock the request status code', async () => {
    test('Then the user will see an error', async ({ page }) => {
        //set status code 400 to the response
        await page.route('**/api/tags', route => route.fulfill({
            status: 400,
            body: 'Bad Request'
        }));
        await page.goto(url.apiConduit);
        //as the response is 400, tags should not be loaded and visible
        await expect(page.getByText('Loading tags...')).toBeVisible()
    });
});

test.describe('Given a user that mock the data of an api response to an specific value', async () => {
    test('Then the user will see the title and desctiption', async ({ page }) => {
        await page.route('**/api/articles*', async route => {
            //fecth method works for get the response before changing the values of the response
            const response = await route.fetch()
            const responseBody = await response.json()
            responseBody.articles[0].title = 'THIS IS THE NEW TITLE'
            responseBody.articles[0].description = 'THIS IS THE NEW DESCRIPTION'
            //will fill the response with the new title and description after the change
            await route.fulfill({
                body: JSON.stringify(responseBody)
            })
        })
        //navigates to the home page and asserts that title and description of the first article changed
        await page.goto(url.apiConduit);
        await expect(page.locator('.navbar-brand')).toHaveText('conduit')
        await expect(page.locator('[ng-bind="$ctrl.article.title"]').first()).toContainText('THIS IS THE NEW TITLE')
        await expect(page.locator('[ng-bind="$ctrl.article.description"]').first()).toContainText('THIS IS THE NEW DESCRIPTION')
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
//we can expect that the captured response have the value passed in the url
//expect(responseBody.articles[0].title).toBe('valuePassedIntheUrl')

test.describe('Given a user that intercepts api response and post with empty object then continue', async () => {
    test('The user will get a response and asse', async ({ page }) => {
        await page.goto(url.apiConduit);
        await page.route('**/api/articles*', async route => {
            //parse the response to an empty object
            const responseBody = JSON.parse(route.request().postData() || '{}');
            //with route.continue the response will be reloaded with his real values
            route.continue()
        })
        await page.goto(url.apiConduit);
        //we validate that the object have his real value since we continue after the intercept
        await expect(page.locator('[ng-bind="$ctrl.article.title"]').first()).toContainText('Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!')
    })
})

