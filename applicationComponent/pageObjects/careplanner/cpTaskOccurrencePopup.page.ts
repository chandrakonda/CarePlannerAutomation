import { FrameworkComponent } from '../../../frameworkComponent';
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

    eleTaskObservationList = element.all(by.xpath("//*[contains(@id,'taskSeriesObservations')]/parent::div/descendant::label"));

    get isPopupDisplayed() {
        try {
            FrameworkComponent.logHelper.info("Check the Popup is displayed");
            return this.elePopupHeader.isPresent().then((value)=>{
                return value;
            });
        } catch (error) {
            FrameworkComponent.logHelper.info(error);
        }
    }

    enterAmountToConfirm(amountToAdministerValue){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(this.eleAmountToConfirm), 3000);
            this.eleAmountToConfirm.isPresent().then(() => {
                FrameworkComponent.logHelper.info("Task notes entered as : " + amountToAdministerValue);
                this.eleAmountToConfirm.sendKeys(amountToAdministerValue);
            }); 
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    fillAmountToConfirm(){
        try {
            let amountFieldStatus = this.eleAmountToConfirm.isEnabled;
            FrameworkComponent.logHelper.info("Amout to Administer text field is : " + amountFieldStatus);
            if(amountFieldStatus){
                let amount = this.amountToAdminister.then((value) => {return value});
                this.enterAmountToConfirm(amount);
            }
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    get instructions(){
        try {
            let occurrenceInstruction = this.eleInstructions.getText().then((value) => { return value;})
            FrameworkComponent.logHelper.info("Occurrence Instructions Displayed as : '" + occurrenceInstruction + "'");
            return occurrenceInstruction;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    get productFullName(){
        try {
            let productName = this.eleProduct.getText().then((value) => { return value;})
            FrameworkComponent.logHelper.info("Product Full Name Displayed as : '" + productName + "'");
            return productName;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    get doseValue(){
        try {
            let doseValue = this.eleDose.getText().then((value) => { return value;})
            FrameworkComponent.logHelper.info("Dose Value Displayed as : '" + doseValue + "'");
            return doseValue;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    get amountToAdminister(){
        try {
            let amountToAdminister = this.eleAmountToAdminister.getText().then((value) => { return value;})
            FrameworkComponent.logHelper.info("Amount TO Administer Value Displayed as : '" + amountToAdminister + "'");
            return amountToAdminister;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    enterTaskNotes(taskNotes: string){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(this.eleTaskNotes), 3000);
            this.eleTaskNotes.isPresent().then(() => {
                FrameworkComponent.logHelper.info("Task notes entered as : " + taskNotes);
                this.eleTaskNotes.sendKeys(taskNotes);
            }); 
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    clickOnClose(){
        try {
            FrameworkComponent.logHelper.info("Click on 'Close' button");
            this.eleCloseButton.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    clickOnSave(){
        try {
            FrameworkComponent.logHelper.info("Click on 'Save' button");
            this.eleSaveButton.click();
            browser.sleep(2000);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    clickOnCompleteAndSave(){
        try {
            FrameworkComponent.logHelper.info("Click on 'Complete and Save' button");
            this.eleCompleteAndSaveButton.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    selectStatusInToggleButton(statusName:string){
        try {
            switch (statusName.toLowerCase()) {
                case 'planned':
                    this.eleToggleStatusPlanned.click();
                    FrameworkComponent.logHelper.info("'Planned' tab has been selected for the task occurrence");
                    break;
                case 'completed':
                    this.eleToggleStatusCompleted.click();
                    FrameworkComponent.logHelper.info("'Completed' tab has been selected for the task occurrence");
                    break;
                case 'skipped':
                    this.eleToggleStatusSkipped.click();
                    FrameworkComponent.logHelper.info("'Skipped' tab has been selected for the task occurrence");
                    break;
                case 'canceled':
                    this.eleToggleStatusCanceled.click();
                    FrameworkComponent.logHelper.info("'Canceled' tab has been selected for the task occurrence");
                    break;
                default:
                    break;
            }
            browser.sleep(1500);
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    enterScheduledTime(time){
        try {
            this.eleScheduleTime.clear().then(() => {
                this.eleScheduleTime.sendKeys(time);
                FrameworkComponent.logHelper.info("Occurrence scheduled time entered as : " + time);
            });
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    get getScheduledTime(){
        try {
            let scheduledTime =  this.eleScheduleTime.getAttribute('value').then((value)=> {return value;});
            return scheduledTime;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    selectScheduledDate(){
        try {            
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleScheduledDateDropDown));
            this.eleScheduledDateDropDown.click();
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    enterCompletedTime(time){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleCompletedTime), 3000);
            this.eleCompletedTime.clear().then(() => {
                this.eleCompletedTime.sendKeys(time);
                FrameworkComponent.logHelper.info("Occurrence completed time entered as : " + time);
            });
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
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
            FrameworkComponent.logHelper.error(error);
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
            FrameworkComponent.logHelper.error(error);
        }
    }

    getTaskObservartionListAvailable(){
        try {
            let taskObservationList = this.eleTaskObservationList.getText().then((observationList) => {
                return observationList;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    getTaskObservationEnabledStatus(__observationName) : any {
        try {
            let __elementXpath = "//*[@id='accordion_title'][2]/descendant::input[@type='checkbox' and following-sibling::label[text()='"+ __observationName +"']]";
            let __observationStatus =element(by.xpath(__elementXpath)).getAttribute('value').then((status) => {
                return status;
            });
            
            return __observationStatus;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    selectTaskObservationByName(__observationName){
        try {
            let __elementXpath = "//*[@id='accordion_title'][2]/descendant::input[@type='checkbox' and following-sibling::label[text()='"+ __observationName +"']]";
            let __observationStatus = this.getTaskObservationEnabledStatus(__observationName);

            if(__observationStatus === false){
                let __observation = element.all(by.xpath(__elementXpath)).getWebElement();
                browser.actions().mouseMove(__observation).click().perform();
            }
            
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    unselectTaskObservationByName(__observationName){
        try {
            let __elementXpath = "//*[@id='accordion_title'][2]/descendant::input[@type='checkbox' and following-sibling::label[text()='"+ __observationName +"']]";
            let __observationStatus = this.getTaskObservationEnabledStatus(__observationName);

            if(__observationStatus === true){
                let __observation = element.all(by.xpath(__elementXpath)).getWebElement();
                browser.actions().mouseMove(__observation).click().perform();
            }
            
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }
   
}