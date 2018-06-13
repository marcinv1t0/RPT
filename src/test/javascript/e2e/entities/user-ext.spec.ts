import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('UserExt e2e test', () => {

    let navBarPage: NavBarPage;
    let userExtDialogPage: UserExtDialogPage;
    let userExtComponentsPage: UserExtComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserExts', () => {
        navBarPage.goToEntity('user-ext');
        userExtComponentsPage = new UserExtComponentsPage();
        expect(userExtComponentsPage.getTitle())
            .toMatch(/rptApp.userExt.home.title/);

    });

    it('should load create UserExt dialog', () => {
        userExtComponentsPage.clickOnCreateButton();
        userExtDialogPage = new UserExtDialogPage();
        expect(userExtDialogPage.getModalTitle())
            .toMatch(/rptApp.userExt.home.createOrEditLabel/);
        userExtDialogPage.close();
    });

    it('should create and save UserExts', () => {
        userExtComponentsPage.clickOnCreateButton();
        userExtDialogPage.setPhoneNumberInput('phoneNumber');
        expect(userExtDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        userExtDialogPage.acountTypeSelectLastOption();
        userExtDialogPage.userSelectLastOption();
        userExtDialogPage.save();
        expect(userExtDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UserExtComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-user-ext div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserExtDialogPage {
    modalTitle = element(by.css('h4#myUserExtLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    acountTypeSelect = element(by.css('select#field_acountType'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPhoneNumberInput = function(phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    };

    getPhoneNumberInput = function() {
        return this.phoneNumberInput.getAttribute('value');
    };

    setAcountTypeSelect = function(acountType) {
        this.acountTypeSelect.sendKeys(acountType);
    };

    getAcountTypeSelect = function() {
        return this.acountTypeSelect.element(by.css('option:checked')).getText();
    };

    acountTypeSelectLastOption = function() {
        this.acountTypeSelect.all(by.tagName('option')).last().click();
    };
    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
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
