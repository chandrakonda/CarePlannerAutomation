import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import * as moment from 'moment';
var request = require('request');
import { WWApiCalls } from '../../lib/woofwareApiCall';
import { CarePlannerSchedulerPage } from '../../pages/carePlanner/cpScheduler.page';
import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';

let cpSchedulerPage, cpPetDetailsPage;

export class testSetupScenarios {

    basicSetup(cfName,clName,pName,pSpecies,pGender) {
        //set up variables for test
        browser.clientFirstNameBase=cfName;
        browser.clientLastNameBase=clName;
        browser.petNameBase=pName;
        
        if (pSpecies.toLowerCase() == 'canine'){
            browser.petSpeciesId=1;browser.petSpeciesName=pSpecies.toLowerCase();}
        else if (pSpecies.toLowerCase() == 'feline'){
            browser.petSpeciesId=2;browser.petSpeciesName=pSpecies.toLowerCase();}
        else {browser.petSpeciesId=1;browser.petSpeciesName='canine';}//default to canine
        
        if (pGender.toLowerCase() == 'male'){ 
            browser.petGenderId=1; browser.petSexId=1; 
            browser.petGenderName=pGender.toLowerCase();}
        else if (pGender.toLowerCase() == 'female'){ 
            browser.petGenderId=4; browser.petSexId=2;
            browser.petGenderName=pGender.toLowerCase();}
        else {browser.petGenderId=4; browser.petSexId=2;
            browser.petGenderName='female';} //default to female


        let api = new WWApiCalls(); 
        var flow = protractor.promise.controlFlow();
    
        // flow.execute( () => {
        //     var sql = require('mssql');
        //     var config = {
        //         user:'ha',
        //         password:'D3nnyW@$here',
        //         server:'lapmsqa-db04',
        //         database:'SparkyHosp595_QA'
        //     }

        //     sql.connect(config, function(err){
        //         if (err){console.log(err);}
        //         var request = new sql.Request();
        //         request.query('SELECT TOP 10 * FROM dbo.Client',function(err,recordset){
        //             if (err){console.log(err);}
        //             console.log(recordset);
        //         });
        //     });
        // });        
        //Get an Auth Token
        flow.execute(api.getAuthToken).then(function (response) {
          console.log("--- Getting Basic Auth token...  ----------");
          // console.log("Access Token: " + response);
          browser.token=response;
          browser.bearerToken =  'bearer ' + response;     
          console.log("Bearer token: " + browser.bearerToken);    
        }); 
    
        //Create a Client
        flow.execute(api.createClient).then(function (response) {
          console.log("--- Creating a new client...  ----------");
          console.log(JSON.stringify(response));
          browser.clientID = response['ClientId'];
          console.log("ClientId: " + browser.clientID);
          console.log("Client name: " + response['FirstName'] + ' '+ response['LastName']);
        });
    
        //Create a Patient
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
          console.log(response);
        });  
    
        //Get checked in patient's details
        flow.execute(api.getCheckedInPatientDetails).then(function (response) {
            console.log("--- Getting details of checked in appointment...  ----------");
            console.log(JSON.stringify(response));
            browser.visitId = response[0].VisitId;
        });
    
        //Get userId for resource in appconfig
        // Note: the 'userId' value in the url is actually the value in dbo.Resource.ResourceId
        // and not the value in dbo.User.UserId.  Which value is used doesn't seem to make a 
        // difference to the functionality though.
        flow.execute(api.getVisitResources).then(function (response) {
            console.log("--- Getting User Id...  ----------");
            // console.log(JSON.stringify(response));
      
            for (let i in response){
                // console.log(response[i]);
                let user = response[i];
                if (user['ADusername']==browser.appenvdetails.runtimeenvironment.userName){
                    console.log('UserId: ',user['ResourceId']);
                    browser.userId=user['ResourceId'];
                }
            }
        });

        //Add line item to visit
        // flow.execute(api.putVisitInvoiceItems).then(function (response) {
        //     console.log("--- Adding line item to visit...  ----------");
        //     console.log(response);
        // });
    
        //launch browser
        flow.execute(() => {
          console.log("\n*********** Launching Browser ***********");
          console.log("--- Creating URL and launching browser...  ----------");
          var url = browser.baseUrl+
                    '?hospitalId='+browser.appenvdetails.runtimeenvironment.hospitalId+
                    '&patientId='+browser.patientID+
                    '&orderId='+browser.visitId+
                    '&userName='+browser.appenvdetails.runtimeenvironment.userName+
                    '&userId='+browser.userId+
                    '&accessToken='+browser.token;
          console.log('URL: ',url);
          browser.get(url);
          browser.sleep(6000);
    
          console.log("\n*********** Executing Tests ***********");
        });        

    }


}
