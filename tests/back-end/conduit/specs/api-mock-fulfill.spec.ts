import { expect, test } from '@playwright/test'
import url from '../../../../global/urls'
import tags from '../../data/mock-home-tags.json'


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
        //will validate that the element with the tag added is visible
        await expect(page.getByText('En_Español')).toBeVisible()
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

test.describe('Given a user that mock values of the object response', async () => {
    test('Then the user will see the title and desctiption modified', async ({ page }) => {
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
