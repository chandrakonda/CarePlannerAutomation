import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';
import { CarePlannerSchedulerPage } from '../../pages/carePlanner/cpScheduler.page';
import { CarePlannerEditSchedulePopup } from '../../pages/carePlanner/cpEditSchedulePopup.page';
import { CarePlannerEditOccuranceSeriesPopup } from '../../pages/carePlanner/cpEditOccurrenceSeriesPopup.page';
import { browser, protractor } from 'protractor';
import { CarePlannerApiCalls } from '../../lib/apiServices/carePlannerApiCalls';

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
    actualOccurrenceStatus : ['Scheduled'],
    occurrenceIndex : 0,
    expectedOcurrenceStatus : ['Complete'],
    taskOccurrenceNotes : 'Test notes for completing task occurrence'
}

let multiOccurrence = {
    scheduleStartTime : 9,
    scheduleEndTime : 11,
    repeatEveryHour : 1,
    scheduleInstructions : 'Test Instructions for the Single Occurrence',
    expectedNumberOfTaskOccurrences : 3,
    actualOccurrenceStatus : ['Scheduled', 'Scheduled', 'Scheduled'],
    occurrenceIndex : 0,
    expectedOcurrenceStatus : ['Complete', 'Scheduled', 'Scheduled'],
    taskOccurrenceNotes : 'Test notes for completing task occurrence'
}

// let scheduleStartTime = 9;
// let scheduleEndTime = 11;
// let repeatEveryHour = 1;
// let scheduleInstructions = 'Test Instructions for the Single Occurrence';
// let expectedNumberOfTaskOccurrences = 1;
// let actualOccurrenceStatus = ['Scheduled', 'Scheduled', 'Scheduled'];
// let occurrenceIndex = 0;
// let expectedOcurrenceStatus = ['Complete', 'Scheduled', 'Scheduled'];
// let taskOccurrenceNotes = 'Test notes for completing task occurrence';
let occurrenceDetails:TaskOccurreceDetails;


describe('schedule task occurrence', async () => {
    
    describe('Test Single Occurrence With Shared Steps', async () => {
    
        beforeAll( () => {
    
            browser.logger.info('************** Prerequsite Steps - Started **************');
            cpSchedulerPage = new CarePlannerSchedulerPage();
            cpPetDetailsPage = new CarePlannerPetDetails();
            cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
            cpEditOccuranceSeriesPopup = new CarePlannerEditOccuranceSeriesPopup();
            
            browser.logger.info('************** Prerequsite Steps - API Calls Started **************');
            // apiCall.createAuthToken()
            //     .createClient()
            //     .createPatient()
            //     .createAppointment()
            //     .appointmentCheckIn()
            //     .getCheckedInPatientDetails()
            //     .addProductToVisit()
            //     .getVisitInvoideDetailsByVisitId()
            //     .getTaskSeriesByOrderId()
            //     .getResourceIdFromCarePlannerURL()
            //     .constructCarePlannerURL();
            // browser.logger.info('************** Prerequsite Steps - API Calls Started **************');
            browser.logger.info('************** Prerequsite Steps - Completed **************');
            browser.logger.info('************** Test Execution - Started **************');               
        });

        it('Data set up and client pet details' , async () => {
            let __apiCalls = new CarePlannerApiCalls();
            await __apiCalls.CreateClientPetAddProduct();
    
        });

        it('should display the client & pet details matched', async () => {
            
            let _clientLastName = browser.clientLastName.length >= 12 ? browser.clientLastName.slice(0, 12) + '…' : browser.clientLastName;
            let _patientName = browser.patientName.length >= 12 ? browser.patientName.slice(0, 12) + '…' : browser.patientName;
    
            //Verify the page Title
            let pageTitle = await cpPetDetailsPage.pageTitle;
            await expect(pageTitle).toEqual('VCA Charge Capture');
            
            //Verify the Client Last Name
            await expect(cpPetDetailsPage.clientName).toEqual(_clientLastName);
        
            //Veify the Patient Name 
            await expect(cpPetDetailsPage.petName).toEqual(_patientName);
    
            //Veify the Species Name
            await expect(cpPetDetailsPage.speciesName).toEqual('Canine');
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
    
            let _taskIndex = productTaskList.indexOf(browser.taskSeriesName);
    
            //Get the Row Index Details based on the Task Details
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
    
            //Verify the number of task occurrences created
            //await cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, expectedNumberOfTaskOccurrences)
            let taskOccurrenceCount:number = await cpSchedulerPage.getNumberOfTaskOccurrence(startPosition, endPosition);
            expect(taskOccurrenceCount).toBe(singleOccurrence.expectedNumberOfTaskOccurrences);
    
            //Verify the status of the created Occurrences
            //await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, actualOccurrenceStatus)
            let taskOccurrenceStatus:any = await cpSchedulerPage.getTaskOccurrenceStatus(startPosition, endPosition);
            for (let index = 0; index < taskOccurrenceStatus.length; index++) {
              browser.logger.info("Status of the occurrence " + index + " is : " + taskOccurrenceStatus[index].split(' ')[0]);
              expect(taskOccurrenceStatus[index].split(' ')[0]).toEqual(singleOccurrence.actualOccurrenceStatus[index]);
            }
        });
    
        it('should display the edit task occurrence popup by click on the single task occurrence', async () => {
            
            //Click on the task occurrence to bring up the edit task occurrence popup
            browser.logger.info("Click on the task occurrence by index : " + singleOccurrence.occurrenceIndex);
            await cpSchedulerPage.clickOnOccurrenceByIndex(startPosition, endPosition, singleOccurrence.occurrenceIndex);
            await browser.sleep(1000);
    
            await cpEditOccuranceSeriesPopup.updateOccurrenceDetails(taskUpdateStatus[1],singleOccurrence.taskOccurrenceNotes);
            await browser.sleep(2000);
            
            //Verify the task occurrence status after completing
            let taskOccurrenceStatus = await cpSchedulerPage.getTaskOccurrenceStatus(startPosition, endPosition);
            browser.logger.info("Status of the occurrence " + singleOccurrence.occurrenceIndex + " is : " + taskOccurrenceStatus[singleOccurrence.occurrenceIndex].split(' ')[0]);
            expect(taskOccurrenceStatus[singleOccurrence.occurrenceIndex].split(' ')[0]).toEqual(singleOccurrence.expectedOcurrenceStatus[singleOccurrence.occurrenceIndex]);
        });
    });

    describe('Test Multi Occurrence With Shared Steps', async () => {
        
        beforeAll( () => {
    
            browser.logger.info('************** Prerequsite Steps - Started **************');
            cpSchedulerPage = new CarePlannerSchedulerPage();
            cpPetDetailsPage = new CarePlannerPetDetails();
            cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
            cpEditOccuranceSeriesPopup = new CarePlannerEditOccuranceSeriesPopup();
            
            // browser.logger.info('************** Prerequsite Steps - API Calls Started **************');
            // apiCall.createAuthToken()
            //     .createClient()
            //     .createPatient()
            //     .createAppointment()
            //     .appointmentCheckIn()
            //     .getCheckedInPatientDetails()
            //     .addProductToVisit()
            //     .getVisitInvoideDetailsByVisitId()
            //     .getTaskSeriesByOrderId()
            //     .getResourceIdFromCarePlannerURL()
            //     .constructCarePlannerURL();
            // browser.logger.info('************** Prerequsite Steps - API Calls Started **************');
            browser.logger.info('************** Prerequsite Steps - Completed **************');
            browser.logger.info('************** Test Execution - Started **************');               
        });

        it('Data set up and client pet details' , async () => {
            let __apiCalls = new CarePlannerApiCalls();
            await __apiCalls.CreateClientPetAddProduct();
    
        });
    
        it('should display the client & pet details matched', async () => {
            
            let _clientLastName = browser.clientLastName.length >= 12 ? browser.clientLastName.slice(0, 12) + '…' : browser.clientLastName;
            let _patientName = browser.patientName.length >= 12 ? browser.patientName.slice(0, 12) + '…' : browser.patientName;
    
            //Verify the page Title
            let pageTitle = await cpPetDetailsPage.pageTitle;
            await expect(pageTitle).toEqual('VCA Charge Capture');
            
            //Verify the Client Last Name
            await expect(cpPetDetailsPage.clientName).toEqual(_clientLastName);
        
            //Veify the Patient Name 
            await expect(cpPetDetailsPage.petName).toEqual(_patientName);
    
            //Veify the Species Name
            await expect(cpPetDetailsPage.speciesName).toEqual('Canine');
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
    
            let _taskIndex = productTaskList.indexOf(browser.taskSeriesName);
    
            //Get the Row Index Details based on the Task Details
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
    
            //Verify the number of task occurrences created
            //await cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, expectedNumberOfTaskOccurrences)
            let taskOccurrenceCount:number = await cpSchedulerPage.getNumberOfTaskOccurrence(startPosition, endPosition);
            expect(taskOccurrenceCount).toBe(multiOccurrence.expectedNumberOfTaskOccurrences);
    
            //Verify the status of the created Occurrences
            //await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, actualOccurrenceStatus)
            let taskOccurrenceStatus:any = await cpSchedulerPage.getTaskOccurrenceStatus(startPosition, endPosition);
            for (let index = 0; index < taskOccurrenceStatus.length; index++) {
                browser.logger.info("Status of the occurrence " + index + " is : " + taskOccurrenceStatus[index].split(' ')[0]);
                expect(taskOccurrenceStatus[index].split(' ')[0]).toEqual(multiOccurrence.actualOccurrenceStatus[index]);
            }
        });
    
        it('should display the edit task occurrence popup by click on the single task occurrence', async () => {
            
            //Click on the task occurrence to bring up the edit task occurrence popup
            browser.logger.info("Click on the task occurrence by index : " + multiOccurrence.occurrenceIndex);
            await cpSchedulerPage.clickOnOccurrenceByIndex(startPosition, endPosition, multiOccurrence.occurrenceIndex);
            await browser.sleep(1000);
    
            await cpEditOccuranceSeriesPopup.updateOccurrenceDetails(taskUpdateStatus[1], multiOccurrence.taskOccurrenceNotes);
            await browser.sleep(2000);
            
            //Verify the task occurrence status after completing
            let taskOccurrenceStatus = await cpSchedulerPage.getTaskOccurrenceStatus(startPosition, endPosition);
            browser.logger.info("Status of the occurrence " + multiOccurrence.occurrenceIndex + " is : " + taskOccurrenceStatus[multiOccurrence.occurrenceIndex].split(' ')[0]);
            expect(taskOccurrenceStatus[multiOccurrence.occurrenceIndex].split(' ')[0]).toEqual(multiOccurrence.expectedOcurrenceStatus[multiOccurrence.occurrenceIndex]);
        });
    });
})