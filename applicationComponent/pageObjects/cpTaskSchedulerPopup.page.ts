import { FrameworkComponent } from '../../frameworkComponent';
import { element, by, browser, protractor } from 'protractor';


export class CareplannerTaskSchedulerPopup{

    elePopup = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[@class='header']"));
    elePopupHeader = element(by.xpath("//*[@id='Scheduleseries']/descendant::h4[contains(@class,'header')]"));
    elePopupCloseIcon = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[@class='icon closeButton']"));
    eleScheduleAccordion = element(by.xpath("//taskschedule/descendant::lsu-accordionpanel/div[@class='title active']"));
    // eleDataToCollectAccordion = element(by.xpath("//taskschedule/descendant::lsu-accordionpanel/div[@class='title']"));

    eleFrequencyOnceToggleButton = element(by.xpath(".//input[@id='once']/following-sibling::label[text()='Once']"))
    eleTimeTextBox = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='Time']/following-sibling::div/input[contains(@class,'custominput')]"));
    eleDateDropDown = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='Date']/following-sibling::div/sui-select"));
    eleDateDropDownContent = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='Date']/following-sibling::div/descendant::sui-select-option/span[2]"));
    eleDateDropDownList = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='Date']/following-sibling::div/descendant::div[contains(@class,'menu transition visible')]"))
    
    eleFrequencyRecurringToggleButton = element(by.xpath(".//input[@id='recurring']/following-sibling::label[text()='Recurring']"));

    eleStartTimeTextBox = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='Start time']/following-sibling::div/input[contains(@class,'custominput')]"));
    eleStartTimeTextBoxScheduleOnce = element(by.xpath(".//input[@class='custominput ng-untouched ng-pristine ng-valid']"));
    
    eleStartDateDropDown = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='Start date']/following-sibling::div/sui-select"));
    eleStartDateDropDownContent = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='Start date']/following-sibling::div/descendant::sui-select-option/span[2]"));
    eleStartDateDropDownList = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='Start date']/following-sibling::div/descendant::div[contains(@class,'menu transition visible')]"))
    
    eleEndDateDropDown = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='End date']/following-sibling::div/sui-select"));
    eleEndDateDropDownContent = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='End date']/following-sibling::div/descendant::sui-select-option/span[2]"));
    eleEndDateDropDownList = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='End date']/following-sibling::div/descendant::div[contains(@class,'menu transition visible')]"))

    eleEndTimeTextBox = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='End time']/following-sibling::div/input[contains(@class,'custominput')]"));
    eleRepeatEveryTextBox = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='Repeat every']/following-sibling::div/input[contains(@class,'custominput')]"));

    // eleHrsToggleButton = element(by.xpath("//*[@id='Scheduleseries']/descendant::input[@id='hrs']"));
    eleHrsToggleButton = element(by.xpath("//*[@id='Scheduleseries']/descendant::label[@for='hrs']"));
    //eleMinutesToggleButton = element(by.xpath("//*[@id='Scheduleseries']/descendant::input[@id='min']"));
    eleMinutesToggleButton = element(by.xpath("//*[@id='Scheduleseries']/descendant::label[@for='min']"));
    eleEndTimeCheckOutCheckBox = element(by.xpath("//*[@id='Scheduleseries']/descendant::input[@id='checkout']"));
    eleInstructionsTextArea = element(by.xpath("//*[@id='Scheduleseries']/descendant::div[contains(@class,'text') and text() ='Instructions']/following-sibling::div/textarea"));

    eleTimeSensitiveCheckBox = element(by.xpath("//*[@id='Scheduleseries']/descendant::input[@id='Overdue']"));
    eleScheduleButton = element(by.xpath(".//button[text()='Cancel']/following-sibling::button"));

    eleCancelButton = element(by.xpath(".//button[text()='Cancel']"));

    eleTaskObservationList = element.all(by.xpath("//*[contains(@id,'taskSeriesObservations')]/parent::div/descendant::label"));
    eleTaskObservationSelectedList = element.all(by.xpath("//*[contains(@id,'taskSeriesObservations')]/parent::div/descendant::label[preceding-sibling::input[@type='checkbox' and @value='true']]"));
    eleTaskObservationUnSelectedList = element.all(by.xpath("//*[contains(@id,'taskSeriesObservations')]/parent::div/descendant::label[preceding-sibling::input[@type='checkbox' and @value='false']]"));
    eleAccordionIcon = element.all(by.xpath("//*[@id='accordion_title']/div[contains(@class,'title')]"));
    eleActiveAccordionIcon = element.all(by.xpath("//*[@id='accordion_title']/div[contains(@class,'title active')]"));
    

    get isPopupDisplayed() {
        try {
            return this.elePopup.isDisplayed().then((value)=>{
                FrameworkComponent.logHelper.info("display status value is : " + value);
                return value;
            });
        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    }


    toggleFrequency(frequency:string){
        try {
            switch (frequency) {
                case 'Once':
                    FrameworkComponent.logHelper.info("clicking on frequency toggle button : " + frequency);
                    this.eleFrequencyOnceToggleButton.click();
                    break;
                case 'Recurring':
                    FrameworkComponent.logHelper.info("clicking on frequency toggle button : " + frequency);
                    this.eleFrequencyRecurringToggleButton.click();
                    break;
                default:
                    break;
            }
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    toggleFrequencyOnce() {
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleFrequencyOnceToggleButton), 5000);
            this.eleFrequencyOnceToggleButton.click();
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    toggleFrequencyRecurring() {
        try {
            this.eleFrequencyRecurringToggleButton.click();
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    toggleRepeatEveryHours() {
        try {
            this.eleHrsToggleButton.click();
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    toggleRepeatEveryMinutes() {
        try {
            this.eleMinutesToggleButton.click();
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    enterStartTime(startTime: number) {
        try {
            this.eleStartTimeTextBox.clear().then(() => {
                this.eleStartTimeTextBox.sendKeys(startTime);
                FrameworkComponent.logHelper.info("time entered as : " + startTime);
            });
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get getStartTimeScheduleOnce(): any {
        try {
            return this.eleStartTimeTextBoxScheduleOnce.getAttribute('value').then((startTime) => {
                console.log("Start time is "+ startTime);
                return startTime;
            });            
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get getStartTime(): any {
        try {
            return this.eleStartTimeTextBox.getText().then((startTime) => {
                return startTime;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    enterEndTime(endTime: number) {
        try {
            this.eleEndTimeTextBox.sendKeys(endTime);
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
    get endTime(): any {
        try {
            return this.eleEndTimeTextBox.getText().then((endTime) => {
                return endTime;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    enterRepeatEveryHour(numberOfHours: number) {
        try {
            FrameworkComponent.logHelper.info("Input hours in the field" + numberOfHours);
            //this.ToggleRepeatEveryHours();
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleRepeatEveryTextBox), 5000);
            this.eleRepeatEveryTextBox.sendKeys(numberOfHours);
            browser.sleep(1000);
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    enterRepeatEveryMinutes(minutes: number) {
        try {
            this.toggleRepeatEveryMinutes();
            this.eleRepeatEveryTextBox.sendKeys(minutes);
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
    get repeatEvery(): any {
        try {
            return this.eleRepeatEveryTextBox.getText().then((repeatEvery) => {
                return repeatEvery;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    enterTimeForSingleOccurrence(time:number){
        try {
            this.eleTimeTextBox.clear().then(() => {
                this.eleTimeTextBox.sendKeys(time);
                FrameworkComponent.logHelper.info("time entered as : " + time);
            });
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
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
            FrameworkComponent.logHelper.error(error);
            throw error;
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
            FrameworkComponent.logHelper.error(error);
            throw error;
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
            FrameworkComponent.logHelper.error(error);
            throw error;
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
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }


    clickScheduleButton() {
        try {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(this.eleScheduleButton), 5000);
            this.eleScheduleButton.click();
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
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
            } else {
                FrameworkComponent.logHelper.error("Schedule Task Occurrence Popup not displayed");
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;            
        }
    }

    getTaskObservartionListAvailable(){
        try {
            let taskObservationList = this.eleTaskObservationList.getText().then((observationList) => {
                return observationList;
            });
            return taskObservationList;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;            
        }
    }

    getSelectedTaskObservationList(){
        try {
            let selectedObservationList = this.eleTaskObservationSelectedList.getText().then((selectedList) => {                
                return selectedList;
            });
            return selectedObservationList;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;            
        }
    }

    getUnSelectedTaskObservationList(){
        try {
            let unselectedObservationList =this.eleTaskObservationUnSelectedList.getText().then((unselectedList) => {
                return unselectedList;
            });
            return unselectedObservationList;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getTaskObservationEnabledStatus(observationName) {
        try {
            let __val;
            let __elementXpath = "//*[@id='accordion_title'][2]/descendant::input[@type='checkbox' and following-sibling::label[text()='"+ observationName +"']]";
            __val = element(by.xpath(__elementXpath)).getAttribute('value');
            return __val;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    selectTaskObservationByName(observationName){
        try {
            let __elementXpath1 = "//*[@id='accordion_title'][2]/descendant::label[contains(text(),'"+ observationName +"')]";
            //let __elementXpath = "//*[@id='accordion_title'][2]/descendant::input[@type='checkbox'][following-sibling::label[text()='" + observationName +"']]"
            this.getTaskObservationEnabledStatus(observationName).then((status) => {
                if(status === 'false'){
                    FrameworkComponent.logHelper.info("Selcting the '" + observationName + "' checkbox");
                    element(by.xpath(__elementXpath1)).click();
                    // browser.sleep(1000);
                } else {
                    FrameworkComponent.logHelper.info("'" + observationName + "' checkbox has been already selected");
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    unselectTaskObservationByName(observationName){
        try {
            let __elementXpath1 = "//*[@id='accordion_title'][2]/descendant::label[contains(text(),'"+ observationName +"')]";
            //let __elementXpath = "//*[@id='accordion_title'][2]/descendant::input[@type='checkbox'][following-sibling::label[text()='" + observationName +"']]"
            this.getTaskObservationEnabledStatus(observationName).then((status) => {
                if(status === 'true'){
                    FrameworkComponent.logHelper.info("Unselcting the '" + observationName + "' checkbox");
                    element(by.xpath(__elementXpath1)).click(); 
                    // browser.sleep(1000);
                } else {
                    FrameworkComponent.logHelper.info("'" + observationName + "' checkbox has been already unselected");
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    selectListOfTaskObservationsByName(taskObservationList){
        try {
            taskObservationList.forEach(taskObservation => {
                this.selectTaskObservationByName(taskObservation);
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    unselectListOfTaskObservationsByName(taskObservationList){
        try {
            taskObservationList.forEach(taskObservation => {
                FrameworkComponent.logHelper.info('Task Observation Name need to be unselected' + taskObservation);
                this.unselectTaskObservationByName(taskObservation);
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    expandScheduler(){
        try {
           if(this.isPopupDisplayed){
               let __schedulerIcon = this.eleAccordionIcon.get(0).getWebElement();
               __schedulerIcon.click();
               browser.sleep(2000);
           }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    IsSchedulerExpanded(){
        try {
            let __taskObservationIcon = this.eleAccordionIcon.get(0).getAttribute('class');
            expect(__taskObservationIcon).toContain('active');
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    expandTaskObservation(){
        try {
            if(this.isPopupDisplayed){
                let __taskObservationIcon = this.eleAccordionIcon.get(1).getWebElement();
                __taskObservationIcon.click();
                browser.sleep(2000);
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    IsTaskObservationExpanded(){
        try {
            let __taskObservationIcon = this.eleAccordionIcon.get(1).getAttribute('class').then((status)=>{
                if(status.includes('active')){
                    return true;
                } else {
                    return false;
                }
            });           
            return __taskObservationIcon;           
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    closeTaskSchedulerPopup(){
        try {
            this.eleCancelButton.click();
            return this;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    scheduleTaskWithObservationDetails(taskSeries){
        try {
            if(this.isPopupDisplayed){
                switch(taskSeries.occurrenceFrequency.toLowerCase()) {
                    case "once":
                        this.toggleFrequencyOnce()
                            .enterTimeForSingleOccurrence(taskSeries.scheduleStartTime)
                            .selectDateForSingleOccurrence()
                            .enterInstructions(taskSeries.scheduleInstructions);
                    break;
                    case "recurring":
                        this.toggleFrequencyRecurring()
                            .enterStartTime(taskSeries.scheduleStartTime)
                            .selectStartDate()
                            .enterRepeatEveryHour(taskSeries.repeatEveryHour)
                            .enterEndTime(taskSeries.scheduleEndTime)
                            .selectEndDate()
                            .enterInstructions(taskSeries.scheduleInstructions);
                    break;
                    default:
                    break;
                }

                if(taskSeries.observationList.length>0){
                    this.defineTaskObservationValues(taskSeries.observationList);
                }
                this.clickScheduleButton();
                browser.sleep(2000);
            } else {
                FrameworkComponent.logHelper.error("Schedule Task Occurrence Popup not displayed");
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    scheduleTaskWithObservationDetails1(taskScheduleInfo){
        try {
            if(this.isPopupDisplayed){
                switch(taskScheduleInfo.occurrenceFrequency.toLowerCase()) {
                    case "once":
                        this.toggleFrequencyOnce()
                            .enterTimeForSingleOccurrence(taskScheduleInfo.scheduleStartTime)
                            .selectDateForSingleOccurrence()
                            .enterInstructions(taskScheduleInfo.scheduleInstructions);
                    break;
                    case "recurring":
                        this.toggleFrequencyRecurring()
                            .enterStartTime(taskScheduleInfo.scheduleStartTime)
                            .selectStartDate()
                            .enterRepeatEveryHour(taskScheduleInfo.repeatEveryHour)
                            .enterEndTime(taskScheduleInfo.scheduleEndTime)
                            .selectEndDate()
                            .enterInstructions(taskScheduleInfo.scheduleInstructions);
                    break;
                    default:
                    break;
                }

                if(taskScheduleInfo.observationList.length > 0){
                    this.defineTaskObservationValues(taskScheduleInfo.observationList);
                }
                this.clickScheduleButton();
                browser.sleep(2000);
            } else {
                FrameworkComponent.logHelper.error("Schedule Task Occurrence Popup not displayed");
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    defineTaskObservationValues(taskObservationList){
        try {

            this.expandTaskObservation();
            
            this.eleTaskObservationList.getText().then((observationList) => {
                for (let index = 0; index < observationList.length; index++) {                    
                    if(taskObservationList.includes(observationList[index])) {
                        this.selectTaskObservationByName(observationList[index]);
                    }
                    else {
                        this.unselectTaskObservationByName(observationList[index]);
                    }
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}