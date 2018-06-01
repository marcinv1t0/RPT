import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SubTask e2e test', () => {

    let navBarPage: NavBarPage;
    let subTaskDialogPage: SubTaskDialogPage;
    let subTaskComponentsPage: SubTaskComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SubTasks', () => {
        navBarPage.goToEntity('sub-task-my-suffix');
        subTaskComponentsPage = new SubTaskComponentsPage();
        expect(subTaskComponentsPage.getTitle())
            .toMatch(/rptApp.subTask.home.title/);

    });

    it('should load create SubTask dialog', () => {
        subTaskComponentsPage.clickOnCreateButton();
        subTaskDialogPage = new SubTaskDialogPage();
        expect(subTaskDialogPage.getModalTitle())
            .toMatch(/rptApp.subTask.home.createOrEditLabel/);
        subTaskDialogPage.close();
    });

    it('should create and save SubTasks', () => {
        subTaskComponentsPage.clickOnCreateButton();
        subTaskDialogPage.setNameInput('name');
        expect(subTaskDialogPage.getNameInput()).toMatch('name');
        subTaskDialogPage.setDescriptionInput('description');
        expect(subTaskDialogPage.getDescriptionInput()).toMatch('description');
        subTaskDialogPage.repairSelectLastOption();
        subTaskDialogPage.save();
        expect(subTaskDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SubTaskComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-sub-task-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SubTaskDialogPage {
    modalTitle = element(by.css('h4#mySubTaskLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    repairSelect = element(by.css('select#field_repair'));

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

    repairSelectLastOption = function() {
        this.repairSelect.all(by.tagName('option')).last().click();
    };

    repairSelectOption = function(option) {
        this.repairSelect.sendKeys(option);
    };

    getRepairSelect = function() {
        return this.repairSelect;
    };

    getRepairSelectedOption = function() {
        return this.repairSelect.element(by.css('option:checked')).getText();
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
