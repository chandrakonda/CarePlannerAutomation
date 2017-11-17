import { element, by, browser, protractor } from 'protractor';

export class CarePlannerEditOccuranceSeriesPopup {
    elePopupHeader = element(by.xpath("//*[@id='Occurrencesries']/descendant::h4"));
    eleTaskNotes = element(by.xpath("//*[@id='Occurrencesries']/descendant::taskoccurance/descendant::textarea"));
    eleCompleteAndSave = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[contains(@class,'actions')]/button[contains(text(),'Complete') ]"));


    get isPopupDisplayed() {
        try {
            browser.logger.info("Check the Popup is displayed");
            return this.elePopupHeader.isDisplayed().then((value)=>{
                return value;
            });
        } catch (error) {
            browser.logger.info(error);
        }
    }

    EnterTaskNotes(notes: string){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleTaskNotes), 5000);
            this.eleTaskNotes.sendKeys(notes);
        } catch (error) {
            browser.logger.error(error);
        }
    }

    ClickOnCompleteAndSave(){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleCompleteAndSave), 5000);
            this.eleCompleteAndSave.click();

        } catch (error) {
            browser.logger.error(error);
        }
    }
}