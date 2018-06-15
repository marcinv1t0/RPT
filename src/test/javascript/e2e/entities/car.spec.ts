import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Car e2e test', () => {

    let navBarPage: NavBarPage;
    let carDialogPage: CarDialogPage;
    let carComponentsPage: CarComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cars', () => {
        navBarPage.goToEntity('car');
        carComponentsPage = new CarComponentsPage();
        expect(carComponentsPage.getTitle())
            .toMatch(/rptApp.car.home.title/);

    });

    it('should load create Car dialog', () => {
        carComponentsPage.clickOnCreateButton();
        carDialogPage = new CarDialogPage();
        expect(carDialogPage.getModalTitle())
            .toMatch(/rptApp.car.home.createOrEditLabel/);
        carDialogPage.close();
    });

    it('should create and save Cars', () => {
        carComponentsPage.clickOnCreateButton();
        carDialogPage.setMakeInput('make');
        expect(carDialogPage.getMakeInput()).toMatch('make');
        carDialogPage.setModelInput('model');
        expect(carDialogPage.getModelInput()).toMatch('model');
        carDialogPage.setVinInput('vin');
        expect(carDialogPage.getVinInput()).toMatch('vin');
        carDialogPage.setProductionDateInput('2000-12-31');
        expect(carDialogPage.getProductionDateInput()).toMatch('2000-12-31');
        carDialogPage.setColorInput('color');
        expect(carDialogPage.getColorInput()).toMatch('color');
        carDialogPage.ownerSelectLastOption();
        carDialogPage.save();
        expect(carDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CarComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-car div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CarDialogPage {
    modalTitle = element(by.css('h4#myCarLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    makeInput = element(by.css('input#field_make'));
    modelInput = element(by.css('input#field_model'));
    vinInput = element(by.css('input#field_vin'));
    productionDateInput = element(by.css('input#field_productionDate'));
    colorInput = element(by.css('input#field_color'));
    ownerSelect = element(by.css('select#field_owner'));

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

    setColorInput = function(color) {
        this.colorInput.sendKeys(color);
    };

    getColorInput = function() {
        return this.colorInput.getAttribute('value');
    };

    ownerSelectLastOption = function() {
        this.ownerSelect.all(by.tagName('option')).last().click();
    };

    ownerSelectOption = function(option) {
        this.ownerSelect.sendKeys(option);
    };

    getOwnerSelect = function() {
        return this.ownerSelect;
    };

    getOwnerSelectedOption = function() {
        return this.ownerSelect.element(by.css('option:checked')).getText();
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
