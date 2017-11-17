import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import { AppointmentController } from '../lib/apiControllers/appointmentController';
import { AuthController } from '../lib/apiControllers/authController';
import { ClientAndPatientController } from '../lib/apiControllers/clientAndPatientController';
import { VisitController } from '../lib/apiControllers/visitController';
import { CarePlannerPetDetails } from '../pages/carePlanner/cpPetdetails.page';
import { OrderController } from '../lib/apiControllers/orderController';

var sql = require('mssql');
let cpSchedulerPage, cpPetDetailsPage;

describe('Verify the Patient Header has accurate Patient and Visit information', () => {
    var flow = protractor.promise.controlFlow();
    beforeAll(() => {
        cpPetDetailsPage = new CarePlannerPetDetails();
        let authController : AuthController = new AuthController();
        let clientAndPatientController : ClientAndPatientController = new ClientAndPatientController();
        let appointmentController :AppointmentController = new AppointmentController();
        let visitController :VisitController = new VisitController();
        let orderController: OrderController = new OrderController();

        //Get data from db
        flow.execute(() => {
        });        

        //Creating a Auth Token
        flow.execute(authController.getAuthToken).then((response) => {
            browser.logger.info("Getting Basic Auth token...");
            browser.token=response;
            browser.bearerToken =  'bearer ' + response;     
            browser.logger.info("Bearer token: " + browser.bearerToken);    
        });

        //Create a Client
        flow.execute(clientAndPatientController.createClient).then((response) => {
            browser.logger.info("Creating a new client...");
            //browser.logger.info(JSON.stringify(response));
            browser.clientID = response['ClientId'];
            browser.logger.info("ClientId: " + browser.clientID);
            browser.logger.info("Client name: " + response['FirstName'] + ' '+ response['LastName']);
        });

        // Create patient
        flow.execute(clientAndPatientController.createPatient).then((response) => {
            browser.logger.info("Creating a new patient...");
            //browser.logger.info(JSON.stringify(response));            
            browser.patientID = response;
            browser.logger.info("PatientId: " + browser.patientID);           
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
        flow.execute(visitController.getVisitDetailsByVisitId).then(function (response){
            browser.logger.info("Visit Details & Invoice Details by Visit Id...");
            //browser.logger.info(JSON.stringify(response));
            browser.visitInvoiceItems = response[0].VisitInvoiceItems;

            for(let items of browser.visitInvoiceItems) {
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

            for(let items of browser.taskOccurances) {
                browser.taskSeriesId = items.TaskSeriesId;
                browser.taskOccurrenceId = items.TaskOccurrenceId;
                browser.logger.info("Task Series Id :'" + browser.taskSeriesId +"' for OrderId : '" + browser.visitId + "'");
                browser.logger.info("Task Occurance Id :'" + browser.taskOccurrenceId +"' for OrderId : '" + browser.visitId + "'");
            }
        });

        // Get resource id to form care planner URL 
        flow.execute(visitController.getVisitResources).then(function (response) {
            browser.logger.info("Getting User Id...");
            // browser.logger(JSON.stringify(response));

            for (let i in response){
                // browser.logger(response[i]);
                let user = response[i];
                if (user['ADusername']==browser.appenvdetails.username){
                    browser.logger.info('UserId: ',user['ResourceId']);
                    browser.userId=user['ResourceId'];
                }
            }
        });

        // Form URL to navigate to Careplanner
        flow.execute(() => {
            browser.logger.info("*********** Launching Browser ***********");
            browser.logger.info("Creating URL and launching browser...");
            var url = browser.baseUrl+
                    '?hospitalId='+browser.appenvdetails.hospitalid+
                    '&patientId='+browser.patientID+
                    '&orderId='+browser.visitId+
                    '&userName='+browser.appenvdetails.username+
                    '&userId='+browser.userId+
                    '&accessToken='+browser.token;
            browser.logger.info('URL: ',url);
            browser.get(url);
            browser.sleep(3000);
            browser.logger.info("*********** Executing Tests ***********");
        });                

    }); // end BeforeAll

    /// Test cases 
    it('Should have the title as VCA Charge Capture', () => {    
        browser.logger.info("***********Verifying Page Title***********");
        expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
    });

    it('Should have the Pet Name as Lilly ', async () =>{
        await expect(cpPetDetailsPage.petName).toEqual('Lilly');
    });
    
    it('Should have the Client Name as Chandra ', async () => {
        await expect(cpPetDetailsPage.clientName).toEqual('Chandra');
    });
    
    it('Should have the Species Name as Canine ', async () => {
        await expect(cpPetDetailsPage.speciesName).toEqual('Canine');
    });   

    it('New client should exist in db', async() => {
        console.log('-----  Starting db test...  -------');
        var config = {
            user: 'ha',
            password: 'D3nnyW@$here',
            server: 'hcorpqa-db02',
            database: 'SparkyHosp153_QA'
        };
        console.log('server: ',config.server);

        var conn = new sql.ConnectionPool(config);
        var request = new sql.Request(conn);

        var fname='Matt';
        var lname='Flanzer';
        var records;

        conn.connect(function(err){
            if (err){
                console.log(err);
            }
            request.query("SELECT TOP 1 * FROM dbo.Client ORDER BY 1 ASC", function(err, rs){
                if (err) {console.log(err);}
                else {
                    console.log('rs: ',rs);
                    records = rs;
                }
                conn.close();
            });
        });

        console.log('records: ',records);
        // expect(records.FirstName).toEqual(fname);

    });

});    