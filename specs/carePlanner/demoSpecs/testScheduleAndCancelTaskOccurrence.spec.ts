import { CarePlannerPetDetails } from '../../../pages/carePlanner/cpPetdetails.page';
import { CarePlannerSchedulerPage } from '../../../pages/carePlanner/cpScheduler.page';
import { CarePlannerEditSchedulePopup } from '../../../pages/carePlanner/cpEditSchedulePopup.page';
import { CarePlannerEditOccuranceSeriesPopup } from '../../../pages/carePlanner/cpEditOccurrenceSeriesPopup.page';
import { browser, protractor } from 'protractor';
import { CarePlannerApiCalls } from '../../../lib/apiServices/carePlannerApiCalls';

let cpSchedulerPage:CarePlannerSchedulerPage;
let cpPetDetailsPage:CarePlannerPetDetails;
let cpEditSchedulePopupPage:CarePlannerEditSchedulePopup;
let cpEditOccuranceSeriesPopup:CarePlannerEditOccuranceSeriesPopup;
let productTaskList, startPosition:number, endPosition:number, taskOccurrenceCount:number;
let taskUpdateStatus:string[] = ["Planned","Completed","Skipped","Canceled"];

let singleOccurrence = {
    scheduleStartTime : 9,
    scheduleEndTime : 0,
    repeatEveryHour : 0,
    scheduleInstructions : 'Test Instructions for the Single Occurrence',
    expectedNumberOfTaskOccurrences : 1,
    actualOccurrenceStatus : ['Overdue'],
    occurrenceIndex : 0,
    expectedOcurrenceStatus : ['Canceled'],
    taskOccurrenceNotes : 'Test notes for cancel task occurrence'
}

let multiOccurrence = {
    scheduleStartTime : 9,
    scheduleEndTime : 11,
    repeatEveryHour : 1,
    scheduleInstructions : 'Test Instructions for the Multi Occurrences',
    expectedNumberOfTaskOccurrences : 3,
    actualOccurrenceStatus : ['Overdue', 'Overdue', 'Overdue'],
    occurrenceIndex : 1,
    expectedOcurrenceStatus : ['Overdue', 'Canceled', 'Overdue'],
    taskOccurrenceNotes : 'Test notes for cancel a task occurrence'
}

let occurrenceDetails:TaskOccurreceDetails;


describe('schedule task occurrence and cancel the task occurrence scheduled', async () => {
    
    describe('schedule a single occurrence for a task and cancel the occurrence scheduled', async () => {
    
        beforeAll( () => {

            createPageObjectInstance();
        });

        afterAll( () => {

            clearBrowserValues();
        });

        it('Data set up and client pet details' , async () => {

            let __apiCalls = new CarePlannerApiCalls();
            await __apiCalls.CreateClientPetAddProduct();
        });

        it('should display the client & pet details matched', async () => {
            
            let _clientLastName = browser.clientLastName.length >= 12 ? browser.clientLastName.slice(0, 12) + '…' : browser.clientLastName;
            let _patientName = browser.patientName.length >= 12 ? browser.patientName.slice(0, 12) + '…' : browser.patientName;
            let speciesName = 'Canine';

            //Verify the page Title
            let pageTitle = await cpPetDetailsPage.pageTitle;
            await expect(pageTitle).toEqual('VCA Charge Capture');
            
            //Verify the Client Last Name
            await expect(cpPetDetailsPage.clientName).toEqual(_clientLastName);
        
            //Veify the Patient Name 
            await expect(cpPetDetailsPage.petName).toEqual(_patientName);
    
            //Veify the Species Name
            await expect(cpPetDetailsPage.speciesName).toEqual(speciesName);
        });
    
    
        it('should validate the product category and list of tasks for the category', async () => {
            
            //Verify the Category Count
            await expect(cpSchedulerPage.categoryCount).toEqual(1);
    
            //Verify the Task Count
            await expect(cpSchedulerPage.productTaskListCount).toEqual(1);
        });
    
    
        it('should successfuly click on a task name toschedule for single occurrence', async () => {
            
            //Click on a task name under a category
            productTaskList = await cpSchedulerPage.productTaskList; 
            browser.logger.info('Product Task List : ' + productTaskList);
            browser.taskSeriesName = productTaskList[0];
           
    
            await cpSchedulerPage.clickOnTaskByName(browser.taskSeriesName);
            await browser.sleep(1000);
    
            occurrenceDetails = {
                frequency : "once",
                scheduleStartTime : singleOccurrence.scheduleStartTime,
                scheduleStartDate : '',
                scheduleEndTime : singleOccurrence.scheduleEndTime,
                scheduleEndDate : '',
                repeatHours: singleOccurrence.repeatEveryHour,
                taskInstructions : singleOccurrence.scheduleInstructions
            } as TaskOccurreceDetails;
    
            //Schedule the Task Occurrence with the Occurrence Details
            await cpEditSchedulePopupPage.scheduleTaskOccurrence(occurrenceDetails);
            await browser.sleep(5000);
        });
    
        it('should match with the expected occurrence status', async () => {
    
            //Get the task index to set the row index
            let _taskIndex = productTaskList.indexOf(browser.taskSeriesName);
            
            //Get the Row Index Details based on the Task Details
            setPosition(_taskIndex);

            //Verify the number of task occurrences created
            await cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, singleOccurrence.expectedNumberOfTaskOccurrences)
    
            //Verify the status of the created Occurrences
            await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, singleOccurrence.actualOccurrenceStatus);

        });
    
        it('should able to successfully cancel a single occurrence based on the index and the schedled occurrence should get canceled', async () => {
            
            //Click on the task occurrence to bring up the edit task occurrence popup
            browser.logger.info("Click on the task occurrence by index : " + singleOccurrence.occurrenceIndex);
            await cpSchedulerPage.clickOnOccurrenceByIndex(startPosition, endPosition, singleOccurrence.occurrenceIndex);
            await browser.sleep(1000);
    
            //Edit & Update the status of the task occurrence
            await cpEditOccuranceSeriesPopup.updateOccurrenceDetails(taskUpdateStatus[3], singleOccurrence.taskOccurrenceNotes);
            await browser.sleep(7000);

            //Verify the number of task occurrences after cancel
            await cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, singleOccurrence.expectedNumberOfTaskOccurrences-1);
            
            // //Verify the task occurrence status after cancel
            // await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCanceled(startPosition, endPosition, singleOccurrence.occurrenceIndex, singleOccurrence.expectedOcurrenceStatus);
        });
    });

    describe('schedule multiple occurrence for a task and cancel a single occurrence scheduled', async () => {
        
         beforeAll( () => {

            createPageObjectInstance();
        });

        afterAll( () => {
            
            clearBrowserValues();
        });

        it('Data set up and client pet details' , async () => {
            
            let __apiCalls = new CarePlannerApiCalls();
            await __apiCalls.CreateClientPetAddProduct();
        });
    
        it('should display the client & pet details matched', async () => {
            
            let _clientLastName = browser.clientLastName.length >= 12 ? browser.clientLastName.slice(0, 12) + '…' : browser.clientLastName;
            let _patientName = browser.patientName.length >= 12 ? browser.patientName.slice(0, 12) + '…' : browser.patientName;
            let speciesName = 'Canine';

            //Verify the page Title
            let pageTitle = await cpPetDetailsPage.pageTitle;
            await expect(pageTitle).toEqual('VCA Charge Capture');
            
            //Verify the Client Last Name
            await expect(cpPetDetailsPage.clientName).toEqual(_clientLastName);
        
            //Veify the Patient Name 
            await expect(cpPetDetailsPage.petName).toEqual(_patientName);
    
            //Veify the Species Name
            await expect(cpPetDetailsPage.speciesName).toEqual(speciesName);
        });
    
    
        it('should validate the product category and list of tasks for the category', async () => {
            
            //Verify the Category Count
            await expect(cpSchedulerPage.categoryCount).toEqual(1);
    
            //Verify the Task Count
            await expect(cpSchedulerPage.productTaskListCount).toEqual(1);
        });
    
    
        it('should successfuly click on a task name toschedule for single occurrence', async () => {
            
            //Click on a task name under a category
            productTaskList = await cpSchedulerPage.productTaskList; 
            browser.logger.info('Product Task List : ' + productTaskList);
            browser.taskSeriesName = productTaskList[0];
            
    
            await cpSchedulerPage.clickOnTaskByName(browser.taskSeriesName);
            await browser.sleep(1000);
    
            occurrenceDetails = {
                frequency : "recurring",
                scheduleStartTime : multiOccurrence.scheduleStartTime,
                scheduleStartDate : '',
                scheduleEndTime : multiOccurrence.scheduleEndTime,
                scheduleEndDate : '',
                repeatHours: multiOccurrence.repeatEveryHour,
                taskInstructions : multiOccurrence.scheduleInstructions
            } as TaskOccurreceDetails;
    
            //Schedule the Task Occurrence with the Occurrence Details
            await cpEditSchedulePopupPage.scheduleTaskOccurrence(occurrenceDetails);
            await browser.sleep(5000);
        });
    
        it('should match with the expected occurrence status', async () => {
    
            //Get the task index to set the row index
            let _taskIndex = productTaskList.indexOf(browser.taskSeriesName);
            
            //Get the Row Index Details based on the Task Details
            setPosition(_taskIndex);
    
            //Verify the number of task occurrences created
            await cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, multiOccurrence.expectedNumberOfTaskOccurrences);
            
            //Verify the status of the created Occurrences
            await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, multiOccurrence.actualOccurrenceStatus);
            
        });
    
        it('should able to successfully cancel a single occurrence based on the index and the schedled occurrence should get canceled', async () => {
            
            //Click on the task occurrence to bring up the edit task occurrence popup
            browser.logger.info("Click on the task occurrence by index : " + multiOccurrence.occurrenceIndex);
            await cpSchedulerPage.clickOnOccurrenceByIndex(startPosition, endPosition, multiOccurrence.occurrenceIndex);
            await browser.sleep(1000);
    
            //Edit & Update the status of the task occurrence
            await cpEditOccuranceSeriesPopup.updateOccurrenceDetails(taskUpdateStatus[3], multiOccurrence.taskOccurrenceNotes);
            await browser.sleep(7000);

            //Verify the number of task occurrences after cancel
            await cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, multiOccurrence.expectedNumberOfTaskOccurrences-1);
            
            //Verify the task occurrence status after cancel
            await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCanceled(startPosition, endPosition, multiOccurrence.occurrenceIndex, multiOccurrence.expectedOcurrenceStatus);
        });
    });

    function clearBrowserValues(){
        browser.logger.info("*********************************************************")
        browser.logger.info('************** Browser values Cleanup - Started **************');
        
        browser.token = '';
        browser.bearerToken = '';
        browser.clientID = '';
        browser.clientName = '';
        browser.clientLastName = '';
        browser.patientID = '';
        browser.patientName = '';
        browser.appointmentID = '';
        browser.visitId = '';
        browser.visitInvoiceItems = '';
        browser.taskOccurances = '';
        browser.taskSeriesId = '';
        browser.taskOccurrenceId = '';
        browser.userId = '';
        browser.petName = '';
        browser.speciesName = '';
        browser.taskSeriesName = '';

        startPosition = 0;
        endPosition = 0;
        taskOccurrenceCount = 0;
        productTaskList = '';
        
        browser.logger.info('************** Browser values Cleanup - Finished **************');
        browser.logger.info("*********************************************************")
    }

    function createPageObjectInstance(){
        browser.logger.info("*********************************************************");
        browser.logger.info("************** Single Occurrence Test *******************");
        browser.logger.info("*********************************************************");
        browser.logger.info("*********************************************************");
        browser.logger.info('************** Prerequsite Steps - Started **************');
        browser.logger.info("*********************************************************");
        cpSchedulerPage = new CarePlannerSchedulerPage();
        cpPetDetailsPage = new CarePlannerPetDetails();
        cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
        cpEditOccuranceSeriesPopup = new CarePlannerEditOccuranceSeriesPopup();
        browser.logger.info("*********************************************************");
        browser.logger.info('************** Prerequsite Steps - Completed **************');
        browser.logger.info("*********************************************************");
        browser.logger.info("*********************************************************");
        browser.logger.info('*************** Test Execution - Started *****************');  
        browser.logger.info("*********************************************************");            
    }

    function setPosition(_taskIndex){
        
        //Get the order index of the task name from the product list independent of category
        //Set the Start & End Position for the task series (row range) per task
        if(_taskIndex >= 0){ 
            startPosition = 1 ;
            endPosition = 24;
        } else if(_taskIndex >= 1){
            startPosition =  _taskIndex * 24 + 1;
            endPosition = startPosition + 23; 
        } else {
            //fail test as product list not identified
        }
    }
});