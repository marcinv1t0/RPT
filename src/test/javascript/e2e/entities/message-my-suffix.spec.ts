import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Message e2e test', () => {

    let navBarPage: NavBarPage;
    let messageDialogPage: MessageDialogPage;
    let messageComponentsPage: MessageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Messages', () => {
        navBarPage.goToEntity('message-my-suffix');
        messageComponentsPage = new MessageComponentsPage();
        expect(messageComponentsPage.getTitle())
            .toMatch(/rptApp.message.home.title/);

    });

    it('should load create Message dialog', () => {
        messageComponentsPage.clickOnCreateButton();
        messageDialogPage = new MessageDialogPage();
        expect(messageDialogPage.getModalTitle())
            .toMatch(/rptApp.message.home.createOrEditLabel/);
        messageDialogPage.close();
    });

    it('should create and save Messages', () => {
        messageComponentsPage.clickOnCreateButton();
        messageDialogPage.setTopicInput('topic');
        expect(messageDialogPage.getTopicInput()).toMatch('topic');
        messageDialogPage.setTextInput('text');
        expect(messageDialogPage.getTextInput()).toMatch('text');
        messageDialogPage.getReadInput().isSelected().then((selected) => {
            if (selected) {
                messageDialogPage.getReadInput().click();
                expect(messageDialogPage.getReadInput().isSelected()).toBeFalsy();
            } else {
                messageDialogPage.getReadInput().click();
                expect(messageDialogPage.getReadInput().isSelected()).toBeTruthy();
            }
        });
        messageDialogPage.setCreationDateInput('2000-12-31');
        expect(messageDialogPage.getCreationDateInput()).toMatch('2000-12-31');
        messageDialogPage.senderSelectLastOption();
        messageDialogPage.save();
        expect(messageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MessageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-message-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MessageDialogPage {
    modalTitle = element(by.css('h4#myMessageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    topicInput = element(by.css('input#field_topic'));
    textInput = element(by.css('input#field_text'));
    readInput = element(by.css('input#field_read'));
    creationDateInput = element(by.css('input#field_creationDate'));
    senderSelect = element(by.css('select#field_sender'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTopicInput = function(topic) {
        this.topicInput.sendKeys(topic);
    };

    getTopicInput = function() {
        return this.topicInput.getAttribute('value');
    };

    setTextInput = function(text) {
        this.textInput.sendKeys(text);
    };

    getTextInput = function() {
        return this.textInput.getAttribute('value');
    };

    getReadInput = function() {
        return this.readInput;
    };
    setCreationDateInput = function(creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    };

    getCreationDateInput = function() {
        return this.creationDateInput.getAttribute('value');
    };

    senderSelectLastOption = function() {
        this.senderSelect.all(by.tagName('option')).last().click();
    };

    senderSelectOption = function(option) {
        this.senderSelect.sendKeys(option);
    };

    getSenderSelect = function() {
        return this.senderSelect;
    };

    getSenderSelectedOption = function() {
        return this.senderSelect.element(by.css('option:checked')).getText();
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
