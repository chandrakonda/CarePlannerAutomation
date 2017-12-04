import { browser, element, by, ExpectedConditions, protractor } from 'protractor';

import { AppointmentController } from '../../lib/apiControllers/appointmentController';
import { AuthController } from '../../lib/apiControllers/authController';
import { ClientAndPatientController } from '../../lib/apiControllers/clientAndPatientController';
import { VisitController } from '../../lib/apiControllers/visitController';
import { OrderController } from '../../lib/apiControllers/orderController';

import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';
import { AddOptionalTaskDialog } from '../../pages/carePlanner/addTaskDialog.page';
import { CarePlannerSchedulerPage } from '../../pages/carePlanner/cpScheduler.page';
import * as moment from 'moment';

let schdedulerPage, cpPetDetailsPage, addTask;

describe('Verify user can add an optional task', () => {

    beforeAll(() => {
        cpPetDetailsPage = new CarePlannerPetDetails();
        addTask = new AddOptionalTaskDialog();
        schdedulerPage = new CarePlannerSchedulerPage();

        let authController: AuthController = new AuthController();
        let clientAndPatientController: ClientAndPatientController = new ClientAndPatientController();
        let appointmentController: AppointmentController = new AppointmentController();
        let visitController: VisitController = new VisitController();
        let orderController: OrderController = new OrderController();

        // Set Values for Global Variables
        browser.productDataFile='test_addTask.spec.data';
        browser.taskName = 'Body weight';
        
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
            browser.patientName; 
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
            // browser.token='0uOXfFVs5INHMjqHjeoV9DeZKg2oMxfXBmQRTAmhBwVZpKpDcCe3mFy70TBAabTMwoZXQmg_mQ_RMBbEf_th03LeUuwxmbvWEHih1qZZ1ntCMgfCTZV-N-bwyk3-rAxG39ZlQv4acz9gQKQwwgNAeADbOJqr9vJ4Ndlm8apD_KQLKofsb3zaa3FnMU1CHWxeYBHenK2uooucMW-gAriyjnr5vUnbPCfHdIxWCkjZRkMgLVDe_Cb0YT9cq1y9KdN0wStdLw';
            // browser.patientID=314759968;
            // browser.visitId=472962947;            
            var url = browser.baseUrl+
                      '?hospitalId='+browser.appenvdetails.hospitalid+
                      '&patientId='+browser.patientID+
                      '&orderId='+browser.visitId+
                      '&userName='+browser.appenvdetails.username+
                      '&userId='+browser.userId+
                      '&accessToken='+browser.token;
            browser.logger.info('URL: ',url);
            browser.get(url);
            browser.sleep(4000);
            browser.logger.info("*********** Executing Tests ***********");
          });
          browser.ignoreSynchronization = true;
    });

    /// Test cases 
    it('- the page has the title "VCA Charge Capture"', async () => {    
        browser.logger.info("***********Verifying Page Title***********");
        await expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
    });

    it('- user can open the AddTask dialog', async () => {    
        addTask.openAddTaskDialog();
        browser.sleep(3000);
        await expect(addTask.getAddTaskHeaderTitle).toEqual('Add Task');
    });    

    it('- user can select a task from the list', async () => {    
        addTask.setTaskLocatorString(browser.taskName); //taskName defined as global variable at start of spec
        addTask.selectTaskFromList();
        browser.sleep(1500);
        await expect(addTask.selectedTaskName).toEqual(browser.taskName);
        await expect(addTask.getSelectHeaderText).toContain('1');
    });    

    it('- user can add selected tasks to the schedule', async () => {    
        addTask.addSelectedTasksToScheduler();
        // browser.sleep(3000);
        
        schdedulerPage.productTaskList.then(function(value){
            // console.log(value);
            expect(value).toContain[browser.taskName];
        })

    });        
});      

