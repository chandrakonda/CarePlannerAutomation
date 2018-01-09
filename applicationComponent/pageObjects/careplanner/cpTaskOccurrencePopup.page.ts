import { LogHelper } from '../../../frameworkComponent';
import { element, by, browser, protractor, ExpectedConditions } from 'protractor';


export class CareplannerTaskOcurrencePopup {

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
            LogHelper.Logger.info("Check the Popup is displayed");
            return this.elePopupHeader.isPresent().then((value)=>{
                return value;
            });
        } catch (error) {
            LogHelper.Logger.info(error);
        }
    }

    enterAmountToConfirm(amountToAdministerValue){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(this.eleAmountToConfirm), 3000);
            this.eleAmountToConfirm.isPresent().then(() => {
                LogHelper.Logger.info("Task notes entered as : " + amountToAdministerValue);
                this.eleAmountToConfirm.sendKeys(amountToAdministerValue);
            }); 
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    fillAmountToConfirm(){
        try {
            let amountFieldStatus = this.eleAmountToConfirm.isEnabled;
            LogHelper.Logger.info("Amout to Administer text field is : " + amountFieldStatus);
            if(amountFieldStatus){
                let amount = this.amountToAdminister.then((value) => {return value});
                this.enterAmountToConfirm(amount);
            }
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    get instructions(){
        try {
            let occurrenceInstruction = this.eleInstructions.getText().then((value) => { return value;})
            LogHelper.Logger.info("Occurrence Instructions Displayed as : '" + occurrenceInstruction + "'");
            return occurrenceInstruction;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    get productFullName(){
        try {
            let productName = this.eleProduct.getText().then((value) => { return value;})
            LogHelper.Logger.info("Product Full Name Displayed as : '" + productName + "'");
            return productName;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    get doseValue(){
        try {
            let doseValue = this.eleDose.getText().then((value) => { return value;})
            LogHelper.Logger.info("Dose Value Displayed as : '" + doseValue + "'");
            return doseValue;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    get amountToAdminister(){
        try {
            let amountToAdminister = this.eleAmountToAdminister.getText().then((value) => { return value;})
            LogHelper.Logger.info("Amount TO Administer Value Displayed as : '" + amountToAdminister + "'");
            return amountToAdminister;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    enterTaskNotes(taskNotes: string){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(this.eleTaskNotes), 3000);
            this.eleTaskNotes.isPresent().then(() => {
                LogHelper.Logger.info("Task notes entered as : " + taskNotes);
                this.eleTaskNotes.sendKeys(taskNotes);
            }); 
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    clickOnClose(){
        try {
            LogHelper.Logger.info("Click on 'Close' button");
            this.eleCloseButton.click();
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    clickOnSave(){
        try {
            LogHelper.Logger.info("Click on 'Save' button");
            this.eleSaveButton.click();
            browser.sleep(2000);
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    clickOnCompleteAndSave(){
        try {
            LogHelper.Logger.info("Click on 'Complete and Save' button");
            this.eleCompleteAndSaveButton.click();
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    selectStatusInToggleButton(statusName:string){
        try {
            switch (statusName.toLowerCase()) {
                case 'planned':
                    this.eleToggleStatusPlanned.click();
                    LogHelper.Logger.info("'Planned' tab has been selected for the task occurrence");
                    break;
                case 'completed':
                    this.eleToggleStatusCompleted.click();
                    LogHelper.Logger.info("'Completed' tab has been selected for the task occurrence");
                    break;
                case 'skipped':
                    this.eleToggleStatusSkipped.click();
                    LogHelper.Logger.info("'Skipped' tab has been selected for the task occurrence");
                    break;
                case 'canceled':
                    this.eleToggleStatusCanceled.click();
                    LogHelper.Logger.info("'Canceled' tab has been selected for the task occurrence");
                    break;
                default:
                    break;
            }
            browser.sleep(1500);
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    enterScheduledTime(time){
        try {
            this.eleScheduleTime.clear().then(() => {
                this.eleScheduleTime.sendKeys(time);
                LogHelper.Logger.info("Occurrence scheduled time entered as : " + time);
            });
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    get getScheduledTime(){
        try {
            let scheduledTime =  this.eleScheduleTime.getAttribute('value').then((value)=> {return value;});
            return scheduledTime;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    selectScheduledDate(){
        try {            
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleScheduledDateDropDown));
            this.eleScheduledDateDropDown.click();
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    enterCompletedTime(time){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleCompletedTime), 3000);
            this.eleCompletedTime.clear().then(() => {
                this.eleCompletedTime.sendKeys(time);
                LogHelper.Logger.info("Occurrence completed time entered as : " + time);
            });
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
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
            LogHelper.Logger.error(error);
        }
    }

    updateOccurrenceDetails(status:string, taskNotes:string, time?){
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
                        break;
                    case "planned":
                    case "rescheduled":
                        this.enterTaskNotes(taskNotes)
                            .selectStatusInToggleButton(status)
                            .enterScheduledTime(time)
                            .selectScheduledDate()
                            .clickOnSave(); 
                        break;
                    default:
                        break;
                }
                browser.sleep(1000);
            }
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }
   
}