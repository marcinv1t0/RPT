import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Restoration e2e test', () => {

    let navBarPage: NavBarPage;
    let restorationDialogPage: RestorationDialogPage;
    let restorationComponentsPage: RestorationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Restorations', () => {
        navBarPage.goToEntity('restoration-my-suffix');
        restorationComponentsPage = new RestorationComponentsPage();
        expect(restorationComponentsPage.getTitle())
            .toMatch(/rptApp.restoration.home.title/);

    });

    it('should load create Restoration dialog', () => {
        restorationComponentsPage.clickOnCreateButton();
        restorationDialogPage = new RestorationDialogPage();
        expect(restorationDialogPage.getModalTitle())
            .toMatch(/rptApp.restoration.home.createOrEditLabel/);
        restorationDialogPage.close();
    });

    it('should create and save Restorations', () => {
        restorationComponentsPage.clickOnCreateButton();
        restorationDialogPage.setStartDateInput('2000-12-31');
        expect(restorationDialogPage.getStartDateInput()).toMatch('2000-12-31');
        restorationDialogPage.setFinishDateInput('2000-12-31');
        expect(restorationDialogPage.getFinishDateInput()).toMatch('2000-12-31');
        restorationDialogPage.setCostInput('5');
        expect(restorationDialogPage.getCostInput()).toMatch('5');
        restorationDialogPage.carSelectLastOption();
        restorationDialogPage.save();
        expect(restorationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RestorationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-restoration-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RestorationDialogPage {
    modalTitle = element(by.css('h4#myRestorationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    startDateInput = element(by.css('input#field_startDate'));
    finishDateInput = element(by.css('input#field_finishDate'));
    costInput = element(by.css('input#field_cost'));
    carSelect = element(by.css('select#field_car'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

    setCostInput = function(cost) {
        this.costInput.sendKeys(cost);
    };

    getCostInput = function() {
        return this.costInput.getAttribute('value');
    };

    carSelectLastOption = function() {
        this.carSelect.all(by.tagName('option')).last().click();
    };

    carSelectOption = function(option) {
        this.carSelect.sendKeys(option);
    };

    getCarSelect = function() {
        return this.carSelect;
    };

    getCarSelectedOption = function() {
        return this.carSelect.element(by.css('option:checked')).getText();
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
