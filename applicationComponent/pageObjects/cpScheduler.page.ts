import { FrameworkComponent } from '../../frameworkComponent';
import { $, browser, element, by, By, ExpectedConditions, protractor } from "protractor";
import { Pages } from './pages';
import { resolve } from 'path';
import { APILibraryController } from '../../applicationComponent';


export class CareplannerSchedulerPage{
    
    eleWJGrid = element(by.xpath(".//wj-flex-grid[@id='wijgridObject']"));
    elePrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[@class='task-table']/descendant::div[@class='itemname']"));
    elePrdTaskListText = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[@class='task-table']/descendant::div[@class='itemname']/text()[not(descendant::span)]"));
    eleScheduledPrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[contains(@class,'wj-frozen-col')]/descendant::div[contains(@class,'unscheduled-cell') and not(*)]"));
    eleOverduePrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[@class='task-table']/descendant::div[@class='overduecount-cell']"));
    eleNonScheduledPrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[@class='task-table']/descendant::div[@class='occurrence-text']"));
    eleCategoryList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[contains(@class,'wj-frozen-col')]/descendant::div[contains(@class,'groupheader_txt')]"));

    eleNumberOfHoursDisplayed = element.all(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-colheaders')]/div[not(contains(@class, 'wj-cell wj-header wj-frozen-col wj-wrap')) and not(contains(@class, 'wj-cell wj-header wj-wrap'))]"));

    get categoryCount() {
        try {
            let categoryCount = this.eleCategoryList.count().then((catCount: number) => {
                return catCount;
            });
            return categoryCount;
        } catch (error) {        
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get productTaskListCount() {
        try {
            let productTaskListCount = this.elePrdTaskList.count().then((taskCount: number) => {
                return taskCount;
            });
            return productTaskListCount;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get scheduledProductTaskCount() {
        try {
            return this.eleScheduledPrdTaskList.count().then((taskCount: number) => {
                return taskCount;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get nonScheduledProductTaskCount() {
        try {
            return this.eleNonScheduledPrdTaskList.count().then((taskCount: number) => {
                return taskCount;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get categoryNameList() {
        try {
            return this.eleCategoryList.getText().then((catName: string) => {
                return catName;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get productTaskList() {
        try {
            let prdTaskList = this.elePrdTaskList.getText().then(prdList => {
                return prdList;
            });            
            return prdTaskList;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnTaskByName(taskSeriesName: string) {
        try {
            let _taskSeriesName = taskSeriesName.slice(0, 23);            
            let _xpathValue: string = "//div[contains(@class,'wj-cell') and contains(@class,'wj-frozen') and not(contains(@class,'wj-group'))]/descendant::div[contains(@class,'itemname') and contains(normalize-space(text()) , '" + _taskSeriesName +"')]";
            let ele1 = element(by.xpath(_xpathValue));
            ele1.click();
            browser.sleep(3000);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async isTaskSeriesPopUpdisplayed() {
        try {
            let __elementXpath: string = ".//div[contains(@id,'lsu_modal')]";
            return element(by.xpath(__elementXpath)).isDisplayed().then(value => {
                if (value = true) {
                    return true;
                } else {
                    return false;
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getNumberOfTaskOccurrence(startPosition, endPosition) {
        try {                       
            //let __elementXpath = "//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=" +startPosition +"and not(position() >=" +endPosition +")]/descendant::li";
            let __elementXpath = "//*[@id='wijgridObject']/descendant::div[not(contains(@class,'wj-cell wj-group')) and contains(@class,'wj-cell')][position() >" + startPosition.value_ +"and not(position() >" + endPosition.value_ +")]/descendant::li";
            return element.all(by.xpath(__elementXpath)).count()
            .then(count => {
                FrameworkComponent.logHelper.info("Task occurrence count is : " + count);
                return count;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnTaskSeriesOccurrenceByIndex(taskSeriesName, occurrenceIndex) {
        try {            
            this.getPositionByTaskName(taskSeriesName).then((position)=>{                                
                let __elementXpath = "//*[@id='wijgridObject']/descendant::div[not(contains(@class,'wj-cell wj-group')) and contains(@class,'wj-cell')][position() >" + position.startPosition.value_ + "and not(position() >" + position.endPosition.value_ + ")]/descendant::li";
                element.all(by.xpath(__elementXpath)).get(occurrenceIndex).getWebElement().click();    
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    //Trial Method, Need to implement fully
    clickOnTaskSeriesOccurrenceByHour(taskSeriesName, occurrenceHour){
        try {
            this.getPositionByTaskName(taskSeriesName).then((position)=>{                                
                let __elementXpath = "//*[@id='wijgridObject']/descendant::div[not(contains(@class,'wj-cell wj-group')) and contains(@class,'wj-cell')][position() >" + position.startPosition.value_ + "and not(position() >" + position.endPosition.value_ + ")]";
                element.all(by.xpath(__elementXpath)).get(parseInt(occurrenceHour,10)).getWebElement().click();
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getTaskOccurrenceStatus(startPosition, endPosition) {
        try {                      
            let __elementXpath = "//*[@id='wijgridObject']/descendant::div[not(contains(@class,'wj-cell wj-group')) and contains(@class,'wj-cell')][position() >" + startPosition.value_ + "and not(position() >" + endPosition.value_ + ")]/descendant::li";
            let __occurrence = element.all(by.xpath(__elementXpath));
            return __occurrence.getAttribute("class").then((className) => {
                FrameworkComponent.logHelper.info("Status of all the task occurrence : " + className);
                return className;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getTaskOccurrenceStatusByHour(taskSeriesName, occurrenceHour) {
        try {
            return this.getPositionByTaskName(taskSeriesName).then((position)=>{   
                let __occurrenceHour:number = parseInt(occurrenceHour, 10) + 1;
                let __elementXpath = "//*[@id='wijgridObject']/descendant::div[not(contains(@class,'wj-cell wj-group')) and contains(@class,'wj-cell')][position() >" + position.startPosition.value_ + "and not(position() >" + position.endPosition.value_ + ")]["+ __occurrenceHour + "]/descendant::li";
                let __occurrence = element(by.xpath(__elementXpath));
                return __occurrence.getAttribute("class").then((className) => {
                    let __status = className.split(' ')[0];
                    FrameworkComponent.logHelper.info("Status of the task occurrence : '" + occurrenceHour + "' is : '" + className.split(' ')[0]) + "'";
                    return __status;
                })
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getTheNumberOfTaskOccurrenceCreated(taskSeriesName){
        try {
            browser.sleep(1000);
            let __taskOccurrenceCount = await this.getPositionByTaskName(taskSeriesName).then((position)=>{                  
                return this.getNumberOfTaskOccurrence(position.startPosition, position.endPosition).then((count) =>{
                    return count;
                })
            })
            return __taskOccurrenceCount;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getStatusOfTheTaskOccurrenceByTaskName(taskSeriesName){
        try {
            let __taskOccurrenceStatus = await this.getPositionByTaskName(taskSeriesName).then((position)=>{
                return this.getTaskOccurrenceStatus(position.startPosition, position.endPosition).then((statusList:any) =>{
                    for (let index = 1; index <= statusList.length; index++) {
                        statusList[index-1] = statusList[index-1].split(' ')[0];
                    }
                    return statusList;
                });
            });
            
            return __taskOccurrenceStatus;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    ScheduleTaskWithObservations(taskSeriesName, taskScheduleInfo){
        try {
           
            this.clickOnTaskByName(taskSeriesName);

            browser.sleep(1000);  

            Pages.cpTaskSchedulerPopup.scheduleTaskWithObservationDetails(taskScheduleInfo);

        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    updateOccurrenceDetailsWithObservations(taskSeriesName, taskOccurrenceInfo, scheduleTime?){
        try {

            // this.clickOnTaskSeriesOccurrenceByIndex(taskSeriesName, taskOccurrenceInfo.occurrenceIndex);

            this.clickOnTaskSeriesOccurrenceByHour(taskSeriesName, taskOccurrenceInfo.occurrenceHour)

            browser.sleep(1000);

            Pages.cpTaskOccurrencePopup.updateOccurrenceDetailsWithObservations(taskOccurrenceInfo, scheduleTime);

        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getPositionByTaskName(taskSeriesName){
        try {
            let __sPos, __ePos, __avaHour;
            return this.productTaskList.then((list) => {
                let __taskIndex = list.indexOf(taskSeriesName);
                if(__taskIndex == 0){ 
                    __sPos =  this.eleNumberOfHoursDisplayed.count().then((count) => { return 1;});
                    __ePos = this.eleNumberOfHoursDisplayed.count().then((count) => { return count + 1; });
                    return { startPosition : __sPos, endPosition : __ePos };
                } else if(__taskIndex >= 1){
                    __sPos  = this.eleNumberOfHoursDisplayed.count().then((count) => { return __taskIndex * count + 1; });                
                    __ePos = this.eleNumberOfHoursDisplayed.count().then((count) => { return __taskIndex * count + count + 1; });
                    return { startPosition : __sPos, endPosition : __ePos };
                } else {
                    //fail test as product list not identified
                }
            })
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }    
    }

    getNumberOfTaskOccurrenceToSchedule(taskScheduleInfo) {
        try {
            let __numberOfTaskOccurrences;
            switch (taskScheduleInfo.occurrenceFrequency) {
                case 'once':
                    __numberOfTaskOccurrences = 1;
                break;
                case 'recurring':
                    __numberOfTaskOccurrences = ((taskScheduleInfo.scheduleEndTime - taskScheduleInfo.scheduleStartTime)/taskScheduleInfo.repeatEveryHour) + 1;
                    break;                  
                default:
                    break;
            }

            return __numberOfTaskOccurrences;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getOccurrenceHoursToSchedule(taskScheduleInfo) {
        try {
            let __numberOfTaskOccurrences = await this.getNumberOfTaskOccurrenceToSchedule(taskScheduleInfo);
            let occurrences = new Array;
            occurrences[0] = taskScheduleInfo.scheduleStartTime;
            for (let index = 1; index < __numberOfTaskOccurrences; index++) {
                occurrences[index] = Number(occurrences[index-1]) + Number(taskScheduleInfo.repeatEveryHour);
            }
            return occurrences;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async calculateExpectedOccurrenceCountAndStatus(taskScheduleInfo) {
        try {
            
            let __numberOfTaskOccurrences;
            let __occurrences = new Array, expectedOccurrenceStatus = new Array;
            let __currentTime = new Date().getHours();

            __occurrences = await this.getOccurrenceHoursToSchedule(taskScheduleInfo);
            
            __numberOfTaskOccurrences = await this.getNumberOfTaskOccurrenceToSchedule(taskScheduleInfo);

            if(__occurrences.length === __numberOfTaskOccurrences) {
                for(let index=0; index < __numberOfTaskOccurrences; index++){
                    if(__occurrences[index] == __currentTime ) {
                        expectedOccurrenceStatus[index] = 'Duenow';
                    } else if(__occurrences[index] < __currentTime) {
                        expectedOccurrenceStatus[index] = 'Overdue';
                    } else if(__occurrences[index] > __currentTime) {
                        expectedOccurrenceStatus[index] = 'Scheduled';
                    }
                }
            } else {
                FrameworkComponent.logHelper.info('Number of Task Occurrences mismatched');
                throw 'Number of Task Occurrences mismatched';
            }

            return {expectedOccurrenceCount: __numberOfTaskOccurrences, expectedOccurrenceStatus };
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getCompletedTaskOccurrenceDetailsList(specFileData) {
        try {

            // await APILibraryController.careplannerLibrary.apiGetAggregatedDataByOrderId(specFileData);

            let __aggregatedDataList = new Array;
            specFileData.Data.Client.Patient.Visit.Category.forEach(category => {
                
                category.TaskSeriesList.forEach(taskSeriesList => {

                    if(taskSeriesList.HourlyTaskOccurrences != undefined && taskSeriesList.HourlyTaskOccurrences.length > 0) {
                        
                        taskSeriesList.HourlyTaskOccurrences.forEach(occurrence => {
                            let __occurrenceList = new Array;
                            if(occurrence.TaskOccurrences[0].StatusName === 'Complete') {
                                __occurrenceList.push(category.CategoryName);
                                __occurrenceList.push(category.CategoryId);
                                __occurrenceList.push(taskSeriesList.TaskName);
                                __occurrenceList.push(taskSeriesList.TaskSeriesId);
                                __occurrenceList.push(occurrence.TaskOccurrences[0].TaskOccurrenceId);
                                __occurrenceList.push(occurrence.Hour);
                                __occurrenceList.push(occurrence.Date);
                                __occurrenceList.push(occurrence.Day);
                                __occurrenceList.push(occurrence.TaskOccurrences[0].StatusName);
                                __aggregatedDataList.push(__occurrenceList);
                            }
                        })
                    }
                })
            })
            FrameworkComponent.logHelper.info(__aggregatedDataList);
            return __aggregatedDataList;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}