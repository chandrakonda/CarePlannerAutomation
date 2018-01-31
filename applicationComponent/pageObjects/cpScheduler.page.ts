import { FrameworkComponent } from '../../frameworkComponent';
import { $, browser, element, by, By, ExpectedConditions, protractor } from "protractor";
import { Pages } from './pages';


export class CareplannerSchedulerPage{
    
    eleWJGrid = element(by.xpath(".//wj-flex-grid[@id='wijgridObject']"));
    elePrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[@class='task-table']/descendant::div[@class='itemname']"));
    elePrdTaskListText = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[@class='task-table']/descendant::div[@class='itemname']/text()[not(descendant::span)]"));
    eleScheduledPrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[contains(@class,'wj-frozen-col')]/descendant::div[contains(@class,'unscheduled-cell') and not(*)]"));
    eleOverduePrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[@class='task-table']/descendant::div[@class='overduecount-cell']"));
    eleNonScheduledPrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[@class='task-table']/descendant::div[@class='occurrence-text']"));
    eleCategoryList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[contains(@class,'wj-frozen-col')]/descendant::div[contains(@class,'groupheader_txt')]"));


    get categoryCount() {
        try {
            let categoryCount = this.eleCategoryList.count().then((catCount: number) => {
                return catCount;
            });
            return categoryCount;
        } catch (error) {        
            FrameworkComponent.logHelper.error(error);
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
        }
    }

    get scheduledProductTaskCount() {
        try {
            return this.eleScheduledPrdTaskList.count().then((taskCount: number) => {
                return taskCount;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    get nonScheduledProductTaskCount() {
        try {
            return this.eleNonScheduledPrdTaskList.count().then((taskCount: number) => {
                return taskCount;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    get categoryNameList() {
        try {
            return this.eleCategoryList.getText().then((catName: string) => {
                return catName;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
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
        }
    }

    async clickOnTaskByName(taskSeriesName: string) {
        try {
            let _taskSeriesName = taskSeriesName.slice(0, 23);            
            let _xpathValue: string = "//div[contains(@class,'wj-cell') and contains(@class,'wj-frozen') and not(contains(@class,'wj-group'))]/descendant::div[contains(@class,'itemname') and normalize-space(text()) = '" + _taskSeriesName +"']";
            let ele1 = element(by.xpath(_xpathValue));
            ele1.click();
            browser.sleep(3000);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
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
        }
    }

    isTaskScheduled() {
        try {
            let __elementXpath: string = "//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt') and not(contains(@class,'wj-frozen'))][position() >=43 and not(position() >44)]/div/descendant::li/div[contains(@class,'occurance-icon')]";
            return element(by.xpath(__elementXpath)).isDisplayed().then(value => {
                FrameworkComponent.logHelper.info("Tasks is scheduled " + value);
                return value;
            });
        } catch (error) {
            FrameworkComponent.logHelper.info("Unable to find scheduled task in grid. Please check exception details");
            FrameworkComponent.logHelper.error(error);
        }
    }

    getNumberOfTaskOccurrence(startPosition, endPosition) {
        try {
            //let __elementXpath = "//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=" +startPosition +"and not(position() >=" +endPosition +")]/descendant::li";
            let __elementXpath = "//*[@id='wijgridObject']/descendant::div[not(contains(@class,'wj-cell wj-group')) and contains(@class,'wj-cell')][position() >=" +startPosition +"and not(position() >" +endPosition +")]/descendant::li";
            return element.all(by.xpath(__elementXpath)).count()
            .then(count => {
                FrameworkComponent.logHelper.info("Task occurrence count is : " + count);
                return count;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    clickOnOccurrenceByIndex(startPosition, endPosition, index) {
        try {
            //let __elementXpath = "//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=" +startPosition +"and not(position() >=" +endPosition +")]/descendant::li";
            let __elementXpath = "//*[@id='wijgridObject']/descendant::div[not(contains(@class,'wj-cell wj-group')) and contains(@class,'wj-cell')][position() >=" +startPosition +"and not(position() >" +endPosition +")]/descendant::li";
            let occurrences = element.all(by.xpath(__elementXpath)).get(index).getWebElement();
            browser.actions().mouseMove(occurrences).click().perform();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    getTaskOccurrenceStatus(startPosition, endPosition) {
        try {
            //let __elementXpath = "//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=" + startPosition + "and not(position() >=" + endPosition + ")]/descendant::li";
            let __elementXpath = "//*[@id='wijgridObject']/descendant::div[not(contains(@class,'wj-cell wj-group')) and contains(@class,'wj-cell')][position() >=" + startPosition + "and not(position() >" + endPosition + ")]/descendant::li";
            let occurrence = element.all(by.xpath(__elementXpath));
            return occurrence.getAttribute("class").then((className) => {
                FrameworkComponent.logHelper.info("Status of all the task occurrence : " + className);
                return className;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    async verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, expectedNumberOfTaskOccurrences){
        try {
            browser.sleep(1000);
            let taskOccurrenceCount = await this.getNumberOfTaskOccurrence(startPosition, endPosition).then((count) => {return count});
            await expect(taskOccurrenceCount).toBe(expectedNumberOfTaskOccurrences);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    async verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, expectedStatus){
        try {
            let taskOccurrenceStatus:any = await this.getTaskOccurrenceStatus(startPosition, endPosition);
            for (let index = 0; index < taskOccurrenceStatus.length; index++) {
                await FrameworkComponent.logHelper.info("Status of the occurrence " + index + " is : " + taskOccurrenceStatus[index].split(' ')[0]);
                await expect(taskOccurrenceStatus[index].split(' ')[0]).toEqual(expectedStatus[index]);
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    async verifyTheStatusOfTaskOccurrenceUpdatedByIndex(startPosition, endPosition, occurrenceIndex, expectedStatus){
        try {
            browser.sleep(2000);
            let taskOccurrenceStatus:any = await this.getTaskOccurrenceStatus(startPosition, endPosition);
            FrameworkComponent.logHelper.info("Status of the occurrence " + occurrenceIndex + " is : " + taskOccurrenceStatus[occurrenceIndex].split(' ')[0]);
            expect(taskOccurrenceStatus[occurrenceIndex].split(' ')[0]).toEqual(expectedStatus);      
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    async verifyTheStatusOfTaskOccurrenceCanceled(startPosition, endPosition, canceledIndex, expectedStatus){
        try {
            let taskOccurrenceStatus:any = await this.getTaskOccurrenceStatus(startPosition, endPosition);
            if(expectedStatus.length == 1){
                expect(taskOccurrenceStatus.length).toEqual(0);
            } else if ( canceledIndex == 0 && expectedStatus[canceledIndex] == 'Canceled') {
                expectedStatus.splice(canceledIndex, 1);
                for (let index = 0; index < taskOccurrenceStatus.length; index++) {
                    FrameworkComponent.logHelper.info("Status of the occurrence " + index + " is : " + taskOccurrenceStatus[index].split(' ')[0]);
                    expect(taskOccurrenceStatus[index].split(' ')[0]).toEqual(expectedStatus[index]);
                }
            }     
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    clickOnOccurrenceByScheduledTime(scheduledTime) {
        try {
            let startPosition = scheduledTime+1;
            let endPosition = scheduledTime + 2;
            let __elementXpath = "//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=" + startPosition +"and not(position() >=" + endPosition +")]/descendant::li";
            let occurrences = element(by.xpath(__elementXpath)).getWebElement();
            browser.actions().mouseMove(occurrences).click().perform();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    async verifyTheStatusOfTaskOccurrenceByTime(time, expectedStatus){
        try {
            let startPosition = time + 1;
            let endPosition = time + 2;
            browser.sleep(2000);
            let taskOccurrenceStatus:any = await this.getTaskOccurrenceStatus(startPosition, endPosition);
            FrameworkComponent.logHelper.info("Status of the occurrence time '" + time + "' hour is : " + taskOccurrenceStatus[0].split(' ')[0]);
            expect(taskOccurrenceStatus[0].split(' ')[0]).toEqual(expectedStatus);      
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    ScheduleTaskWithObservations(taskSeriesInfo){
        try {
           
            this.clickOnTaskByName(taskSeriesInfo.taskSeriesName);

            browser.sleep(1000);  

            Pages.cpTaskSchedulerPopup.scheduleTaskWithObservationDetails(taskSeriesInfo);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }
    }

    
}
