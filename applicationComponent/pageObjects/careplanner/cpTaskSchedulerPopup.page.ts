import { LogHelper } from '../../../frameworkComponent';
import { element, by, browser, protractor } from 'protractor';


export class CareplannerTaskSchedulerPopup{

    elePopup = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[@class='header']"));
    elePopupHeader = element(by.xpath("//*[@id='Scheduleseries']/descendant::h4[contains(@class,'header')]"));
    elePopupCloseIcon = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[@class='icon closeButton']"));
    eleScheduleAccordion = element(by.xpath("//taskschedule/descendant::lsu-accordionpanel/div[@class='title active']"));
    // eleDataToCollectAccordion = element(by.xpath("//taskschedule/descendant::lsu-accordionpanel/div[@class='title']"));

    eleFrequencyOnceToggleButton = element(by.xpath(".//input[@id='once']/following-sibling::label[text()='Once']"))
    eleTimeTextBox = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='Time']/following-sibling::div/input[contains(@class,'custominput')]"));
    eleDateDropDown = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='Date']/following-sibling::div/sui-select"));
    eleDateDropDownContent = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='Date']/following-sibling::div/descendant::sui-select-option/span[2]"));
    eleDateDropDownList = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='Date']/following-sibling::div/descendant::div[contains(@class,'menu transition visible')]"))
    
    eleFrequencyRecurringToggleButton = element(by.xpath(".//input[@id='recurring']/following-sibling::label[text()='Recurring']"));

    eleStartTimeTextBox = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='Start time']/following-sibling::div/input[contains(@class,'custominput')]"));
    eleStartTimeTextBoxScheduleOnce = element(by.xpath(".//input[@class='custominput ng-untouched ng-pristine ng-valid']"));
    
    eleStartDateDropDown = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='Start date']/following-sibling::div/sui-select"));
    eleStartDateDropDownContent = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='Start date']/following-sibling::div/descendant::sui-select-option/span[2]"));
    eleStartDateDropDownList = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='Start date']/following-sibling::div/descendant::div[contains(@class,'menu transition visible')]"))
    
    eleEndDateDropDown = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='End date']/following-sibling::div/sui-select"));
    eleEndDateDropDownContent = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='End date']/following-sibling::div/descendant::sui-select-option/span[2]"));
    eleEndDateDropDownList = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='End date']/following-sibling::div/descendant::div[contains(@class,'menu transition visible')]"))

    eleEndTimeTextBox = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='End time']/following-sibling::div/input[contains(@class,'custominput')]"));
    eleRepeatEveryTextBox = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='Repeat every']/following-sibling::div/input[contains(@class,'custominput')]"));

    // eleHrsToggleButton = element(by.xpath("//lsu-accordionpanel/descendant::input[@id='hrs']"));
    eleHrsToggleButton = element(by.xpath("//lsu-accordionpanel/descendant::label[@for='hrs']"));
    //eleMinutesToggleButton = element(by.xpath("//lsu-accordionpanel/descendant::input[@id='min']"));
    eleMinutesToggleButton = element(by.xpath("//lsu-accordionpanel/descendant::label[@for='min']"));
    eleEndTimeCheckOutCheckBox = element(by.xpath("//lsu-accordionpanel/descendant::input[@id='checkout']"));
    eleInstructionsTextArea = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='Instructions']/following-sibling::div/textarea"));

    eleTimeSensitiveCheckBox = element(by.xpath("//lsu-accordionpanel/descendant::input[@id='Overdue']"));
    eleScheduleButton = element(by.xpath(".//button[text()='Cancel']/following-sibling::button"));

    

    get isPopupDisplayed() {
        try {
            return this.elePopup.isDisplayed().then((value)=>{
                LogHelper.Logger.info("display status value is : " + value);
                return value;
            });
        } catch (error) {
            LogHelper.Logger.info(error);
        }
    }


    toggleFrequency(frequency:string){
        try {
            switch (frequency) {
                case 'Once':
                    LogHelper.Logger.info("clicking on frequency toggle button : " + frequency);
                    this.eleFrequencyOnceToggleButton.click();
                    break;
                case 'Recurring':
                    LogHelper.Logger.info("clicking on frequency toggle button : " + frequency);
                    this.eleFrequencyRecurringToggleButton.click();
                    break;
                default:
                    break;
            }
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    toggleFrequencyOnce() {
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleFrequencyOnceToggleButton), 5000);
            this.eleFrequencyOnceToggleButton.click();
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    toggleFrequencyRecurring() {
        try {
            this.eleFrequencyRecurringToggleButton.click();
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    toggleRepeatEveryHours() {
        try {
            this.eleHrsToggleButton.click();
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    toggleRepeatEveryMinutes() {
        try {
            this.eleMinutesToggleButton.click();
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    enterStartTime(startTime: number) {
        try {
            this.eleStartTimeTextBox.clear().then(() => {
                this.eleStartTimeTextBox.sendKeys(startTime);
                LogHelper.Logger.info("time entered as : " + startTime);
            });
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    get getStartTimeScheduleOnce(): any {
        try {
            return this.eleStartTimeTextBoxScheduleOnce.getAttribute('value').then((startTime) => {
                console.log("Start time is        "+startTime);
                return startTime;
            });            
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    get getStartTime(): any {
        try {
            return this.eleStartTimeTextBox.getText().then((startTime) => {
                return startTime;
            });
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    enterEndTime(endTime: number) {
        try {
            this.eleEndTimeTextBox.sendKeys(endTime);
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }
    get endTime(): any {
        try {
            return this.eleEndTimeTextBox.getText().then((endTime) => {
                return endTime;
            });
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    enterRepeatEveryHour(numberOfHours: number) {
        try {
            LogHelper.Logger.info("Input hours in the field" + numberOfHours);
            //this.ToggleRepeatEveryHours();
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleRepeatEveryTextBox), 5000);
            this.eleRepeatEveryTextBox.sendKeys(numberOfHours);
            browser.sleep(1000);
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    enterRepeatEveryMinutes(minutes: number) {
        try {
            this.toggleRepeatEveryMinutes();
            this.eleRepeatEveryTextBox.sendKeys(minutes);
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }
    get repeatEvery(): any {
        try {
            return this.eleRepeatEveryTextBox.getText().then((repeatEvery) => {
                return repeatEvery;
            });
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    enterTimeForSingleOccurrence(time:number){
        try {
            this.eleTimeTextBox.clear().then(() => {
                this.eleTimeTextBox.sendKeys(time);
                LogHelper.Logger.info("time entered as : " + time);
            });
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    selectDateForSingleOccurrence(){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleDateDropDown));
            this.eleDateDropDown.click();
            browser.wait(EC.visibilityOf(this.eleDateDropDownList), 5000);
            this.eleDateDropDownContent.click();
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    selectStartDate(){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleStartDateDropDown), 2000);
            this.eleStartDateDropDown.click();
            browser.wait(EC.visibilityOf(this.eleStartDateDropDownList), 5000);
            this.eleStartDateDropDownContent.click();
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    selectEndDate(){
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.eleEndDateDropDown), 2000);
            this.eleEndDateDropDown.click();
            browser.wait(EC.visibilityOf(this.eleEndDateDropDownList), 5000);
            this.eleEndDateDropDownContent.click();
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    enterInstructions(instructions: string) {
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleInstructionsTextArea), 5000);
            this.eleInstructionsTextArea.sendKeys(instructions);
            browser.sleep(1000)
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }


    clickScheduleButton() {
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleScheduleButton), 5000);
            this.eleScheduleButton.click();
            return this;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }


    scheduleTaskOccurrence(occurrenceInfo:TaskOccurreceDetails){
        try {
            if(this.isPopupDisplayed){
                switch(occurrenceInfo.frequency.toLowerCase()){
                    case "once":
                        this.toggleFrequencyOnce()
                            .enterTimeForSingleOccurrence(occurrenceInfo.scheduleStartTime)
                            .selectDateForSingleOccurrence()
                            .enterInstructions(occurrenceInfo.taskInstructions)
                            .clickScheduleButton();
                    break;
                    case "recurring":
                        this.toggleFrequencyRecurring()
                            .enterStartTime(occurrenceInfo.scheduleStartTime)
                            .selectStartDate()
                            .enterRepeatEveryHour(occurrenceInfo.repeatHours)
                            .enterEndTime(occurrenceInfo.scheduleEndTime)
                            .selectEndDate()
                            .enterInstructions(occurrenceInfo.taskInstructions)
                            .clickScheduleButton();
                    break;
                    default:
                    break;
                }                
            }else{
                LogHelper.Logger.error("Schedule Task Occurrence Popup not displayed");
            }
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }
}