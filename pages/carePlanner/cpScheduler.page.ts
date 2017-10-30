import {$, browser, element, by, By, ExpectedConditions } from "protractor";

export class CarePlannerSchedulerPage{

    

    // Page elements ////////////////////////

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

    get pageTitle():any {
        return browser.getTitle();
    }

    get clientName():any {
        return this.eleclientName.getText();
    }

    get petName(): any {
        return this.elepetName.getText();
    }

    get speciesName(): any {
        return this.eleSpecies.getText();
    }

    get drName():any {
        try{
            let varName : any ;
            var EC = ExpectedConditions;
            browser.wait(EC.presenceOf(this.eledrName),5000).then(() =>{
                varName = this.eledrName.getText();
            });
            return varName;
        } catch(e){
            console.log(e);
        }
    }

    get drShift():any {
        return this.eledrshift.getText();
    }

    get wellNess():any {
        return this.eleWellness.getText();
    }
}


    // getTitle():any {
    //     return browser.getTitle();
    // }

    // getClientName():any {
    //     return this.clientName.getText();
    // }

    // getPetName():any {
    //     return this.elepetName.getText();
    // }

    // getSpeciesName():any {
    //     return this.speciesName.getText();
    // }
