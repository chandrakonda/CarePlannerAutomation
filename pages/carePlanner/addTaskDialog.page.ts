import { $, browser, element, by, By, ExpectedConditions } from "protractor";

export class AddOptionalTaskDialog {
    //Page Objects
    addTaskDialogButton = element(by.xpath("//button[contains(@id,'addtask')]"));
    addTasksToScheduleButton = element(by.xpath("//wj-popup[@id='addtask']//div[@class='buttons pull-right oButton']//button[contains(text(),'Add to schedule')]"));
    cancelButton = element(by.xpath("//wj-popup[@id='addtask']//button[contains(text(),'Cancel')]"));
    addTaskHeaderClose = element(by.xpath("//wj-popup[@id='addtask']//div[@class='icon closeButton']"));

    addTaskDialogHeaderTitle = element(by.xpath("//wj-popup[@id='addtask']//div[contains(@class,'text')]"));

    // these will need to be replaced with more generic/better locators later
    // because hardcoding is bad
    bodyWeightListItem = element(by.xpath("//wj-popup[@id='addtask']//*[@id='patientcare']//div[contains(text(),'Body weight')]"));
    
    selectedListHeader = element(by.xpath("//wj-popup[@id='addtask']//wj-flex-grid[@id='selected']//div[@class='wj-cell wj-group']"));
    selectedBodyWeightListItem = element(by.xpath("//wj-popup[@id='addtask']//wj-flex-grid[@id='selected']//div[contains(text(),'Body weight')]"));

    

    // element(by.xpath());
    //page methods
    openAddTaskDialog() {
        try {this.addTaskDialogButton.click();}
        catch (error) {browser.logger.error(error);}
    }

    closeAddTaskDialog() {
        try {this.addTaskHeaderClose.click();}
        catch (error) {browser.logger.error(error);}
    }

    selectTaskFromList(){
        try {this.bodyWeightListItem.click();}
        catch (error) {browser.logger.error(error);}        
    }

    addSelectedTasksToScheduler(){
        try {this.addTasksToScheduleButton.click();}
        catch (error) {browser.logger.error(error);}                
    }

    get selectedTaskName():any {
        try { return this.selectedBodyWeightListItem.getText();}
        catch (error) {browser.logger.error(error);}        
    }

    get getSelectHeaderText():any {
        //to get the count, slice (-3) in the calling method
        try {return this.selectedListHeader.getText();} 
        catch (error) {browser.logger.error(error);}                
    }

    get getAddTaskHeaderTitle():any {
        try { return this.addTaskDialogHeaderTitle.getText();}
        catch (error) {browser.logger.error(error);}            
    }


}
