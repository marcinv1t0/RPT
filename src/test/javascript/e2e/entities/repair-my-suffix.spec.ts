import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Repair e2e test', () => {

    let navBarPage: NavBarPage;
    let repairDialogPage: RepairDialogPage;
    let repairComponentsPage: RepairComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Repairs', () => {
        navBarPage.goToEntity('repair-my-suffix');
        repairComponentsPage = new RepairComponentsPage();
        expect(repairComponentsPage.getTitle())
            .toMatch(/rptApp.repair.home.title/);

    });

    it('should load create Repair dialog', () => {
        repairComponentsPage.clickOnCreateButton();
        repairDialogPage = new RepairDialogPage();
        expect(repairDialogPage.getModalTitle())
            .toMatch(/rptApp.repair.home.createOrEditLabel/);
        repairDialogPage.close();
    });

    it('should create and save Repairs', () => {
        repairComponentsPage.clickOnCreateButton();
        repairDialogPage.setNameInput('name');
        expect(repairDialogPage.getNameInput()).toMatch('name');
        repairDialogPage.setDescriptionInput('description');
        expect(repairDialogPage.getDescriptionInput()).toMatch('description');
        repairDialogPage.setCostInput('5');
        expect(repairDialogPage.getCostInput()).toMatch('5');
        repairDialogPage.setStartDateInput('2000-12-31');
        expect(repairDialogPage.getStartDateInput()).toMatch('2000-12-31');
        repairDialogPage.setFinishDateInput('2000-12-31');
        expect(repairDialogPage.getFinishDateInput()).toMatch('2000-12-31');
        repairDialogPage.restorationSelectLastOption();
        repairDialogPage.save();
        expect(repairDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RepairComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-repair-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RepairDialogPage {
    modalTitle = element(by.css('h4#myRepairLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    costInput = element(by.css('input#field_cost'));
    startDateInput = element(by.css('input#field_startDate'));
    finishDateInput = element(by.css('input#field_finishDate'));
    restorationSelect = element(by.css('select#field_restoration'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setCostInput = function(cost) {
        this.costInput.sendKeys(cost);
    };

    getCostInput = function() {
        return this.costInput.getAttribute('value');
    };

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    };

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    };

    setFinishDateInput = function(finishDate) {
        this.finishDateInput.sendKeys(finishDate);
    };

    getFinishDateInput = function() {
        return this.finishDateInput.getAttribute('value');
    };

    restorationSelectLastOption = function() {
        this.restorationSelect.all(by.tagName('option')).last().click();
    };

    restorationSelectOption = function(option) {
        this.restorationSelect.sendKeys(option);
    };

    getRestorationSelect = function() {
        return this.restorationSelect;
    };

    getRestorationSelectedOption = function() {
        return this.restorationSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
