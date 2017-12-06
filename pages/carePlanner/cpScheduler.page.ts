import { ElementArrayFinder, ElementFinder } from "protractor/built/element";
import * as stringDecoder from 'string_decoder';
import { resolve } from "dns";
import { arrays } from "typescript-collections/dist/lib";
import { $, browser, element, by, By, ExpectedConditions, protractor } from "protractor";
import * as Collections from 'typescript-collections';

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
      return this.eleCategoryList.count().then((catCount: number) => {
        return catCount;
      });
    } catch (error) {
      browser.logger.error(error);
    }
  }

  get productTaskListCount() {
    try {
      return this.elePrdTaskList.count().then((taskCount: number) => {
        return taskCount;
      });
    } catch (error) {
      browser.logger.error(error);
    }
  }

  get scheduledProductTaskCount() {
    try {
      return this.eleScheduledPrdTaskList.count().then((taskCount: number) => {
        return taskCount;
      });
    } catch (error) {
      browser.logger.error(error);
    }
  }

  get nonScheduledProductTaskCount() {
    try {
      return this.eleNonScheduledPrdTaskList
        .count()
        .then((taskCount: number) => {
          return taskCount;
        });
    } catch (error) {
      browser.logger.error(error);
    }
  }

  get categoryNameList() {
    try {
      return this.eleCategoryList.getText().then((catName: string) => {
        return catName;
      });
    } catch (error) {
      browser.logger.error(error);
    }
  }

  get productTaskList() {
    try {
      return this.elePrdTaskList.getText().then(prdList => {
        return prdList;
      });
    } catch (error) {
      browser.logger.error(error);
    }
  }

  async clickOnTaskByName(taskSeriesName: string) {
    try {
      var EC = protractor.ExpectedConditions;
      let _taskSeriesName = taskSeriesName.slice(0, 23);
      let _xpathValue: string = "//div[contains(@class,'wj-cell') and contains(@class,'wj-frozen') and not(contains(@class,'wj-group'))]/descendant::div[contains(@class,'itemname') and contains(text(),'" + _taskSeriesName + "')]";
      let ele1 = element(by.xpath(_xpathValue));
      ele1.click();
      browser.sleep(3000);
    } catch (error) {
      browser.logger.error(error);
    }
  }

  async clickOnTaskName(taskSeriesName: string) {
    try {
      var EC = protractor.ExpectedConditions;
      let __xpath: string = "//div[contains(@class,'wj-cell wj-alt wj-frozen')]/descendant::div[@class='itemname'][../../../../../../preceding-sibling::div[contains(@class,'wj-cell wj-group wj-frozen')]/descendant::div/div[contains(@class,'groupheader_txt') and contains(text(),'" + taskSeriesName + "')]]";
      let ele1 = element(by.xpath(__xpath));
      browser.wait(EC.visibilityOf(ele1), 5000);
      ele1.click();
      browser.sleep(3000);
    } catch (error) {
      browser.logger.error(error);
    }
  }

  async isTaskSeriesPopUpdisplayed() {
    try {
      let __xpath: string = ".//div[contains(@id,'lsu_modal')]";
      return element(by.xpath(__xpath))
        .isDisplayed()
        .then(value => {
          if ((value = true)) {
            return true;
          } else {
            return false;
          }
        });
    } catch (error) {
      browser.logger.error(error);
    }
  }

  isTaskScheduled() {
    try {
      return element(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt') and not(contains(@class,'wj-frozen'))][position() >=43 and not(position() >44)]/div/descendant::li/div[contains(@class,'occurance-icon')]"))
        .isDisplayed()
        .then(value => {
          browser.logger.info("Tasks is scheduled " + value);
          return value;
        });
    } catch (error) {
      browser.logger.info("Unable to find scheduled task in grid. Please check exception details");
      browser.logger.error(error);
    }
  }

  // isTaskScheduled1(elementXpath: string) {
  //   try {
  //     return element(by.xpath(elementXpath))
  //       .isDisplayed()
  //       .then(value => {
  //         browser.logger.info("Task is scheduled.. : " + value);
  //         return value;
  //       });
  //   } catch (error) {
  //     browser.logger.error(error);
  //   }
  // }

  // clickScheduledTaskItem() {
  //   try {
  //     let item = element(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt') and not(contains(@class,'wj-frozen'))][position() >=43 and not(position() >44)]/descendant::li"));
  //     item.click();
  //   } catch (error) {
  //     browser.logger.error(error);
  //   }
  // }

  // clickScheduledTaskItem1(elementXpath: string) {
  //   try {
  //     let item = element(by.xpath(elementXpath));
  //     item.click();
  //   } catch (error) {
  //     browser.logger.error(error);
  //   }
  // }

  // taskOccurenceStatus() {
  //   try {
  //     let item = element(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt') and not(contains(@class,'wj-frozen'))][position() >=43 and not(position() >44)]/descendant::li"));
  //     return item.getAttribute("class").then((status: string) => {
  //       browser.logger.info("Task occurence Status is: " + status);
  //       return status;
  //     });
  //   } catch (error) {
  //     browser.logger.error(error);
  //   }
  // }

  // taskOccurenceStatus1(elementXpath: string) {
  //   try {
  //     let item = element(by.xpath(elementXpath));
  //     return item.getAttribute("class").then((status: string) => {
  //       browser.logger.info("Task Occurence Status is: " + status);
  //       return status;
  //     });
  //   } catch (error) {
  //     browser.logger.error(error);
  //   }
  // }

  getNumberOfTaskOccurrence(startPosition, endPosition) {
    try {
      return element.all(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=" +startPosition +"and not(position() >=" +endPosition +")]/descendant::li"))
        .count()
        .then(count => {
          return count;
        });
    } catch (error) {
      browser.logger.error(error);
    }
  }

  clickOnOccurrenceByIndex(startPosition, endPosition, index) {
    try {
      let occurrences = element.all(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=" +startPosition +"and not(position() >=" +endPosition +")]/descendant::li"))
      .get(index).getWebElement();
      browser.actions().mouseMove(occurrences).click().perform();
    } catch (error) {
      browser.logger.error(error);
    }
  }

  getTaskOccurrenceStatus(startPosition, endPosition) {
    try {
      let occurrence = element.all(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=" + startPosition + "and not(position() >=" + endPosition + ")]/descendant::li"));
      return occurrence.getAttribute("class")
        .then((className) => {
          return className;
      });
    } catch (error) {
      browser.logger.error(error);
    }
  }

  waitForZoomOut() {
    try {
      let eleXpath = element.all(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() =24]"));
      // var EC = protractor.ExpectedConditions;
      // browser.executeScript("document.body.style.zoom='80%'");
      //browser.wait(EC.visibilityOf(eleXpath), 10000);
      browser.wait(this.waitFor(eleXpath,1), 10000);
    } catch (error) {
      browser.logger.error(error);
    }
  }

  async waitForZoomOut1(){
    try {
      let eleCount = element.all(by.xpath("//*[@id='wijgridObject']/descendant::div[@class='wj-colheaders']/div[contains(@class,'wj-header-alt')]"));
      browser.wait(this.waitFor(eleCount,24), 10000);
    } catch (error) {
      browser.logger.error(error);
    }
  }

  waitFor(elementFinder, expectedCount){
    try {
      return elementFinder.count().then((elementCount) => {
        browser.logger.info("row element count to be displayed : " + expectedCount + "and " +  (elementCount >= expectedCount) );
        browser.logger.info("row element count displayed as : " + elementCount);
        return elementCount === expectedCount;
      });
    } catch (error) {
      browser.logger.error(error);
    }
  }

  async scrollToElement(){
    try {
      let scrollElement = element(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=0][1]"));
      let divScrollElement = element(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cells') and @wj-part='cells']"));
     
      await browser.controlFlow().execute(function() {
        browser.executeScript('arguments[0].scrollIntoView()', scrollElement);
      });
     
      await browser.controlFlow().execute(function() {
        scrollElement.getLocation().then((location) => {
            console.log(location.x + ',' + location.y);
            //return browser.executeScript('window.scrollTo('+location.x+ ','+ location.y+');');
            return browser.executeScript('arguments[0].scrollIntoView()',scrollElement.getWebElement());
        });
      });
      
      // browser.logger.info(browser.executeScript('arguments[0].offsetWidth',scrollElement.getWebElement()));

      // browser.executeScript('arguments[1].scrollLeft = arguments[0].offsetWidth;',scrollElement.getWebElement(),divScrollElement.getWebElement());

      browser.logger.info("Scroll Performed");
      browser.sleep(2000);
    } catch (error) {
      browser.logger.error(error);
    }    
  }

  //***************** Attempt to get the product list index and xpath of the row occurrence*************/
  // get productTaskList1(){
  //   try {
  //     let list= this.elePrdTaskList.getText().then((prdList) => {
  //       return  prdList;
  //       });
  //     return list;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // getXpathForTaskSeries(taskSeriesName):string {
  //   let startPosition, endPosition;
  //   let taskIndex:number = this.productTaskList1.indexOf(taskSeriesName);
  //   if(taskIndex == 0){
  //     startPosition = 1 ;
  //     endPosition = 24;
  //   } else if(taskIndex >= 1){
  //     startPosition =  taskIndex * 24 + 1;
  //     endPosition = startPosition + 23;
  //   }

  //   return "//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >="+startPosition + "and not(position() >="+endPosition+")]/descendant::li";
  // }

  // GetNumberOfTaskOccurrenceByTaskName(taskSeriesName){
  //   try {
  //     let xpathValue:string = this.getXpathForTaskSeries(taskSeriesName);
  //     //return element.all(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >="+startPosition + "and not(position() >="+endPosition+")]/descendant::li"))
  //     return element.all(by.xpath(xpathValue))
  //     .count().then((count)=>{return count});
  //   } catch (error) {
  //     browser.logger.error(error);
  //   }
  // }
}
