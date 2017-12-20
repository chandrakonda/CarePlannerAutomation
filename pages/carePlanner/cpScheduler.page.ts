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


  get categoryCount() {
    try {
      let categoryCount = this.eleCategoryList.count().then((catCount: number) => {
        return catCount;
      });
      return categoryCount;
    } catch (error) {
      browser.logger.error(error);
    }
  }

  get productTaskListCount() {
    try {
      let productTaskListCount = this.elePrdTaskList.count().then((taskCount: number) => {
        return taskCount;
      });
      return productTaskListCount;
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
      let prdTaskList = this.elePrdTaskList.getText().then(prdList => {
        return prdList;
      });
      
      return prdTaskList;
    } catch (error) {
      browser.logger.error(error);
    }
  }

  async clickOnTaskByName(taskSeriesName: string) {
    try {
      let _taskSeriesName = taskSeriesName.slice(0, 23);
      let _xpathValue: string = "//div[contains(@class,'wj-cell') and contains(@class,'wj-frozen') and not(contains(@class,'wj-group'))]/descendant::div[contains(@class,'itemname') and contains(text(),'" + _taskSeriesName + "')]";
      let ele1 = element(by.xpath(_xpathValue));
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

  getNumberOfTaskOccurrence(startPosition, endPosition) {
    try {
      return element.all(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=" +startPosition +"and not(position() >=" +endPosition +")]/descendant::li"))
        .count()
        .then(count => {
          browser.logger.info("Task occurrence count is : " + count);
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

  async verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, expectedNumberOfTaskOccurrences){
    try {
      browser.sleep(1000);
      let taskOccurrenceCount = await this.getNumberOfTaskOccurrence(startPosition, endPosition).then((count) => {return count});
      await expect(taskOccurrenceCount).toBe(expectedNumberOfTaskOccurrences);
    } catch (error) {
      browser.logger.error(error);
    }
  }

  async verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, expectedStatus){
    try {
      let taskOccurrenceStatus:any = await this.getTaskOccurrenceStatus(startPosition, endPosition);
      for (let index = 0; index < taskOccurrenceStatus.length; index++) {
        browser.logger.info("Status of the occurrence " + index + " is : " + taskOccurrenceStatus[index].split(' ')[0]);
        await expect(taskOccurrenceStatus[index].split(' ')[0]).toEqual(expectedStatus[index]);
      }
    } catch (error) {
      browser.logger.error(error);
    }
  }

  async verifyTheStatusOfTaskOccurrenceUpdatedByIndex(startPosition, endPosition, occurrenceIndex, expectedStatus){
    try {
      browser.sleep(2000);
      let taskOccurrenceStatus:any = await this.getTaskOccurrenceStatus(startPosition, endPosition);
      browser.logger.info("Status of the occurrence " + occurrenceIndex + " is : " + taskOccurrenceStatus[occurrenceIndex].split(' ')[0]);
      expect(taskOccurrenceStatus[occurrenceIndex].split(' ')[0]).toEqual(expectedStatus);      
    } catch (error) {
      browser.logger.error(error);
    }
  }

  async verifyTheStatusOfTaskOccurrenceCanceled(startPosition, endPosition, canceledIndex, expectedStatus){
    try {
      let taskOccurrenceStatus:any = await this.getTaskOccurrenceStatus(startPosition, endPosition);

      if(expectedStatus.length == 1){
        expect(taskOccurrenceStatus.length).toEqual(0);
      }else if ( canceledIndex == 0 && expectedStatus[canceledIndex] == 'Canceled') {
        expectedStatus.splice(canceledIndex, 1);
        for (let index = 0; index < taskOccurrenceStatus.length; index++) {
          browser.logger.info("Status of the occurrence " + index + " is : " + taskOccurrenceStatus[index].split(' ')[0]);
          expect(taskOccurrenceStatus[index].split(' ')[0]).toEqual(expectedStatus[index]);
        }
      }     
    } catch (error) {
      browser.logger.error(error);
    }
  }

  clickOnOccurrenceByScheduledTime(scheduledTime) {
    try {
      let startPosition = scheduledTime+1;
      let endPosition = scheduledTime + 2;
      let occurrences = element(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=" + startPosition +"and not(position() >=" + endPosition +")]/descendant::li"))
      .getWebElement();
      browser.actions().mouseMove(occurrences).click().perform();
    } catch (error) {
      browser.logger.error(error);
    }
  }

  async verifyTheStatusOfTaskOccurrenceByTime(time, expectedStatus){
    try {
      let startPosition = time + 1;
      let endPosition = time + 2;
      browser.sleep(2000);
      let taskOccurrenceStatus:any = await this.getTaskOccurrenceStatus(startPosition, endPosition);
      browser.logger.info("Status of the occurrence time '" + time + "' hour is : " + taskOccurrenceStatus[0].split(' ')[0]);
      expect(taskOccurrenceStatus[0].split(' ')[0]).toEqual(expectedStatus);      
    } catch (error) {
      browser.logger.error(error);
    }
  }

  // async clickOnTaskName(taskSeriesName: string) {
  //   try {
  //     var EC = protractor.ExpectedConditions;
  //     let __xpath: string = "//div[contains(@class,'wj-cell wj-alt wj-frozen')]/descendant::div[@class='itemname'][../../../../../../preceding-sibling::div[contains(@class,'wj-cell wj-group wj-frozen')]/descendant::div/div[contains(@class,'groupheader_txt') and contains(text(),'" + taskSeriesName + "')]]";
  //     let ele1 = element(by.xpath(__xpath));
  //     browser.wait(EC.visibilityOf(ele1), 5000);
  //     ele1.click();
  //     browser.sleep(3000);
  //   } catch (error) {
  //     browser.logger.error(error);
  //   }
  // }

  // waitForZoomOut() {
  //   try {
  //     let eleXpath = element.all(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() =24]"));
  //     // var EC = protractor.ExpectedConditions;
  //     // browser.executeScript("document.body.style.zoom='80%'");
  //     //browser.wait(EC.visibilityOf(eleXpath), 10000);
  //     browser.wait(this.waitFor(eleXpath,1), 10000);
  //   } catch (error) {
  //     browser.logger.error(error);
  //   }
  // }

  // async waitForZoomOut1(){
  //   try {
  //     let eleCount = element.all(by.xpath("//*[@id='wijgridObject']/descendant::div[@class='wj-colheaders']/div[contains(@class,'wj-header-alt')]"));
  //     browser.wait(this.waitFor(eleCount,24), 10000);
  //   } catch (error) {
  //     browser.logger.error(error);
  //   }
  // }

  // waitFor(elementFinder, expectedCount){
  //   try {
  //     return elementFinder.count().then((elementCount) => {
  //       browser.logger.info("row element count to be displayed : " + expectedCount + "and " +  (elementCount >= expectedCount) );
  //       browser.logger.info("row element count displayed as : " + elementCount);
  //       return elementCount === expectedCount;
  //     });
  //   } catch (error) {
  //     browser.logger.error(error);
  //   }
  // }

  // async scrollToElement(){
  //   try {
  //     let scrollElement = element(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt')][position() >=0][1]"));
  //     let divScrollElement = element(by.xpath("//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cells') and @wj-part='cells']"));
     
  //     await browser.controlFlow().execute(function() {
  //       browser.executeScript('arguments[0].scrollIntoView()', scrollElement);
  //     });
     
  //     await browser.controlFlow().execute(function() {
  //       scrollElement.getLocation().then((location) => {
  //           console.log(location.x + ',' + location.y);
  //           //return browser.executeScript('window.scrollTo('+location.x+ ','+ location.y+');');
  //           return browser.executeScript('arguments[0].scrollIntoView()',scrollElement.getWebElement());
  //       });
  //     });
      
  //     // browser.logger.info(browser.executeScript('arguments[0].offsetWidth',scrollElement.getWebElement()));

  //     // browser.executeScript('arguments[1].scrollLeft = arguments[0].offsetWidth;',scrollElement.getWebElement(),divScrollElement.getWebElement());

  //     browser.logger.info("Scroll Performed");
  //     browser.sleep(2000);
  //   } catch (error) {
  //     browser.logger.error(error);
  //   }
  // }
}
