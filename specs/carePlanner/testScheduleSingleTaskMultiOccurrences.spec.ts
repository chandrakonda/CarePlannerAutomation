import { browser, protractor } from 'protractor';
import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';
import { CarePlannerSchedulerPage } from '../../pages/carePlanner/cpScheduler.page';
import { AuthController } from '../../lib/apiControllers/authController';
import { ClientAndPatientController } from '../../lib/apiControllers/clientAndPatientController';
import { AppointmentController } from '../../lib/apiControllers/appointmentController';
import { VisitController } from '../../lib/apiControllers/visitController';
import { OrderController } from '../../lib/apiControllers/orderController';
import { CarePlannerEditSchedulePopup } from '../../pages/carePlanner/cpEditSchedulePopup.page';
import { CarePlannerEditOccuranceSeriesPopup } from '../../pages/carePlanner/cpEditOccurrenceSeriesPopup.page';

// Variables

let cpSchedulerPage, cpPetDetailsPage,cpEditSchedulePopupPage, cpEditOccuranceSeriesPopup;
let startPosition:number, endPosition:number, taskOccurrenceCount:number;
let taskUpdateStatus:string[] = ["Planned","Completed","Skipped","Canceled"];

let scheduleStartTime = 10;
let scheduleEndTime = 12;
let repeatEveryHour =1;
let scheduleInstructions = "Test instructions";
let expectedNumberOfTaskOccurrences = 3;
let actualOccurrenceStatus = ['Scheduled', 'Scheduled', 'Scheduled'];
let occurrenceIndex = 1;
let expectedOcurrenceStatus = ['Scheduled', 'Complete', 'Scheduled'];
let taskOccurrenceNotes = 'Test notes for completing task occurrence';

describe('Scheduling a Single Task Occurrence for a Product in Care Planner Page', () =>{

    beforeAll(() => {
        cpPetDetailsPage = new CarePlannerPetDetails();
        cpSchedulerPage = new CarePlannerSchedulerPage();
        let authController: AuthController = new AuthController();
        let clientAndPatientController: ClientAndPatientController = new ClientAndPatientController();
        let appointmentController: AppointmentController = new AppointmentController();
        let visitController: VisitController = new VisitController();
        let orderController: OrderController = new OrderController();
        cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
        cpEditOccuranceSeriesPopup = new CarePlannerEditOccuranceSeriesPopup();
        //jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        
        var flow = protractor.promise.controlFlow();

        //Creating a Auth Token
        flow.execute(authController.getAuthToken).then((response) => {
            browser.logger.info("Getting Basic Auth token...");
            browser.token = response;
            browser.bearerToken = 'bearer ' + response;
            browser.logger.info("Bearer token: " + browser.bearerToken);
        });


        //Create a Client
        flow.execute(clientAndPatientController.createClient).then((response) => {
            browser.logger.info("Creating a new client...");
            //browser.logger.info(JSON.stringify(response));
            browser.clientID = response['ClientId'];
            browser.logger.info("ClientId: " + browser.clientID);
            browser.logger.info("Client name: " + response['FirstName'] + ' ' + response['LastName']);
            browser.clientLastName = response['LastName'];
        });

        // Create patient
        flow.execute(clientAndPatientController.createPatient).then((response) => {
            browser.logger.info("Creating a new patient...");
            //browser.logger.info(JSON.stringify(response));            
            browser.patientID = response;
            browser.logger.info("PatientId: " + browser.patientID);
        //browser.patientName 
        });

        //Create a new appointment for patient
        flow.execute(appointmentController.createNewAppointment).then(function (response) {
            browser.logger.info("Creating a new appointment...");
            //browser.logger.info(JSON.stringify(response));
            browser.appointmentID = response['AppointmentId'];
            browser.logger.info("Appointment ID: " + browser.appointmentID);
        });

        //Check appointment in
        flow.execute(appointmentController.checkInAppointment).then(function (response) {
            browser.logger.info("Checking in the appointment...");
            //browser.logger.info(JSON.stringify(response));
            browser.logger.info("Response received for adding product : " + response);
        });

        //Get checked in patient's details
        flow.execute(appointmentController.getCheckedInPatientDetails).then(function (response) {
            browser.logger.info("Getting details of checked in appointment...");
            //browser.logger.info(JSON.stringify(response));
            browser.visitId = response[0].VisitId;
            browser.logger.info("Visit Id is :" + browser.visitId);
        });

        //Add Product to the Visit
        flow.execute(orderController.addOrderToVisit).then(function (response) {
            browser.logger.info("Product Ordered Response...");
            browser.logger.info((response));
        });

        //Get Visit & Invoice Details by Visit Id
        flow.execute(visitController.getVisitDetailsByVisitId).then(function (response) {
            browser.logger.info("Visit Details & Invoice Details by Visit Id...");
            //browser.logger.info(JSON.stringify(response));
            browser.visitInvoiceItems = response[0].VisitInvoiceItems;

            for (let items of browser.visitInvoiceItems) {
                browser.logger.info("Visit Invoice Details :" + JSON.stringify(items));
                browser.logger.info("Visit Invoice Details [Visit Invoice Item Id]" + items.VisitInvoiceItemId);
                browser.logger.info("Visit Invoice Details [Invoice Item Id]" + items.InvoiceItemId);
            }
        });

        //Get Task Series Details By Order Id
        flow.execute(orderController.getTaskSeriesByOrderId).then(function (response) {
            browser.logger.info("Task Series by Order Id...");
            //browser.logger.info(JSON.stringify(response));
            browser.taskOccurances = response[0].TaskOccurences;

            for (let items of browser.taskOccurances) {
                browser.taskSeriesId = items.TaskSeriesId;
                browser.taskOccurrenceId = items.TaskOccurrenceId;
                browser.logger.info("Task Series Id :'" + browser.taskSeriesId + "' for OrderId : '" + browser.visitId + "'");
                browser.logger.info("Task Occurance Id :'" + browser.taskOccurrenceId + "' for OrderId : '" + browser.visitId + "'");
            }
        });


        // Get resource id to form care planner URL 
        flow.execute(visitController.getVisitResources).then(function (response) {
            browser.logger.info("Getting User Id...");
            // browser.logger(JSON.stringify(response));
            for (let i in response) {
                // browser.logger(response[i]);
                let user = response[i];
                if (user['ADusername'] == browser.appenvdetails.username) {
                    browser.logger.info('UserId: ', user['ResourceId']);
                    browser.userId = user['ResourceId'];
                }
            }
        });

        // Form URL to navigate to Careplanner
        flow.execute(() => {
            browser.logger.info("*********** Launching Browser ***********");
            browser.logger.info("Creating URL and launching browser...");
            var url = browser.baseUrl +
                '?hospitalId=' + browser.appenvdetails.hospitalid +
                '&patientId=' + browser.patientID +
                '&orderId=' + browser.visitId +
                '&userName=' + browser.appenvdetails.username +
                '&userId=' + browser.userId +
                '&accessToken=' + browser.token;
            browser.logger.info('URL: ', url);
            browser.get(url);
            browser.sleep(5000);
            browser.logger.info("*********** Starting Test Execution ***********");
        });
    });

    // beforeEach(()=> {
    //     var origFn = browser.driver.controlFlow().execute;
        
    //     browser.driver.controlFlow().execute = function() {
    //       var args = arguments;
        
    //       // queue 100ms wait
    //       origFn.call(browser.driver.controlFlow(), function() {
    //         return protractor.promise.delayed(10);
    //       });
        
    //       return origFn.apply(browser.driver.controlFlow(), args);
    //     };
    // });


    it('should display the client & pet details matched', async () => {

        //Verify the page Title
        let pageTitle = await cpPetDetailsPage.pageTitle;
        await expect(pageTitle).toEqual('VCA Charge Capture');

        //Verify the Client Last Name
        let _clientLastName = browser.clientLastName.length >= 12 ? browser.clientLastName.slice(0, 12) + '…' : browser.clientLastName;
        await expect(cpPetDetailsPage.clientName).toEqual(_clientLastName);
    
        //Veify the Patient Name & Species Name
        let _patientName = browser.patientName.length >= 12 ? browser.patientName.slice(0, 12) + '…' : browser.patientName;
        await expect(cpPetDetailsPage.petName).toEqual(_patientName);
        await expect(cpPetDetailsPage.speciesName).toEqual('Canine');
    });


    it('should validate the product category and list of tasks for the category', async () => {
        
        //Verify the Category Count
        let _categoryCount = await cpSchedulerPage.categoryCount; 
        browser.logger.info('No.of category displayed in scheduler : '+_categoryCount);
        await expect(_categoryCount).toEqual(1);

        //Verify the Task Count
        let _taskListCount = await cpSchedulerPage.productTaskListCount;
        browser.logger.info('No.of task displayed in scheduler : ' + _taskListCount);
        await expect(_taskListCount).toEqual(1);
    });


    it('should successfuly schedule multi occurrence for a particular task', async () => {
        
        //Click on a task name under a category
        let taskSeriesName = await cpSchedulerPage.productTaskList; 
        browser.taskSeriesName = taskSeriesName[0];
        browser.logger.info('Product Task List : ' + browser.taskSeriesName);
        await cpSchedulerPage.clickOnTaskByName(browser.taskSeriesName);
        await browser.sleep(1000);
    
        //Verify the Popup is displayed
        let displayStatus:boolean = await cpEditSchedulePopupPage.isPopupDisplayed;
        browser.logger.info("Scheduler popup displayed status : "+ displayStatus );
        await expect(displayStatus).toBe(true);

        //Entering Start Time
        browser.logger.info("Entering task scheduler start time as : " + scheduleStartTime);
        await cpEditSchedulePopupPage.enterStartTime(scheduleStartTime);
        await browser.sleep(1000);

        //Selectign Start Date
        browser.logger.info("Selecting task scheduler start date");
        await cpEditSchedulePopupPage.selectStartDate();
        await browser.sleep(1000);

        //Entering Repeat Hours
        browser.logger.info("Entering task scheduler repeat hours as : " + repeatEveryHour);
        await cpEditSchedulePopupPage.enterRepeatEveryHour(repeatEveryHour);
        await browser.sleep(1000);
        
        //Entering End Time
        browser.logger.info("Entering task scheduler end time as : " + scheduleEndTime);
        await cpEditSchedulePopupPage.enterEndTime(scheduleEndTime);
        await browser.sleep(1000);

        //Selecting End Date
        browser.logger.info("Selecting task scheduler end date");
        await cpEditSchedulePopupPage.selectEndDate();
        await browser.sleep(1000);

        //Enter Instructions
        browser.logger.info("Entering task scheduler instructions as : " + scheduleInstructions);
        await cpEditSchedulePopupPage.enterInstructions(scheduleInstructions);
        await browser.sleep(1000);
    
        //Click Schedule button
        browser.logger.info("Clicking on the schedule button of task scheduler popup");
        await cpEditSchedulePopupPage.clickScheduleButton();
        browser.sleep(2000);
    
        //Get the Product List
        var _productList = await cpSchedulerPage.productTaskList;
        
        //Get the order index of the task name independent of category
        var taskIndex = _productList.indexOf(browser.taskSeriesName);

        //Set the Start & End Position for the task series (row range) per task
        if(taskIndex == 0){
            startPosition = 1 ;
            endPosition = 24;
        } else if(taskIndex >= 1){
            startPosition =  taskIndex * 24 + 1;
            endPosition = startPosition + 23; 
        }

        //Get the task occurrence count for a single task series
        taskOccurrenceCount = await cpSchedulerPage.getNumberOfTaskOccurrence(startPosition, endPosition);
        browser.logger.info("Number of task occurrences displayed in the scheduler as : " + taskOccurrenceCount);
        expect(taskOccurrenceCount).toEqual(expectedNumberOfTaskOccurrences);
        await browser.sleep(1000);

        //Get the status of all the occurrence of the task series
        let taskOccurrenceStatus = await cpSchedulerPage.getTaskOccurrenceStatus(startPosition, endPosition);
        for (let index = 0; index < taskOccurrenceStatus.length; index++) {
            browser.logger.info("Status of the occurrence " + index + " is : " + taskOccurrenceStatus[index].split(' ')[0]);
            expect(taskOccurrenceStatus[index].split(' ')[0]).toEqual(actualOccurrenceStatus[index]);
        }
    });


    it('should complete a specific occurrence and verify the status after updating an occurrence', async() => {

        //Click on the task occurrence based on the index
        browser.logger.info("Click on the task occurrence by index : " + occurrenceIndex);
        await cpSchedulerPage.clickOnOccurrenceByIndex(startPosition, endPosition, occurrenceIndex);
        await browser.sleep(1000);

        //Verify the Occurrence Popup display status
        let popupDisplayStatus = await cpEditOccuranceSeriesPopup.isPopupDisplayed;
        browser.logger.info("Occurrence series popup display status : " + popupDisplayStatus)
        expect(popupDisplayStatus).toBe(true);
        await browser.sleep(1000);

        //Entering Task Notes in Occurrence Popup
        browser.logger.info("Entering task notes as : " + taskOccurrenceNotes);
        await cpEditOccuranceSeriesPopup.enterTaskNotes(taskOccurrenceNotes);
        await browser.sleep(1000);

        //Select the Task occurrence status
        browser.logger.info("Status Completed selected");
        await cpEditOccuranceSeriesPopup.selectStatusInToggleButton(taskUpdateStatus[1]);
        await browser.sleep(1000);

        //Getting Scheduled Time from Occurrence popup & Entering Occurrence Complete time
        let occurrenceCompletedTime  = await cpEditOccuranceSeriesPopup.getScheduledTime;
        browser.logger.info("Entering task occurrence completed time as : " + occurrenceCompletedTime);
        await cpEditOccuranceSeriesPopup.enterCompletedTime(occurrenceCompletedTime);
        await browser.sleep(1000);
        
        //Selecting Occurrence Completed Date
        await cpEditOccuranceSeriesPopup.selectCompletedDate();
        browser.logger.info("Selecting task occurrence completed date");
        await browser.sleep(1000);

        // Click on the Save button at Task Occurrence Popup
        await cpEditOccuranceSeriesPopup.clickOnSave();
        browser.logger.info("Save task occurrence details entered by click on save button");
        await browser.sleep(3000);

        //Verify the task occurrence status after completing
        let taskOccurrenceStatus = await cpSchedulerPage.getTaskOccurrenceStatus(startPosition, endPosition);
        browser.logger.info("Status of the occurrence " + occurrenceIndex + " is : " + taskOccurrenceStatus[occurrenceIndex].split(' ')[0]);
        expect(taskOccurrenceStatus[occurrenceIndex].split(' ')[0]).toEqual(expectedOcurrenceStatus[occurrenceIndex]);
    });


    // it('should skipped a specific occurrence and verify the status after updating an occurrence', async () => {

    //     //Click on the task occurrence based on the index
    //     browser.logger.info("Click on the task occurrence by index : " + occurrenceIndex);
    //     await cpSchedulerPage.clickOnOccurrenceByIndex(startPosition, endPosition, occurrenceIndex);
    //     await browser.sleep(1000);

    // });


});    