import * as console from 'console';
import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import { CarePlannerSchedulerPage } from '../pages/carePlanner/cpScheduler.page';
import { CarePlannerPetDetails } from '../pages/carePlanner/cpPetdetails.page';
var request = require('request');
import { WWApiCalls } from '../lib/woofwareApiCall';

let cpSchedulerPage, cpPetDetailsPage;

describe('Verify the Careplanner Scheduler Page', () => {

  beforeAll(function () {
    let api = new WWApiCalls(); 
    var flow = protractor.promise.controlFlow();

    //Creating a Auth Token
    flow.execute(api.getAuthToken).then(function (response) {
      console.log("--- Getting access token...  ----------");
      // console.log("Access Token: " + response);
      browser.token=response;
      browser.bearerToken =  'bearer ' + response;     
      console.log("Bearer token: " + browser.bearerToken);      
    });

    //Creating a Client
    flow.execute(api.createClient).then(function (response) {
      console.log("--- Creating a new client...  ----------");
      console.log(JSON.stringify(response));
      browser.clientID = response['ClientId'];
      console.log("ClientId: " + browser.clientID);
      console.log("Client name: " + response['FirstName'] + ' '+ response['LastName']);
    });

    //Creating a Patient
    flow.execute(api.createPatient).then(function (response) {
      console.log("--- Creating a new patient...  ----------");  
      console.log(JSON.stringify(response));
      browser.patientID = response;
      console.log("PatientId: " + browser.patientID);
    });

    //Create a new appointment for patient
    flow.execute(api.createNewAppointment).then(function (response) {
      console.log("--- Creating a new appointment...  ----------"); 
      console.log(JSON.stringify(response));
      browser.appointmentID = response['AppointmentId'];
      console.log("Appointment ID: " + browser.appointmentID);
    });

    //Check appointment in
    flow.execute(api.checkInAppointment).then(function (response) {
      console.log("--- Checking in the appointment...  ----------");
      console.log(JSON.stringify(response));
      // browser.appointmentID = response['AppointmentId'];
      // console.log("Appointment ID: " + browser.appointmentID);
    });  

    //launch browser
    flow.execute(() => {
      console.log('************Launching browser*************')
      cpPetDetailsPage = new CarePlannerPetDetails()
      browser.get(browser.baseUrl+browser.token);
      browser.sleep(3000);
    });
  });

  it('Should have the title as VCA Charge Capture', () => {    
    console.log("***********Verifying Page Title***********");
    expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
  });
});
