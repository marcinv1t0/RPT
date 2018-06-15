import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Photo e2e test', () => {

    let navBarPage: NavBarPage;
    let photoDialogPage: PhotoDialogPage;
    let photoComponentsPage: PhotoComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Photos', () => {
        navBarPage.goToEntity('photo');
        photoComponentsPage = new PhotoComponentsPage();
        expect(photoComponentsPage.getTitle())
            .toMatch(/rptApp.photo.home.title/);

    });

    it('should load create Photo dialog', () => {
        photoComponentsPage.clickOnCreateButton();
        photoDialogPage = new PhotoDialogPage();
        expect(photoDialogPage.getModalTitle())
            .toMatch(/rptApp.photo.home.createOrEditLabel/);
        photoDialogPage.close();
    });

    it('should create and save Photos', () => {
        photoComponentsPage.clickOnCreateButton();
        photoDialogPage.setSinglePhotoInput(absolutePath);
        photoDialogPage.setDescriptionInput('description');
        expect(photoDialogPage.getDescriptionInput()).toMatch('description');
        photoDialogPage.setPhotoDateInput('2000-12-31');
        expect(photoDialogPage.getPhotoDateInput()).toMatch('2000-12-31');
        photoDialogPage.carSelectLastOption();
        photoDialogPage.repairSelectLastOption();
        photoDialogPage.save();
        expect(photoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PhotoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-photo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PhotoDialogPage {
    modalTitle = element(by.css('h4#myPhotoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    singlePhotoInput = element(by.css('input#file_singlePhoto'));
    descriptionInput = element(by.css('input#field_description'));
    photoDateInput = element(by.css('input#field_photoDate'));
    carSelect = element(by.css('select#field_car'));
    repairSelect = element(by.css('select#field_repair'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSinglePhotoInput = function(singlePhoto) {
        this.singlePhotoInput.sendKeys(singlePhoto);
    };

    getSinglePhotoInput = function() {
        return this.singlePhotoInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setPhotoDateInput = function(photoDate) {
        this.photoDateInput.sendKeys(photoDate);
    };

    getPhotoDateInput = function() {
        return this.photoDateInput.getAttribute('value');
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
