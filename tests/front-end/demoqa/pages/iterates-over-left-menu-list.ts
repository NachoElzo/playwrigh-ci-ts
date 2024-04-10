import { Page, expect } from '@playwright/test'

export default class LeftMenuIteration {
    readonly page: Page
    constructor(page: Page) {
        this.page = page;
    }
    async validatesLeftMenuSections() {
        const sections = ['Text Box', 'Check Box', 'Radio Button', 'Web Tables', 'Buttons', 'Links', 'Broken Links - Images', 'Upload and Download', 'Dynamic Properties'];
        const leftMenu = this.page.locator('li.btn.btn-light');
        for (let menu = 0; menu < sections.length; menu++) {
            const menuText = await leftMenu.nth(menu).textContent();
            if (menuText === sections[menu]) {
                expect(menuText).toEqual(sections[menu]);
                console.log(`Section item ${menu + 1} matches: ${menuText}`);
            } else {
                console.log(`Section item ${menu + 1} does not match: ${menuText}`);
                throw new Error(`Section ${menuText} is not on the list`)
            }
        }
    }
}