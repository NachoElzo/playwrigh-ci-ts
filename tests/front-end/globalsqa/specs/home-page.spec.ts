import { test } from '@playwright/test'
import HomePage from '../pages/home-navigation.page.ts'
import url from '../../../../global/urls'

test.beforeEach('', async ({ page }) => {
    await page.goto(url.globalsqa)
})

test.describe('Given', async () => {

    test.describe('When', async () => {


    })

    test('Then', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.expectUrl()
    })


})
