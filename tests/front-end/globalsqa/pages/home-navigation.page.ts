import { Page, expect } from '@playwright/test'
import url from '../../../../global/urls'

export default class HomePage {
    private readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async expectUrl() {
        await expect(this.page).toHaveURL(url.globalsqa)
    }



}