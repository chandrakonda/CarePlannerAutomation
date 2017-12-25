// import { CarePlannerPetDetails } from '../../../pages/carePlanner/cpPetdetails.page';
// import { CarePlannerSchedulerPage } from '../../../pages/carePlanner/cpScheduler.page';
// import { CarePlannerEditSchedulePopup } from '../../../pages/carePlanner/cpEditSchedulePopup.page';
// import { CarePlannerEditOccuranceSeriesPopup } from '../../../pages/carePlanner/cpEditOccurrenceSeriesPopup.page';
// import { browser, protractor } from 'protractor';
// import { CarePlannerApiCalls } from '../../../lib/apiServices/carePlannerApiCalls';

// let cpSchedulerPage:CarePlannerSchedulerPage;
// let cpPetDetailsPage:CarePlannerPetDetails;
// let cpEditSchedulePopupPage:CarePlannerEditSchedulePopup;
// let cpEditOccuranceSeriesPopup:CarePlannerEditOccuranceSeriesPopup;
// let productTaskList, startPosition:number, endPosition:number, taskOccurrenceCount:number;
// let taskUpdateStatus:string[] = ["Planned","Completed","Skipped","Canceled"];

// let singleOccurrence = {
//     scheduleStartTime : 9,
//     scheduleEndTime : 0,
//     repeatEveryHour : 0,
//     scheduleInstructions : 'Test Instructions for the Single Occurrence',
//     expectedNumberOfTaskOccurrences : 1,
//     expectedOccurrenceStatus : ['Overdue'],
//     timeToReschedule : 9,
//     rescheduledTime : 10,
//     rescheduledOccurrenceStatus : ['Overdue'],
//     rescheduledOccurrenceCount : 1,
//     rescheduledOccurrenceNotes : 'Test Instructions for the Single Occurrence Rescheduled'
// }

// let multiOccurrence = {
//     scheduleStartTime : 9,
//     scheduleEndTime : 11,
//     repeatEveryHour : 1,
//     scheduleInstructions : 'Test Instructions for the Multi Occurrence',
//     expectedNumberOfTaskOccurrences : 3,
//     expectedOccurrenceStatus : ['Overdue', 'Overdue', 'Overdue'],
//     timeToReschedule : 11,
//     rescheduledTime : 12,
//     rescheduledOccurrenceStatus : ['Overdue'],
//     rescheduledOccurrenceNotes : 'Test Instructions for the Multi Occurrence Rescheduled'
// }

// let scheduleOccurrenceDetails:TaskOccurreceDetails;

// describe('schedule task occurrence and cancel the task occurrence scheduled', async () => {
    
//     describe('schedule a single occurrence for a task and cancel the occurrence scheduled', async () => {
    
//         beforeAll( () => {

//             createPageObjectInstance();
//         });

//         afterAll( () => {

//             clearBrowserValues();
//         });

//         it('Data set up and client pet details' , async () => {

//             let __apiCalls = new CarePlannerApiCalls();
//             await __apiCalls.CreateClientPetAddProduct();
//         });

//         it('should display the client & pet details matched', async () => {
            
//             let _clientLastName = browser.clientLastName.length >= 12 ? browser.clientLastName.slice(0, 12) + '…' : browser.clientLastName;
//             let _patientName = browser.patientName.length >= 12 ? browser.patientName.slice(0, 12) + '…' : browser.patientName;
//             let speciesName = 'Canine';

//             //Verify the page Title
//             let pageTitle = await cpPetDetailsPage.pageTitle;
//             await expect(pageTitle).toEqual('VCA Charge Capture');
            
//             //Verify the Client Last Name
//             let clientName = await cpPetDetailsPage.clientName;
//             browser.logger.info("Client Name displayed as : " + clientName );
//             browser.logger.info("Client Name Should displayed as : " + _clientLastName );
//             await expect(clientName).toEqual(_clientLastName);
        
//             //Veify the Patient Name 
//             await expect(cpPetDetailsPage.petName).toEqual(_patientName);
    
//             //Veify the Species Name
//             await expect(cpPetDetailsPage.speciesName).toEqual(speciesName);
//         });
    
    
//         it('should validate the product category and list of tasks for the category', async () => {
            
//             //Verify the Category Count
//             await expect(cpSchedulerPage.categoryCount).toEqual(1);
    
//             //Verify the Task Count
//             await expect(cpSchedulerPage.productTaskListCount).toEqual(1);
//         });
    
    
//         it('should successfuly click on a task name toschedule for single occurrence', async () => {
            
//             //Click on a task name under a category
//             productTaskList = await cpSchedulerPage.productTaskList; 
//             browser.logger.info('Product Task List : ' + productTaskList);
//             browser.taskSeriesName = productTaskList[0];
           
    
//             await cpSchedulerPage.clickOnTaskByName(browser.taskSeriesName);
//             await browser.sleep(1000);
    
//             scheduleOccurrenceDetails = {
//                 frequency : "once",
//                 scheduleStartTime : singleOccurrence.scheduleStartTime,
//                 scheduleStartDate : '',
//                 scheduleEndTime : singleOccurrence.scheduleEndTime,
//                 scheduleEndDate : '',
//                 repeatHours: singleOccurrence.repeatEveryHour,
//                 taskInstructions : singleOccurrence.scheduleInstructions
//             } as TaskOccurreceDetails;
    
//             //Schedule the Task Occurrence with the Occurrence Details
//             await cpEditSchedulePopupPage.scheduleTaskOccurrence(scheduleOccurrenceDetails);
//             await browser.sleep(5000);
//         });
    
//         it('should match with the expected occurrence status', async () => {
    
//             //Get the task index to set the row index
//             let _taskIndex = productTaskList.indexOf(browser.taskSeriesName);
            
//             //Get the Row Index Details based on the Task Details
//             setPosition(_taskIndex);

//             //Verify the number of task occurrences created
//             await cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, singleOccurrence.expectedNumberOfTaskOccurrences)
    
//             //Verify the status of the created Occurrences
//             await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, singleOccurrence.expectedOccurrenceStatus);

//         });

//         it('should display the edit task occurrence popup by click on the single task occurrence', async () => {
            
//             //Click on the task occurrence to bring up the edit task occurrence popup
//             browser.logger.info("Click on the task occurrence by time : " + singleOccurrence.timeToReschedule);
//             // await cpSchedulerPage.clickOnOccurrenceByIndex(startPosition, endPosition, singleOccurrence.occurrenceIndex);
//             // await browser.sleep(1000);
            
//             await cpSchedulerPage.clickOnOccurrenceByScheduledTime(singleOccurrence.timeToReschedule);
//             await browser.sleep(1000);

//             //Edit & Update the status of the task occurrence
//             await cpEditOccuranceSeriesPopup.updateOccurrenceDetails(taskUpdateStatus[0],singleOccurrence.rescheduledOccurrenceNotes,singleOccurrence.rescheduledTime);
//             await browser.sleep(7000);
            
//             //Verify the task occurrence status after completing
//             // await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceUpdatedByIndex(startPosition, endPosition, singleOccurrence.occurrenceIndex, singleOccurrence.rescheduledOccurrenceStatus[singleOccurrence.occurrenceIndex]);

//             await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceByTime(singleOccurrence.rescheduledTime, singleOccurrence.rescheduledOccurrenceStatus[0]);
//         });
//     });

//     describe('schedule multiple occurrence for a task and complete a single occurrence scheduled', async () => {
        
//         beforeAll( () => {    
            
//             createPageObjectInstance();           
//         });

//         afterAll( () => {

//             clearBrowserValues();
//         });

//         it('Data set up and client pet details' , async () => {
            
//             let __apiCalls = new CarePlannerApiCalls();
//             await __apiCalls.CreateClientPetAddProduct();
//         });
    
//         it('should display the client & pet details matched', async () => {
            
//             let _clientLastName = browser.clientLastName.length >= 12 ? browser.clientLastName.slice(0, 12) + '…' : browser.clientLastName;
//             let _patientName = browser.patientName.length >= 12 ? browser.patientName.slice(0, 12) + '…' : browser.patientName;
//             let speciesName = 'Canine';

//             //Verify the page Title
//             let pageTitle = await cpPetDetailsPage.pageTitle;
//             await expect(pageTitle).toEqual('VCA Charge Capture');
            
//             //Verify the Client Last Name
//             await expect(cpPetDetailsPage.clientName).toEqual(_clientLastName);
        
//             //Veify the Patient Name 
//             await expect(cpPetDetailsPage.petName).toEqual(_patientName);
    
//             //Veify the Species Name
//             await expect(cpPetDetailsPage.speciesName).toEqual(speciesName);
//         });
    
    
//         it('should validate the product category and list of tasks for the category', async () => {
            
//             //Verify the Category Count
//             await expect(cpSchedulerPage.categoryCount).toEqual(1);
    
//             //Verify the Task Count
//             await expect(cpSchedulerPage.productTaskListCount).toEqual(1);
//         });
    
    
//         it('should successfuly click on a task name toschedule for single occurrence', async () => {
            
//             //Click on a task name under a category
//             productTaskList = await cpSchedulerPage.productTaskList; 
//             browser.logger.info('Product Task List : ' + productTaskList);
//             browser.taskSeriesName = productTaskList[0];
            
    
//             await cpSchedulerPage.clickOnTaskByName(browser.taskSeriesName);
//             await browser.sleep(1000);
    
//             scheduleOccurrenceDetails = {
//                 frequency : "recurring",
//                 scheduleStartTime : multiOccurrence.scheduleStartTime,
//                 scheduleStartDate : '',
//                 scheduleEndTime : multiOccurrence.scheduleEndTime,
//                 scheduleEndDate : '',
//                 repeatHours: multiOccurrence.repeatEveryHour,
//                 taskInstructions : multiOccurrence.scheduleInstructions
//             } as TaskOccurreceDetails;
    
//             //Schedule the Task Occurrence with the Occurrence Details
//             await cpEditSchedulePopupPage.scheduleTaskOccurrence(scheduleOccurrenceDetails);
//             await browser.sleep(5000);
//         });
    
//         it('should match with the expected occurrence status', async () => {
    
//             //Get the task index to set the row index
//             let _taskIndex = productTaskList.indexOf(browser.taskSeriesName);
            
//              //Get the Row Index Details based on the Task Details
//              setPosition(_taskIndex);
    
//             //Verify the number of task occurrences created
//             await cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, multiOccurrence.expectedNumberOfTaskOccurrences);
            
//             //Verify the status of the created Occurrences
//             await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, multiOccurrence.expectedOccurrenceStatus);
            
//         });

    
//        it('should able to successfully skip a single occurrence based on the index and match with occurrence status as skipped', async () => {
            
//             //Click on the task occurrence to bring up the edit task occurrence popup
//             browser.logger.info("Click on the task occurrence by time : " + multiOccurrence.timeToReschedule);
//             // await cpSchedulerPage.clickOnOccurrenceByIndex(startPosition, endPosition, multiOccurrence.occurrenceIndex);
//             // await browser.sleep(1000);

//             await cpSchedulerPage.clickOnOccurrenceByScheduledTime(multiOccurrence.timeToReschedule);
//             await browser.sleep(1000);
    
//             //Edit & Update the status of the task occurrence
//             await cpEditOccuranceSeriesPopup.updateOccurrenceDetails(taskUpdateStatus[0], multiOccurrence.rescheduledOccurrenceNotes, multiOccurrence.rescheduledTime);
//             await browser.sleep(7000);
            
//             //Verify the task occurrence status after completing
//             // await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceUpdatedByIndex(startPosition, endPosition, multiOccurrence.occurrenceIndex, multiOccurrence.expectedOcurrenceStatus[multiOccurrence.occurrenceIndex]);
//             await cpSchedulerPage.verifyTheStatusOfTaskOccurrenceByTime(multiOccurrence.rescheduledTime, multiOccurrence.rescheduledOccurrenceStatus[0]);
//         });
//     });


//     function clearBrowserValues(){
//         browser.logger.info("*********************************************************")
//         browser.logger.info('************** Browser values Cleanup - Started **************');
        
//         browser.token = '';
//         browser.bearerToken = '';
//         browser.clientID = '';
//         browser.clientName = '';
//         browser.clientLastName = '';
//         browser.patientID = '';
//         browser.patientName = '';
//         browser.appointmentID = '';
//         browser.visitId = '';
//         browser.visitInvoiceItems = '';
//         browser.taskOccurances = '';
//         browser.taskSeriesId = '';
//         browser.taskOccurrenceId = '';
//         browser.userId = '';
//         browser.petName = '';
//         browser.speciesName = '';
//         browser.taskSeriesName = '';

//         startPosition = 0;
//         endPosition = 0;
//         taskOccurrenceCount = 0;
//         productTaskList = '';
        
//         browser.logger.info('************** Browser values Cleanup - Finished **************');
//         browser.logger.info("*********************************************************")
//     }

//     function createPageObjectInstance(){
//         browser.logger.info("*********************************************************");
//         browser.logger.info("************** Single Occurrence Test *******************");
//         browser.logger.info("*********************************************************");
//         browser.logger.info("*********************************************************");
//         browser.logger.info('************** Prerequsite Steps - Started **************');
//         browser.logger.info("*********************************************************");
//         cpSchedulerPage = new CarePlannerSchedulerPage();
//         cpPetDetailsPage = new CarePlannerPetDetails();
//         cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
//         cpEditOccuranceSeriesPopup = new CarePlannerEditOccuranceSeriesPopup();
//         browser.logger.info("*********************************************************");
//         browser.logger.info('************** Prerequsite Steps - Completed **************');
//         browser.logger.info("*********************************************************");
//         browser.logger.info("*********************************************************");
//         browser.logger.info('*************** Test Execution - Started *****************');  
//         browser.logger.info("*********************************************************");            
//     }

//     function setPosition(_taskIndex){
        
//         //Get the order index of the task name from the product list independent of category
//         //Set the Start & End Position for the task series (row range) per task
//         if(_taskIndex >= 0){ 
//             startPosition = 1 ;
//             endPosition = 24;
//         } else if(_taskIndex >= 1){
//             startPosition =  _taskIndex * 24 + 1;
//             endPosition = startPosition + 23; 
//         } else {
//             //fail test as product list not identified
//         }
//     }

    
// });