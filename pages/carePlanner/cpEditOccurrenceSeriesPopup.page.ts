import { element, by, browser, protractor, ExpectedConditions } from 'protractor';

export class CarePlannerEditOccuranceSeriesPopup {

    elePopupHeader = element(by.xpath("//*[@id='Occurrencesries']/descendant::h4"));
    
    eleScheduleTime = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[./div[contains(text(),'Scheduled time')]]/following-sibling::div/descendant::input[1]"));
    eleScheduledDateDropDown = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[./div[contains(text(),'Scheduled time')]]/following-sibling::div/descendant::sui-select"));

    eleToggleStatusPlanned = element(by.xpath("//*[@id='Occurrencesries']/descendant::label[text()='Planned']"));
    eleToggleStatusCompleted = element(by.xpath("//*[@id='Occurrencesries']/descendant::label[text()='Completed']"));
    eleToggleStatusSkipped = element(by.xpath("//*[@id='Occurrencesries']/descendant::label[text()='Skipped']"));
    eleToggleStatusCanceled = element(by.xpath("//*[@id='Occurrencesries']/descendant::label[text()='Canceled']"));

    eleCompletedTime = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[./div[contains(text(),'Completed time')]]/following-sibling::div/descendant::input[1]"));
    eleCompletedDateDropDown = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[./div[contains(text(),'Completed time')]]/following-sibling::div/descendant::sui-select"));
    eleCompletedDateDropDownContent = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[./div[contains(text(),'Completed time')]]/following-sibling::div/descendant::sui-select-option/span[2]"));
    eleCompleteDateDropDownList = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[./div[contains(text(),'Completed time')]]/following-sibling::div/descendant::div[contains(@class,'menu transition visible')]"));

    eleInstructions = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[preceding-sibling::div/div[text()='Instructions']]/div"));
    eleProduct = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[preceding-sibling::div/div[text()='Product']]/div"));
    eleDose = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[preceding-sibling::div/div[text()='Dose']]/div/span"));
    eleAmountToAdminister = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[preceding-sibling::div/div[text()='Amount to administer']]/div/span"));
    eleAmountToConfirm = element(by.xpath("//*[@id='Occurrencesries']/descendant::div/input[@placeholder='Amount to administer']"));

    eleTaskNotes = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[preceding-sibling::div/div[text()='Task notes']]/textarea"));
    eleCompleteAndSaveButton = element(by.xpath("//*[@id='Occurrencesries']/descendant::button[text()='Complete & Save']"));
    eleSaveButton = element(by.xpath("//*[@id='Occurrencesries']/descendant::button[text()='Save']"));
    eleCloseButton = element(by.xpath("//*[@id='Occurrencesries']/descendant::button[text()='Close']"))

    eleCloseIcon = element(by.xpath("//*[@id='Occurrencesries']/descendant::div[contains(@class,'closeButton')]"));

    get isPopupDisplayed() {
        try {
            browser.logger.info("Check the Popup is displayed");
            return this.elePopupHeader.isPresent().then((value)=>{
                return value;
            });
        } catch (error) {
            browser.logger.info(error);
        }
    }

    enterAmountToConfirm(amountToAdministerValue){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(this.eleAmountToConfirm), 3000);
            this.eleAmountToConfirm.isPresent().then(() => {
                browser.logger.info("Task notes entered as : " + amountToAdministerValue);
                this.eleAmountToConfirm.sendKeys(amountToAdministerValue);
            }); 
        } catch (error) {
            browser.logger.error(error);
        }
    }

    fillAmountToConfirm(){
        try {
            let amountFieldStatus = this.eleAmountToConfirm.isEnabled;
            browser.logger.info("Amout to Administer text field is : " + amountFieldStatus);
            if(amountFieldStatus){
                let amount = this.amountToAdminister.then((value) => {return value});
                this.enterAmountToConfirm(amount);
            }
            return this;
        } catch (error) {
            browser.logger.error(error);
        }
    }

    get instructions(){
        try {
            let occurrenceInstruction = this.eleInstructions.getText().then((value) => { return value;})
            browser.logger.info("Occurrence Instructions Displayed as : '" + occurrenceInstruction + "'");
            return occurrenceInstruction;
        } catch (error) {
            browser.logger.error(error);
        }
    }

    get productFullName(){
        try {
            let productName = this.eleProduct.getText().then((value) => { return value;})
            browser.logger.info("Product Full Name Displayed as : '" + productName + "'");
            return productName;
        } catch (error) {
            browser.logger.error(error);
        }
    }

    get doseValue(){
        try {
            let doseValue = this.eleDose.getText().then((value) => { return value;})
            browser.logger.info("Dose Value Displayed as : '" + doseValue + "'");
            return doseValue;
        } catch (error) {
            browser.logger.error(error);
        }
    }

    get amountToAdminister(){
        try {
            let amountToAdminister = this.eleAmountToAdminister.getText().then((value) => { return value;})
            browser.logger.info("Amount TO Administer Value Displayed as : '" + amountToAdminister + "'");
            return amountToAdminister;
        } catch (error) {
            browser.logger.error(error);
        }
    }

    enterTaskNotes(taskNotes: string){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(this.eleTaskNotes), 3000);
            this.eleTaskNotes.isPresent().then(() => {
                browser.logger.info("Task notes entered as : " + taskNotes);
                this.eleTaskNotes.sendKeys(taskNotes);
            }); 
            return this;
        } catch (error) {
            browser.logger.error(error);
        }
    }

    clickOnClose(){
        try {
            browser.logger.info("Click on 'Close' button");
            this.eleCloseButton.click();
        } catch (error) {
            browser.logger.error(error);
        }
    }

    clickOnSave(){
        try {
            browser.logger.info("Click on 'Save' button");
            this.eleSaveButton.click();
            browser.sleep(2000);
        } catch (error) {
            browser.logger.error(error);
        }
    }

    clickOnCompleteAndSave(){
        try {
            browser.logger.info("Click on 'Complete and Save' button");
            this.eleCompleteAndSaveButton.click();
        } catch (error) {
            browser.logger.error(error);
        }
    }

    selectStatusInToggleButton(statusName:string){
        try {
            switch (statusName.toLowerCase()) {
                case 'planned':
                    this.eleToggleStatusPlanned.click();
                    browser.logger.info("'Planned' tab has been selected for the task occurrence");
                    break;
                case 'completed':
                    this.eleToggleStatusCompleted.click();
                    browser.logger.info("'Completed' tab has been selected for the task occurrence");
                    break;
                case 'skipped':
                    this.eleToggleStatusSkipped.click();
                    browser.logger.info("'Skipped' tab has been selected for the task occurrence");
                    break;
                case 'canceled':
                    this.eleToggleStatusCanceled.click();
                    browser.logger.info("'Canceled' tab has been selected for the task occurrence");
                    break;
                default:
                    break;
            }
            browser.sleep(1500);
            return this;
        } catch (error) {
            browser.logger.error(error);
        }
    }

    enterScheduledTime(time:string){
        try {
            this.eleScheduleTime.clear().then(() => {
                this.eleScheduleTime.sendKeys(time);
                browser.logger.info("Occurrence scheduled time entered as : " + time);
            });
        } catch (error) {
            browser.logger.error(error);
        }
    }

    get getScheduledTime(){
        try {
            let scheduledTime =  this.eleScheduleTime.getAttribute('value').then((value)=> {return value;});
            return scheduledTime;
        } catch (error) {
            browser.logger.error(error);
        }
    }

    selectScheduledDate(){
        try {            
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleScheduledDateDropDown));
            this.eleScheduledDateDropDown.click();
        } catch (error) {
            browser.logger.error(error);
        }
    }

    enterCompletedTime(time){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleCompletedTime), 3000);
            this.eleCompletedTime.clear().then(() => {
                this.eleCompletedTime.sendKeys(time);
                browser.logger.info("Occurrence completed time entered as : " + time);
            });
            return this;
        } catch (error) {
            browser.logger.error(error);
        }
    }

    selectCompletedDate(){
        try {            
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleCompletedDateDropDown));
            this.eleCompletedDateDropDown.click();
            browser.wait(EC.visibilityOf(this.eleCompleteDateDropDownList), 5000);
            var date = this.eleCompletedDateDropDownContent.getText().then((value) => {return value});
            this.eleCompletedDateDropDownContent.click();
            return this;
        } catch (error) {
            browser.logger.error(error);
        }
    }

    updateOccurrenceDetails(status:string, taskNotes:string, completedTime?:string){
        try {
            if(this.isPopupDisplayed){
                browser.sleep(1000);
                switch (status.toLowerCase()) {
                    case "completed":
                        this.enterTaskNotes(taskNotes)
                            .selectStatusInToggleButton(status)
                            .enterCompletedTime(this.getScheduledTime)
                            .selectCompletedDate()
                            .clickOnSave();                        
                        break;
                    case "skipped":
                        this.enterTaskNotes(taskNotes)
                            .selectStatusInToggleButton(status)
                            .clickOnSave();
                        break;
                    case "canceled":
                            this.enterTaskNotes(taskNotes)
                            .selectStatusInToggleButton(status)
                            .clickOnSave();
                    default:
                        break;
                }
                browser.sleep(1000);
            }
        } catch (error) {
            browser.logger.error(error);
        }
    }
}