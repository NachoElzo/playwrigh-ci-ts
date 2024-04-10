import { test, expect } from '@playwright/test'
import url from '../../../../global/urls'

//between shorter the spec name, shorter will be the file name
test('Validates logo', async ({ page }) => {
    await page.goto(url.uiDemoqa)
    await expect(page).toHaveURL(url.uiDemoqa)
    const logo = page.getByRole('banner').getByRole('link')
    await expect(logo).toBeVisible()
    //will create a folder in the same root than the spec file with a png file
    //The validation can avoid 150 px of difference
    await expect(logo).toHaveScreenshot({ maxDiffPixels: 150 })
    //example on how we can can validate all the web page/you can change maxDiffPixels property
    //await expect(page).toHaveScreenshot({ maxDiffPixels: 150 })

})
//update images if we have a big changes in the UI
//npx playwright test --update-snapshots
//for one test 
//npx playwright test --grep "When: A user compares a change in the UI" --update-snapshots
//for folder
//npx playwright test --grep "folderName" --update-snapshots

