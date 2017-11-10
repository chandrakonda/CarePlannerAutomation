// import * as console from 'console';
// import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
// import { CarePlannerSchedulerPage } from '../pages/carePlanner/cpScheduler.page';
// import { CarePlannerPetDetails } from '../pages/carePlanner/cpPetdetails.page';
// var request = require('request');
// import { WWApiCalls } from '../lib/woofwareApiCall';
// //const cheerio = require('cheerio')

// let cpSchedulerPage, cpPetDetailsPage;

// describe('Verify the Patient Header has accurate Patient and Visit information', () => {

//   beforeAll(function () {
//     let api = new WWApiCalls(); 
//     var flow = protractor.promise.controlFlow();

//     //Creating a Auth Token
//     flow.execute(api.getAuthToken).then(function (response) {
//       console.log("--- Getting Basic Auth token...  ----------");
//       // console.log("Access Token: " + response);
//       browser.token=response;
//       browser.bearerToken =  'bearer ' + response;     
//       console.log("Bearer token: " + browser.bearerToken);    
//     });

//     // flow.execute(api.getOAuthToken).then(function (response) {
//     //     console.log("--- Getting OAuth token...  ----------");
//     //     var html = cheerio(response);
//     //     var token = html.find('textarea').text();
//     //     console.log('Token value: ',token);
//     //   });    

//     //Creating a Client
//     flow.execute(api.createClient).then(function (response) {
//       console.log("--- Creating a new client...  ----------");
//       console.log(JSON.stringify(response));
//       browser.clientID = response['ClientId'];
//       console.log("ClientId: " + browser.clientID);
//       console.log("Client name: " + response['FirstName'] + ' '+ response['LastName']);
//     });

//     //Creating a Patient
//     flow.execute(api.createPatient).then(function (response) {
//       console.log("--- Creating a new patient...  ----------");  
//       console.log(JSON.stringify(response));
//       browser.patientID = response;
//       console.log("PatientId: " + browser.patientID);
//     });

//     //Create a new appointment for patient
//     flow.execute(api.createNewAppointment).then(function (response) {
//       console.log("--- Creating a new appointment...  ----------"); 
//       console.log(JSON.stringify(response));
//       browser.appointmentID = response['AppointmentId'];
//       console.log("Appointment ID: " + browser.appointmentID);
//     });

//     //Check appointment in
//     flow.execute(api.checkInAppointment).then(function (response) {
//       console.log("--- Checking in the appointment...  ----------");
//       console.log(JSON.stringify(response));
//       // browser.appointmentID = response['AppointmentId'];
//       // console.log("Appointment ID: " + browser.appointmentID);
//     });  

//     //Get checked in patient's details
//     flow.execute(api.getCheckedInPatientDetails).then(function (response) {
//         console.log("--- Getting details of checked in appointment...  ----------");
//         console.log(JSON.stringify(response));
//     });

//     //launch browser
//     flow.execute(() => {
//       console.log('\n************Launching browser*************')
//       cpPetDetailsPage = new CarePlannerPetDetails();
//       var orderId=browser.appointmentId;

//       browser.get(browser.baseUrl+browser.token);
//       browser.sleep(3000);
//     });
//   });

//   it('Should have the title as VCA Charge Capture', () => {    
//     console.log("\n***********Verifying Page Title***********");
//     expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
//   });
// });