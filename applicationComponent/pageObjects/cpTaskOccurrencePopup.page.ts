import { browser, by, element, protractor } from 'protractor';
import { DataReader } from '../../dataComponent/dataReaderHelper';
import { FrameworkComponent } from '../../frameworkComponent';

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
            FrameworkComponent.logHelper.info("Check the Popup is displayed");
            return this.elePopupHeader.isPresent().then((value) => {
                return value;
            });
        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    }

    enterAmountToConfirm(amountToAdministerValue) {
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(this.eleAmountToConfirm), 3000);
            this.eleAmountToConfirm.isPresent().then(() => {
                FrameworkComponent.logHelper.info("Task notes entered as : " + amountToAdministerValue);
                this.eleAmountToConfirm.sendKeys(amountToAdministerValue);
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    fillAmountToConfirm() {
        try {
            let amountFieldStatus = this.eleAmountToConfirm.isEnabled;
            FrameworkComponent.logHelper.info("Amout to Administer text field is : " + amountFieldStatus);
            if (amountFieldStatus) {
                let amount = this.amountToAdminister.then((value) => { return value });
                this.enterAmountToConfirm(amount);
            }
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get instructions() {
        try {
            let occurrenceInstruction = this.eleInstructions.getText().then((value) => { return value; })
            FrameworkComponent.logHelper.info("Occurrence Instructions Displayed as : '" + occurrenceInstruction + "'");
            return occurrenceInstruction;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get productFullName() {
        try {
            let productName = this.eleProduct.getText().then((value) => { return value; })
            FrameworkComponent.logHelper.info("Product Full Name Displayed as : '" + productName + "'");
            return productName;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get doseValue() {
        try {
            let doseValue = this.eleDose.getText().then((value) => { return value; })
            FrameworkComponent.logHelper.info("Dose Value Displayed as : '" + doseValue + "'");
            return doseValue;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get amountToAdminister() {
        try {
            let amountToAdminister = this.eleAmountToAdminister.getText().then((value) => { return value; })
            FrameworkComponent.logHelper.info("Amount TO Administer Value Displayed as : '" + amountToAdminister + "'");
            return amountToAdminister;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    enterTaskNotes(taskNotes: string) {
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
            throw error;
        }
    }

    clickOnClose() {
        try {
            FrameworkComponent.logHelper.info("Click on 'Close' button");
            this.eleCloseButton.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnSave() {
        try {
            FrameworkComponent.logHelper.info("Click on 'Save' button");
            this.eleSaveButton.click();
            browser.sleep(2000);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnCompleteAndSave() {
        try {
            FrameworkComponent.logHelper.info("Click on 'Complete and Save' button");
            this.eleCompleteAndSaveButton.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    selectStatusInToggleButton(statusName: string) {
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
            throw error;
        }
    }

    enterScheduledTime(time) {
        try {
            this.eleScheduleTime.clear().then(() => {
                this.eleScheduleTime.sendKeys(time);
                FrameworkComponent.logHelper.info("Occurrence scheduled time entered as : " + time);
            });
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get getScheduledTime() {
        try {
            let scheduledTime = this.eleScheduleTime.getAttribute('value').then((value) => { return value; });
            return scheduledTime;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    selectScheduledDate() {
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleScheduledDateDropDown));
            this.eleScheduledDateDropDown.click();
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    enterCompletedTime(time) {
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
            throw error;
        }
    }

    selectCompletedDate() {
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleCompletedDateDropDown));
            this.eleCompletedDateDropDown.click();
            browser.wait(EC.visibilityOf(this.eleCompleteDateDropDownList), 5000);
            var date = this.eleCompletedDateDropDownContent.getText().then((value) => { return value });
            this.eleCompletedDateDropDownContent.click();
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    updateOccurrenceDetailsWithObservations(taskOccurrenceInfo, scheduleTime?) {
        try {
            if (this.isPopupDisplayed) {
                browser.sleep(1000);
                switch (taskOccurrenceInfo.occurrenceAction.toLowerCase()) {
                    case "completed":
                        this.enterTaskNotes(taskOccurrenceInfo.occurrenceNotes)
                            .selectStatusInToggleButton(taskOccurrenceInfo.occurrenceAction)
                            .enterCompletedTime(this.getScheduledTime)
                            .selectCompletedDate();

                        if (taskOccurrenceInfo.observationList.length > 0) {
                            this.fillObservationDetails(taskOccurrenceInfo);
                        }
                        break;
                    case "skipped":
                        this.enterTaskNotes(taskOccurrenceInfo.occurrenceNotes)
                            .selectStatusInToggleButton(taskOccurrenceInfo.occurrenceAction)
                            .enterScheduledTime(taskOccurrenceInfo.occurrenceHour);

                        if (taskOccurrenceInfo.observationList.length > 0) {
                            this.fillObservationDetails(taskOccurrenceInfo);
                        }
                        break;
                    case "canceled":
                        this.enterTaskNotes(taskOccurrenceInfo.occurrenceNotes)
                            .selectStatusInToggleButton(taskOccurrenceInfo.occurrenceAction)
                        break;
                    case "planned":
                    case "rescheduled":
                        this.enterTaskNotes(taskOccurrenceInfo.occurrenceNotes)
                            .selectStatusInToggleButton(taskOccurrenceInfo.occurrenceAction)
                            .enterScheduledTime(scheduleTime)
                            .selectScheduledDate();
                        break;
                    default:
                        break;
                }
                browser.sleep(1000);
                this.clickOnSave();
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    fillObservationDetails(taskOccurrenceInfo) {
        try {
            taskOccurrenceInfo.observationList.forEach(observationName => {

                // let observationValue = taskOccurrenceInfo.observationValues[observationName];

                let observationValue = taskOccurrenceInfo.observationValues[taskOccurrenceInfo.observationList.indexOf(observationName)];

                let observationFieldInfo = DataReader.loadAPIDefaultValues('observationMappings');
                observationFieldInfo = observationFieldInfo.observationlist.filter(list => list.Name.toLowerCase() === observationName.toLowerCase());

                if (observationValue != null && observationFieldInfo.length === 1) {

                    let fieldName = observationFieldInfo[0].Abbrevation;
                    let fieldType = observationFieldInfo[0].FieldType;
                    let fieldValue = observationValue;

                    switch (fieldType.toLowerCase()) {
                        case 'text':
                            FrameworkComponent.logHelper.info('Textbox is the ' + fieldValue);
                            let textXpath = "//*[@id='Occurrencesries']/descendant::div[./div[contains(text(),'" + fieldName + "')]]/following-sibling::div/descendant::input";
                            element(by.xpath(textXpath)).sendKeys(fieldValue);
                            break;
                        case 'textarea':
                            FrameworkComponent.logHelper.info('Textarea is the ' + fieldValue);
                            let textAreaXpath = "//*[@id='Occurrencesries']/descendant::div[./div[contains(text(),'" + fieldName + "')]]/following-sibling::div/descendant::textarea";
                            element(by.xpath(textAreaXpath)).sendKeys(fieldValue);
                            break;
                        case 'radio':
                            FrameworkComponent.logHelper.info('radio button is the ' + fieldValue);
                            let radioXpath = "//*[@id='Occurrencesries']/descendant::div[span[contains(text(),'" + fieldName + "')]]/following-sibling::div/descendant::input[following-sibling::label/i[text()='" + fieldValue + "']]";
                            element(by.xpath(radioXpath)).click();
                            break;
                        case 'select':
                            FrameworkComponent.logHelper.info('select is the ' + fieldValue);
                            let selectXpath = "//*[@id='Occurrencesries']/descendant::div[span[contains(text(),'" + fieldName + "')]]/following-sibling::div/descendant::select";
                            let dropDownElement = element(by.xpath(selectXpath));
                            dropDownElement.getWebElement().findElements(by.tagName('option')).then((options) => {
                                options.forEach(element => {
                                    let elementFound: boolean;
                                    element.getText().then((value) => {
                                        if (value.includes(fieldValue)) {
                                            elementFound = true;
                                            element.click();
                                        }
                                    })
                                });
                            });
                            break;
                        default:
                            break;
                    }
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }


}