import { arrays } from 'typescript-collections/dist/lib';
import { $, browser, element, by, By, ExpectedConditions } from "protractor";
import * as Collections from 'typescript-collections';
import * as console from 'console';

export class CarePlannerSchedulerPage {

  eleWJGrid = element(by.xpath(".//wj-flex-grid[@id='wijgridObject']"));
  elePrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[@class='task-table']/descendant::div[@class='itemname']"));

  eleScheduledPrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[contains(@class,'wj-frozen-col')]/descendant::div[contains(@class,'unscheduled-cell') and not(*)]"));
  eleOverduePrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[@class='task-table']/descendant::div[@class='overduecount-cell']"));
  eleNonScheduledPrdTaskList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[@class='task-table']/descendant::div[@class='occurrence-text']"));
  eleCategoryList = element.all(by.xpath(".//wj-flex-grid[@id='wijgridObject']/descendant::div[contains(@class,'wj-frozen-col')]/descendant::div[contains(@class,'groupheader_txt')]"));

  // div[class^='groupheader_txt']


  get categoryCount() {
    try {
      return this.eleCategoryList.count().then((catCount: number) => { return catCount; });
    } catch (error) {
      console.log(error);
    }
  }

  get productTaskListCount() {
    try {
      return this.elePrdTaskList.count()
        .then((taskCount: number) => {
          return taskCount
        });
    } catch (error) {
      console.log(error);
    }
  }

  get scheduledProductTaskCount() {
    try {
      return this.eleScheduledPrdTaskList.count().then((taskCount: number) => { return taskCount });
    } catch (error) {
      console.log(error);
    }
  }

  get nonScheduledProductTaskCount() {
    try {
      return this.eleNonScheduledPrdTaskList.count().then((taskCount: number) => { return taskCount });
    } catch (error) {
      console.log(error);
    }
  }

  get categoryNameList() {
    try {
      return this.eleCategoryList.getText().then((catName: string) => { return catName });
    } catch (error) {
      console.log(error);
    }
  }

  get productTaskList() {
    try {
      return this.elePrdTaskList.getText().then((prdList) => { return prdList });
    } catch (error) {
      console.log(error);
    }
  }


  async clickOnTaskName(taskName: string) {
    //try {
      //let ele1 = element(by.xpath(".//wj-flex-grid[@id='wijgridObject']//div[contains(@class,'wj-frozen-col') and not(contains(@class,'wj-group')) and not(contains(@class,'wj-wrap'))][1]//div[@class='itemname']"));
      let ele1 = element(by.xpath("//div[contains(@class,'wj-cell wj-alt wj-frozen')]/descendant::div[@class='itemname'][../../../../../../preceding-sibling::div[contains(@class,'wj-cell wj-group wj-frozen')]/descendant::div/div[contains(@class,'groupheader_txt') and contains(text(),'Diagnostics')]]"));
      // browser.executeScript("arguments[0].click();",ele1);
      ele1.click();
       browser.sleep(3000);
    //   browser.logger.info("Clicking on the task Name: " + taskName);
    //   await this.elePrdTaskList.filter((elem) => {
    //     return elem.getText().then((text) => {
    //       return text == taskName;
    //     })
    //   }).click();
    // } catch (error) {
    //   browser.logger.info(error);
    
    // }
  }

  IsTaskScheduled(){
    try {
      return element(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt') and not(contains(@class,'wj-frozen'))][position() >=43 and not(position() >44)]/div/descendant::li/div[contains(@class,'occurance-icon')]")).isDisplayed()
      .then((value)=>{
        browser.logger.info("The Value is : " + value);
        return  value;
      });
    } catch (error) {
        browser.logger.error(error);    
    }
  }

  clickScheduledTaskItem(){
    try {
      let item = element(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt') and not(contains(@class,'wj-frozen'))][position() >=43 and not(position() >44)]/descendant::li"));
      item.click();           
    } catch (error) {
      browser.logger.error(error);    
    }
  }

  TaskOccurenceStatus(){
    try {
      let item = element(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt') and not(contains(@class,'wj-frozen'))][position() >=43 and not(position() >44)]/descendant::li"));
      return item.getAttribute('class').then((status:string) =>{
        browser.logger.info("Task Occurence Status is: " + status);
          return status;
      });
    } catch (error) {
      browser.logger.error(error);    
    }
  }


}






