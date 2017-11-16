import { arrays } from 'typescript-collections/dist/lib';
import { $$ } from "protractor/built";
import { ElementFinder, WebdriverWebElement } from "protractor/built/element";
import { browser, element, by, By, ExpectedConditions } from "protractor";
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

 
  get categoryCount(){
    try {      
      return this.eleCategoryList.count().then((catCount:number) => { return  catCount; });
    } catch (error) {
      console.log(error);
    }
  }

  get productTaskListCount(){
    try {
      return this.elePrdTaskList.count().then((taskCount:number) => { return taskCount });
    } catch (error) {
      console.log(error);
    }
  }

  get scheduledProductTaskCount(){
    try {
      return this.eleScheduledPrdTaskList.count().then((taskCount:number) => { return taskCount });
    } catch (error) {
      console.log(error);
    }
  }

  get nonScheduledProductTaskCount(){
    try {
      return this.eleNonScheduledPrdTaskList.count().then((taskCount:number) => { return taskCount });
    } catch (error) {
      console.log(error);
    }
   }
  
   get categoryList(){
     try {
      return this.eleCategoryList.getText().then((catName:string)=>{ return catName }); 
     } catch (error) {
       console.log(error);
     }
   }

   get productTaskList(){
     try {
       return this.elePrdTaskList.getText().then((prdList) => { return prdList}); 
     } catch (error) {
       console.log(error);
     }
   }
  }