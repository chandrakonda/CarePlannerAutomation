import { element, by, browser, protractor } from 'protractor';

export class CarePlannerEditSchedulePopup {

    elePopup = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[@class='header']"));
    elePopupHeader = element(by.xpath("//*[@id='Scheduleseries']/descendant::h4[contains(@class,'header')]"));
    elePopupCloseIcon = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[@class='icon closeButton']"));
    eleScheduleAccordion = element(by.xpath("//taskschedule/descendant::lsu-accordionpanel/div[@class='title active']"));
    // eleDataToCollectAccordion = element(by.xpath("//taskschedule/descendant::lsu-accordionpanel/div[@class='title']"));

    eleFrequencyOnceToggleButton = element(by.xpath(".//input[@id='once']/following-sibling::label[text()='Once']"))
    eleFrequencyRecurringToggleButton = element(by.xpath(".//input[@id='recurring']/following-sibling::label[text()='Recurring']"));

    eleStartTimeTextBox = element(by.xpath("//lsu-accordionpanel/descendant::div[contains(@class,'text') and text() ='Start time']/following-sibling::div/input[contains(@class,'custominput')]"));
    eleStartTimeTextBoxScheduleOnce = element(by.xpath(".//input[@class='custominput ng-untouched ng-pristine ng-valid']"));
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

    

    get isPopupDisplayed():Boolean {
        try {
           
           // browser.logger.info(this.elePopup.isDisplayed());
            let x:boolean;
            this.elePopup.isDisplayed().then((value)=>{
                x = value;
            });
            return x;
        } catch (error) {
            browser.logger.info(error);
        }
    }

    ToggleFrequencyOnce() {
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleFrequencyOnceToggleButton), 5000);
            this.eleFrequencyOnceToggleButton.click();
        } catch (error) {
            browser.logger.error(error);
        }
    }

    ToggleFrequencyRecurring() {
        try {
            this.eleFrequencyRecurringToggleButton.click();
        } catch (error) {
            browser.logger.error(error);
        }
    }

    ToggleRepeatEveryHours() {
        try {
            this.eleHrsToggleButton.click();
        } catch (error) {
            browser.logger.error(error);
        }
    }

    ToggleRepeatEveryMinutes() {
        try {
            this.eleMinutesToggleButton.click();
        } catch (error) {
            browser.logger.error(error);
        }
    }

    EnterStartTime(startTime: number) {
        try {
            this.eleStartTimeTextBox.sendKeys(startTime);
        } catch (error) {
            browser.logger.error(error);
        }
    }

    

    get getStartTimeScheduleOnce(): any {
        try {
            return this.eleStartTimeTextBoxScheduleOnce.getAttribute('value').then((startTime) => {
                console.log("Start time is        "+startTime);
                return startTime;
            });
        } catch (error) {
            browser.logger.error(error);
        }
    }

    get getStartTime(): any {
        try {
            return this.eleStartTimeTextBox.getText().then((startTime) => {
                return startTime;
            });
        } catch (error) {
            browser.logger.error(error);
        }
    }

    EnterEndTime(endTime: number) {
        try {
            this.eleEndTimeTextBox.sendKeys(endTime);
        } catch (error) {
            browser.logger.error(error);
        }
    }
    get EndTime(): any {
        try {
            return this.eleEndTimeTextBox.getText().then((endTime) => {
                return endTime;
            });
        } catch (error) {
            browser.logger.error(error);
        }
    }

    EnterRepeatEveryHour(numberOfHours: number) {
        try {
            browser.logger.info("Input hours in the field" + numberOfHours);
            //this.ToggleRepeatEveryHours();
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleRepeatEveryTextBox), 5000);
            this.eleRepeatEveryTextBox.sendKeys(numberOfHours);
            browser.sleep(1000);
        } catch (error) {
            browser.logger.error(error);
        }
    }

    EnterRepeatEveryMinutes(minutes: number) {
        try {
            this.ToggleRepeatEveryMinutes();
            this.eleRepeatEveryTextBox.sendKeys(minutes);
        } catch (error) {
            browser.logger.error(error);
        }
    }
    get repeatEvery(): any {
        try {
            return this.eleRepeatEveryTextBox.getText().then((repeatEvery) => {
                return repeatEvery;
            });
        } catch (error) {
            browser.logger.error(error);
        }
    }

    EnterInstructions(instructions: string) {

        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleInstructionsTextArea), 5000);
            this.eleInstructionsTextArea.sendKeys(instructions);

        } catch (error) {
            browser.logger.error(error);
        }
    }


    ClickScheduleButton() {

        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleScheduleButton), 5000);
            this.eleScheduleButton.click();

        } catch (error) {
            browser.logger.error(error);
        }


    }


    }