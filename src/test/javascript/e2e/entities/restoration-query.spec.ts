import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('RestorationQuery e2e test', () => {

    let navBarPage: NavBarPage;
    let restorationQueryDialogPage: RestorationQueryDialogPage;
    let restorationQueryComponentsPage: RestorationQueryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RestorationQueries', () => {
        navBarPage.goToEntity('restoration-query');
        restorationQueryComponentsPage = new RestorationQueryComponentsPage();
        expect(restorationQueryComponentsPage.getTitle())
            .toMatch(/rptApp.restorationQuery.home.title/);

    });

    it('should load create RestorationQuery dialog', () => {
        restorationQueryComponentsPage.clickOnCreateButton();
        restorationQueryDialogPage = new RestorationQueryDialogPage();
        expect(restorationQueryDialogPage.getModalTitle())
            .toMatch(/rptApp.restorationQuery.home.createOrEditLabel/);
        restorationQueryDialogPage.close();
    });

    it('should create and save RestorationQueries', () => {
        restorationQueryComponentsPage.clickOnCreateButton();
        restorationQueryDialogPage.setMakeInput('make');
        expect(restorationQueryDialogPage.getMakeInput()).toMatch('make');
        restorationQueryDialogPage.setModelInput('model');
        expect(restorationQueryDialogPage.getModelInput()).toMatch('model');
        restorationQueryDialogPage.setVinInput('vin');
        expect(restorationQueryDialogPage.getVinInput()).toMatch('vin');
        restorationQueryDialogPage.setProductionDateInput('2000-12-31');
        expect(restorationQueryDialogPage.getProductionDateInput()).toMatch('2000-12-31');
        restorationQueryDialogPage.setDescriptionInput('description');
        expect(restorationQueryDialogPage.getDescriptionInput()).toMatch('description');
        restorationQueryDialogPage.customerSelectLastOption();
        restorationQueryDialogPage.save();
        expect(restorationQueryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RestorationQueryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-restoration-query div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RestorationQueryDialogPage {
    modalTitle = element(by.css('h4#myRestorationQueryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    makeInput = element(by.css('input#field_make'));
    modelInput = element(by.css('input#field_model'));
    vinInput = element(by.css('input#field_vin'));
    productionDateInput = element(by.css('input#field_productionDate'));
    descriptionInput = element(by.css('input#field_description'));
    customerSelect = element(by.css('select#field_customer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setMakeInput = function(make) {
        this.makeInput.sendKeys(make);
    };

    getMakeInput = function() {
        return this.makeInput.getAttribute('value');
    };

    setModelInput = function(model) {
        this.modelInput.sendKeys(model);
    };

    getModelInput = function() {
        return this.modelInput.getAttribute('value');
    };

    setVinInput = function(vin) {
        this.vinInput.sendKeys(vin);
    };

    getVinInput = function() {
        return this.vinInput.getAttribute('value');
    };

    setProductionDateInput = function(productionDate) {
        this.productionDateInput.sendKeys(productionDate);
    };

    getProductionDateInput = function() {
        return this.productionDateInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    customerSelectLastOption = function() {
        this.customerSelect.all(by.tagName('option')).last().click();
    };

    customerSelectOption = function(option) {
        this.customerSelect.sendKeys(option);
    };

    getCustomerSelect = function() {
        return this.customerSelect;
    };

    getCustomerSelectedOption = function() {
        return this.customerSelect.element(by.css('option:checked')).getText();
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
