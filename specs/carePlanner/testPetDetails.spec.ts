import { AppointmentController } from '../../lib/apiControllers/appointmentController';
import { AuthController } from '../../lib/apiControllers/authController';
import { ClientAndPatientController } from '../../lib/apiControllers/clientAndPatientController';
import { VisitController } from '../../lib/apiControllers/visitController';
import { browser, protractor } from 'protractor';
import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';
import { OrderController } from '../../lib/apiControllers/orderController';


let cpSchedulerPage, cpPetDetailsPage;
//let authController, clientAndPatientController, appointmentController;

describe('Verify the Patient Header has accurate Patient and Visit information', () => {

    beforeAll(() => {
        cpPetDetailsPage = new CarePlannerPetDetails();
        //console.log("before all");
        let authController : AuthController = new AuthController();
        let clientAndPatientController : ClientAndPatientController = new ClientAndPatientController();
        let appointmentController :AppointmentController = new AppointmentController();
        let visitController :VisitController = new VisitController();
        let orderController: OrderController = new OrderController();
        
        var flow = protractor.promise.controlFlow();
        
        //Creating a Auth Token
        flow.execute(authController.getAuthToken).then((response) => {
            console.log("--- Getting Basic Auth token...  ----------");
            browser.token=response;
            browser.bearerToken =  'bearer ' + response;     
            console.log("Bearer token: " + browser.bearerToken);    
        });

       
        //Create a Client
        flow.execute(clientAndPatientController.createClient).then((response) => {
          //  console.log("--- Creating a new client...  ----------");
           // console.log(JSON.stringify(response));
            browser.clientID = response['ClientId'];
           // console.log("ClientId: " + browser.clientID);
           // console.log("Client name: " + response['FirstName'] + ' '+ response['LastName']);
        });
        // Create patient
        flow.execute(clientAndPatientController.createPatient).then((response) => {
            console.log("--- Creating a new client...  ----------");
            console.log(JSON.stringify(response));            
            browser.patientID = response;
            console.log("PatientId: " + browser.patientID);           
        });

        //Create a new appointment for patient
        flow.execute(appointmentController.createNewAppointment).then(function (response) {
            console.log("--- Creating a new appointment...  ----------"); 
            console.log(JSON.stringify(response));
            browser.appointmentID = response['AppointmentId'];
            console.log("Appointment ID: " + browser.appointmentID);
        });

        //Check appointment in
        flow.execute(appointmentController.checkInAppointment).then(function (response) {
            console.log("--- Checking in the appointment...  ----------");
            console.log(JSON.stringify(response));
            console.log(response);
        }); 

        //Get checked in patient's details
        flow.execute(appointmentController.getCheckedInPatientDetails).then(function (response) {
            console.log("--- Getting details of checked in appointment...  ----------");
            console.log(JSON.stringify(response));
            browser.visitId = response[0].VisitId;
        });

        //Add Product to the Visit
        flow.execute(orderController.addOrderToVisit).then(function (response) {
            console.log("--- Product Ordered Response...  ----------");
            console.log(JSON.stringify(response));
        });

        // Get resource id to form care planner URL 
        flow.execute(visitController.getVisitResources).then(function (response) {
            console.log("--- Getting User Id...  ----------");
            // console.log(JSON.stringify(response));
      
            for (let i in response){
                // console.log(response[i]);
                let user = response[i];
                if (user['ADusername']==browser.appenvdetails.username){
                    console.log('UserId: ',user['ResourceId']);
                    browser.userId=user['ResourceId'];
                }
            }
        });

        // Form URL to navigate to Careplanner
        flow.execute(() => {
            console.log("\n*********** Launching Browser ***********");
            console.log("--- Creating URL and launching browser...  ----------");
            var url = browser.baseUrl+
                      '?hospitalId='+browser.appenvdetails.hospitalid+
                      '&patientId='+browser.patientID+
                      '&orderId='+browser.visitId+
                      '&userName='+browser.appenvdetails.username+
                      '&userId='+browser.userId+
                      '&accessToken='+browser.token;
            console.log('URL: ',url);
            browser.get(url);
           browser.sleep(3000);
      
            console.log("\n*********** Executing Tests ***********");
          });        

    });

    /// Test cases 

      it('Should have the title as VCA Charge Capture', () => {    
    console.log("\n***********Verifying Page Title***********");
    expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
    });

    // it('Should have the title as VCA Charge Capture', () => {    
    //     console.log("\n***********Verifying Page Title***********");
    //     expect('VCA Charge Capture').toEqual('VCA Charge Capture'); 
    // });

    // it('Should have the title as VCA Charge Capture', () => {    
    //     console.log("\n***********Verifying Page Title***********");
    //     expect('VCA Charge Capture').toEqual('VCA Charge Capture'); 
    // });

    // it('Should have the title as VCA Charge Capture', () => {    
    //     console.log("\n***********Verifying Page Title***********");
    //     expect('VCA Charge Capture').toEqual('VCA Charge Capture'); 
    // });

});    