import { Page, expect } from '@playwright/test'

export default class LeftMenuIteration {
    readonly page: Page
    constructor(page: Page) {
        this.page = page;
    }
    async validatesElementsCategory() {
        const sections = ['Text Box', 'Check Box', 'Radio Button', 'Web Tables', 'Buttons', 'Links', 'Broken Links - Images', 'Upload and Download', 'Dynamic Properties'];
        const leftMenu = this.page.locator('li.btn.btn-light');
        for (let section = 0; section < sections.length; section++) {
            const menuText = await leftMenu.nth(section).textContent();
            if (menuText === sections[section]) {
                expect(menuText).toEqual(sections[section]);
                console.log(`Section item ${section + 1} matches: ${menuText}`);
            } else {
                console.log(`Section item ${section + 1} does not match: ${menuText}`);
                throw new Error(`Section ${menuText} is not on the list`)
            }
        }
        //will close the expanded menu
        const elementsCategory = await this.page.locator('span').filter({ hasText: 'Elements' }).locator('div').first()
        await elementsCategory.click()
    }


    async validatesFormCategory() {
        const section = 'Practice Form'
        const formCategory = await this.page.locator('span').filter({ hasText: 'Forms' }).locator('div').first()
        await formCategory.click()

        const sections = this.page.getByText('Practice Form')
        const sectionText = await sections.textContent()
        console.log(`The section from forrms is ${sectionText}`)
        expect(sectionText).toBe(section)
        await expect(this.page.getByText('Practice Form')).toBeVisible()

        await formCategory.click()
    }
}