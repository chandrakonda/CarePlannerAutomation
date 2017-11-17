import { AppointmentController } from '../../lib/apiControllers/appointmentController';
import { AuthController } from '../../lib/apiControllers/authController';
import { ClientAndPatientController } from '../../lib/apiControllers/clientAndPatientController';
import { VisitController } from '../../lib/apiControllers/visitController';
import { browser, protractor } from 'protractor';
import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';
import { OrderController } from '../../lib/apiControllers/orderController';
import { CarePlannerSchedulerPage } from '../../pages/carePlanner/cpScheduler.page';
import { CarePlannerEditSchedulePopup } from '../../pages/carePlanner/cpEditSchedulePopup.page';


let cpSchedulerPage, cpPetDetailsPage,cpEditSchedulePopupPage;
//let authController, clientAndPatientController, appointmentController;

describe('Verify the Patient Header has accurate Patient and Visit information', () => {

    beforeAll(() => {
        cpPetDetailsPage = new CarePlannerPetDetails();
        cpSchedulerPage = new CarePlannerSchedulerPage();
        let authController: AuthController = new AuthController();
        let clientAndPatientController: ClientAndPatientController = new ClientAndPatientController();
        let appointmentController: AppointmentController = new AppointmentController();
        let visitController: VisitController = new VisitController();
        let orderController: OrderController = new OrderController();
        cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
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
            
          //  browser.executeScript("document.body.style.zoom='80%'");
            browser.sleep(5000);
            browser.logger.info("*********** Executing Tests ***********");
        });
       

    });

    /// Test cases 


    it('Should have the title as VCA Charge Capture', async () => {
        browser.logger.info("***********Verifying Page Title***********");
        if ('VCA Charge Capture' == await cpPetDetailsPage.pageTitle) {
            browser.logger.info("Page title is matching");
        }
        else {
            browser.logger.error("Page title is not matching");
            fail("Page title are not matching");
        }
    });


    it('Pet name should be correct', async () => {

        let __patientName = browser.patientName.length >= 12 ? browser.patientName.slice(0, 12) + '…' : browser.patientName;

        if (__patientName  == await cpPetDetailsPage.petName) {
            browser.logger.info("Patient name is matching");
        }
        else {
            browser.logger.error("Patient name is not matching");
            fail("Patient names are not matching");
        }
    });

    it('Client last name should be correct ', async () => {
        let __clientLastName = browser.clientLastName.length >= 12 ? browser.clientLastName.slice(0, 12) + '…' : browser.clientLastName;

        if (__clientLastName == await cpPetDetailsPage.clientName) {

            browser.logger.info("Client name is matching");
        }
        else {
            browser.logger.error("Client name is not matching");
            fail("Client names are not matching");
        }

    });

    it('Should have the Species Name as Canine ', async () => {

        if ('Canine' == await cpPetDetailsPage.speciesName) {
            browser.logger.info("Species name is matching");
        }
        else {
            browser.logger.error("Species name is not matching");
            fail("Species names are not matching");
        }

    });

    it('Should validate primary doctor name ', async () => {
        
        browser.logger.info('validate doctor name');
        // let __dirname1 :string  = await cpPetDetailsPage.primaryDrName;

        // if (true) {
        //     browser.logger.info(__dirname1);
        // }
        

    });

    it('Should validate category count ', async () => {
        
       var __catCount =  await cpSchedulerPage.categoryCount;

       browser.logger.info("Cat count "+__catCount);
               
    });

 

    it('Should validate category count ', async () => {
        
       var __productTaskList =  await cpSchedulerPage.productTaskListCount;

       browser.logger.info("task list count  "+__productTaskList);
               
    });

    it('Should validate non scheduled task count ', async () => {
        
       var __productTaskList =  await cpSchedulerPage.nonScheduledProductTaskCount;

       browser.logger.info("non scheduled "+__productTaskList);
               
    });

    it('Click on Vitals Task series ', async () =>{
        cpSchedulerPage = new CarePlannerSchedulerPage();
        browser.logger.info(cpSchedulerPage.productTaskList);
        await cpSchedulerPage.clickOnTaskName("Vitals");
    });

    it('Enter repeat hours ', () =>{
        
       // browser.sleep(3000);
        cpEditSchedulePopupPage.EnterRepeatEveryHour(1);
       // expect(cpEditSchedulePopupPage.repeatEvery).toEqual(3);
    });


    
    it('Enter End time ', () =>{
        //cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
        browser.sleep(3000);
        cpEditSchedulePopupPage.EnterEndTime(19.00);
       // expect(cpEditSchedulePopupPage.repeatEvery).toEqual(3);
    });

    it('Enter instructions  ', () =>{
       // cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
        //browser.sleep(3000);
        cpEditSchedulePopupPage.EnterInstructions("Enter your instructions");
       // expect(cpEditSchedulePopupPage.repeatEvery).toEqual(3);
    });

    it('Click on Schedule button ', () =>{
       // cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
        //browser.sleep(3000);
        cpEditSchedulePopupPage.ClickScheduleButton();
       // expect(cpEditSchedulePopupPage.repeatEvery).toEqual(3);

       browser.sleep(7000);
    });


});    