import * as console from 'console';
import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import { CarePlannerSchedulerPage } from '../pages/carePlanner/cpScheduler.page';
import { CarePlannerPetDetails } from '../pages/carePlanner/cpPetdetails.page';
var request = require('request');
import { WWApiCalls } from '../lib/woofwareApiCall';

let cpSchedulerPage, cpPetDetailsPage;

describe('Verify the Careplanner Scheduler Page', () => {

  // beforeAll( () =>{
  //   cpPetDetailsPage = new CarePlannerPetDetails();
  //   cpSchedulerPage = new CarePlannerSchedulerPage();
  //   // cpPetDetailsPage.navigateTo();   // comments
  //   console.log("***********URL Launched***********");
  // });
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
 
  
  // it("test", function () {
  //   //let token: String = 'TEpdV-u6cquITUixTODkZ9t-7ZG8luIvHV3ekb1UlvZz5QwXu7Ux4Hrlg3_YK4lAif_uoJKPplPWhr_gvGViujJT3k51Hqjav88nwTv8pJ5aPxO7aPlKOGruYqhuDd3pU8e81RT71eQAeucODnQjpLuGFjyu50EPPrEWA0HL6tesT2dTuHozfpOjWF43OM-QpHlUM4-XSrMrLlnV8KJn2wz7e_DwyAwp9z1ISpLwf0IW1DCTtTtntqPrQh0wF82FBRMLIw';
  //   let api = new WWApiCalls();
    
    
  //   var flow = protractor.promise.controlFlow();

  //   //Creating a Auth Token
  //   flow.execute(api.getAuthToken).then(function (response) {
  //     console.log("Access Token " + response);
  //     browser.bearerToken =  'bearer ' + response;     
  //     console.log("*************Bearer Token*******************: " + browser.bearerToken);      
  //   });

  //   //Creating a Client
  //   flow.execute(api.createClient).then(function (response) {
  //     console.log(JSON.stringify(response));
  //     browser.clientID = response['ClientId'];
  //     console.log("************ Created Client ID : " + browser.clientID);
  //   });

  //   //Creating a Patient
  //   flow.execute(api.createPatient).then(function (response) {
  //       console.log(JSON.stringify(response));
  //       browser.patientID = response;
  //       console.log("************Second client response ***************" + browser.patientID);
  //   });
  // });

  it('Should have the title as VCA Charge Capture', () => {    
    console.log("***********Verifying Page Title***********");
    expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
  });
});




    // }).then( ()=> {
    //   console.log('*******************launching browser*************************');
    //   console.log("token: "+token);
    //   var url = browser.baseUrl+token;
    //   console.log("URL: "+url);
    //   browser.get(url);
    //   browser.sleep(4000);
    // });



  // it('Should have the title as VCA Charge Capture', () => {
  //   // console.log("***********Verifying Page Title***********");
  //   console.log('TEST 1')
  //   expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture');
  // });



