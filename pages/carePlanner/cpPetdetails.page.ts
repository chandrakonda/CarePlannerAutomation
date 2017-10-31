import {$, browser, element, by, By, ExpectedConditions } from "protractor";

export class CarePlannerPetDetails{

// ToDO: 
// We need to implement try catch.
// Need to implement log file.
// more information need to add more file.


    

    // Page elements ////////////////////////
    //eletmp = browser.driver.findElement(by.xpath("test"));
    eleclientName = element(by.xpath(".//div[@class='petname']/following-sibling::span"));
    elepetName = element(by.xpath(".//div[@class='petname']"));
    eledrName = element(by.xpath(".//label[text()='PRIMARY']/following-sibling::span"));
    eledrshift =  element(by.xpath(".//label[text()='DAY/SHIFT']/following-sibling::span"));
    eleWellness =  element(by.xpath(".//li[@client_wellness cellinfo wellness']//span[@class='txt']"));
    eleAlert =  element(by.xpath(".//li[@client_wellness cellinfo vcaAlert']//span[@class='txt']"));
    

    eleSpecies = element(by.xpath(".//div[@class='species']"));
    elePetGender = element(by.xpath(".//div[@class='bBox two']/div/div"));
    eleAge = element(by.xpath(".//div[@class='bBox one']/div/div"));
    eleWeight = element(by.xpath(".//div[@class='col-md-3 bBox']/div/div"));
    eleRecorded = element(by.xpath(".//div[@class='col-md-4 bBox']/div/div"));

    //eleTechnicianDropdown = element(by.xpath(".//div[normalize-space(text())='Choose technician']/following-sibling::div"));
    eleTechnicianValue = element(by.xpath(".//label[text()='TECHNICIAN']/following-sibling::div//i/following-sibling::div[contains(@class,'ng-tns')]"));
    //eleSelectLocationDropdown = element(by.xpath(".//div[normalize-space(text())='Select a location']/following-sibling::div"));
    eleLocationDropdownValue = element(by.xpath(".//div[@class='block navigation']/div[1]//i[@class='dropdown icon']/following-sibling::div[contains(@class,'ng-tns')]"));
    //eleSelectCageDropdown = element(by.xpath(".//div[normalize-space(text())='Select a cage']/following-sibling::div"));
    eleCageDropdownValue = element(by.xpath(".//div[@class='block navigation']/div[2]//i[@class='dropdown icon']/following-sibling::div[contains(@class,'ng-tns')]"));
    
    /////////////////////
    eleAddTaskButton = element(by.xpath(".//button[@id='addtask']"));
    eleCareNotesButton = element(by.xpath(".//button[@id='carenotes']"));
    eleEnterCareNotes = element(by.xpath(".//textarea[@placeholder='Add care note here.']"));
    eleAddCareNoteButton = element(by.xpath(".//button[text()='Add care note']")); 

    navigateTo(){
        browser.get(browser.baseUrl);
        //console.log(browser.myname);
    }

    get pageTitle(): any {
        try {
          console.log("***********getting page title***************");
          return browser.getTitle();
        } catch (error) {
          console.log(error);
        }
      }
    
      get clientName(): any {
        try {
          return this.eleclientName.getText();
        } catch (error) {
          console.log(error);
        }
      }
    
      get petName(): any {
        try {
          return this.elepetName.getText();
        } catch (error) {
          console.log(error);
        }
      }
    
      get speciesName(): any {
        try {
          return this.eleSpecies.getText();
        } catch (error) {
          console.log(error);
        }
      }
    
      get drName(): any {
        try {
          let doctorName: any;
          browser
            .wait(ExpectedConditions.presenceOf(this.eledrName), 5000)
            .then(() => {
              doctorName = this.eledrName.getText();
            });
          return doctorName;
        } catch (error) {
          console.log(error);
        }
      }
    
      get drShift(): any {
        try {
          return this.eledrshift.getText();
        } catch (error) {
          console.log(error);
        }
      }
    
      get wellness(): any {
        try {
          return this.eleWellness.getText();
        } catch (error) {
          console.log(error);
        }
      }
    }    