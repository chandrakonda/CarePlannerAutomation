import { $, browser, element, by, By, ExpectedConditions } from "protractor";

export class CareNoteDialog {
    //Page Elements
    careNoteDialogButton = element(by.xpath("//button[contains(@id,'carenotes')]"));
    public careNoteDialogHeader = element(by.xpath("//wj-popup[@id='carenotes']//div[contains(@class,'text')]"));
    careNoteHeaderClose = element(by.xpath("//wj-popup[@id='carenotes']//div[@class='icon closeButton']"));    
    public careNotetextArea = element(by.xpath("//wj-popup[@id='carenotes']//textarea"));
    addCareNoteButton = element(by.xpath("//wj-popup[@id='carenotes']//button[contains(text(),'Add care note')]"));
    closeCancelButton = element(by.xpath("//wj-popup[@id='carenotes']//button[contains(text(),'Close') or contains(text(), 'Cancel')]"));
    firstCareNote = element(by.xpath("//wj-popup[@id='carenotes']//div[@class='carenote-scrolling menu']//div[@class='care-description'][1]"));

    //Page methods
    openCareNoteDialog() {
        this.careNoteDialogButton.click();
    }

    closeCareNoteDialogXButton() {
        this.careNoteHeaderClose.click();
    }

    enterCareNoteText(text) {
        try {
            this.careNotetextArea.sendKeys(text);
        } catch (error) {
            browser.logger.error(error);
        }
    }

    clickAddCareNoteButton() {
        this.addCareNoteButton.click();
    }

    get getCareNoteText(): any {
        try {
            return this.careNotetextArea.getText();
        } catch (error) {
            browser.logger.error(error);
        }        
    }

    get careNoteHeader(): any {
        try {
            return this.careNoteDialogHeader.getText();
        } catch (error) {
            browser.logger.error(error);
        }
    }

    get getTextOfFirstCareNote(): any {
        try {
            return this.firstCareNote.getText();
        } catch (error) {
            browser.logger.error(error);
        }        
    }
    
}