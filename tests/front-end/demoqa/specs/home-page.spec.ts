import { test } from '@playwright/test'
import LeftMenuIteration from '../pages/iterates-over-left-menu-list'
import url from '../../../../global/urls'

test.describe('Given a user that lands in the Home page', () => {
    test('Then he will validate left menu section names', async ({ page }) => {
        await page.goto(url.uiDemoqa)
        const leftMenu = new LeftMenuIteration(page)
        await leftMenu.validatesLeftMenuSections()
        await page.pause()
    })
})
