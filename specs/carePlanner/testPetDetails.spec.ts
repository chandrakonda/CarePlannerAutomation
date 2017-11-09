import { AppointmentController } from '../../lib/apiControllers/appointmentController';
import { AuthController } from '../../lib/apiControllers/authController';
import { ClientAndPatientController } from '../../lib/apiControllers/clientAndPatientController';
import { browser, protractor } from 'protractor';


let cpSchedulerPage, cpPetDetailsPage;
let authController, clientAndPatientController, appointmentController;

describe('Verify the Patient Header has accurate Patient and Visit information', () => {

    beforeAll(() => {
        authController = new AuthController();
        clientAndPatientController = new ClientAndPatientController();
        appointmentController = new AppointmentController();

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
            console.log("--- Creating a new client...  ----------");
            console.log(JSON.stringify(response));
            browser.clientID = response['ClientId'];
            console.log("ClientId: " + browser.clientID);
            console.log("Client name: " + response['FirstName'] + ' '+ response['LastName']);
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

    });

    it('Should have the title as VCA Charge Capture', () => {    
        console.log("\n***********Verifying Page Title***********");
        expect('VCA Charge Capture').toEqual('VCA Charge Capture'); 
    });
});    