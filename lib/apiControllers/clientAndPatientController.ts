import { browser } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');

export class ClientAndPatientController{

    //private apiServices;
    //private options; 
    
    constructor() {
        //this.apiServices = new CarePlannerApiServices();
    }

    createClient() {
        let options = require(path.join(__dirname, '..//..//..//data//jsonObjects//createClientDetails.json'));
        console.log("\n*********** Creating Client ***********");
    
        //Set URL
        options.url = browser.appenvdetails.wwapiendpoint + 'Clients';
    
        //Set qs values
        // options.qs.ignoreDuplicateAddress = "true";
        // options.qs.validateAddress = "false";
        // options.qs.ignoreDuplicatePhone = "true";
    
        //Set header values
        options.headers['x-hospital-id']=browser.appenvdetails.hospitalId;
        options.headers.authorization = browser.bearerToken;
    
        //Set body data
        var timestamp = new Date().getTime();
        //browser.timestamp = timestamp;
        // var fname = "Steve_" + timestamp;
        // var lname = "Rogers_" + timestamp;
        options.body.FirstName = "Steve_" + timestamp;;
        options.body.LastName = "Rogers_" + timestamp;;
        options.body.HospitalId = browser.appenvdetails.hospitalId;
    
        let apiServices = new CarePlannerApiServices();
        return apiServices.postRequest(options);
    }

    //TODO: Need to implement the get service method in ClientServices.ts
    getClientById(clientId){
        //let options = require(path.join(__dirname, '..//..//..//data//jsonObject//getclientDetails.json'));
        //let apiServices = new CarePlannerApiServices();
        //return apiServices.getRequest(options);
    }

    //TODO: Need to implement the put service method in ClientServices.ts
    updateClientById(clientId){
        //let options = require(path.join(__dirname, '..//..//..//data//jsonObject//getclientDetails.json'));
        //let apiServices = new CarePlannerApiServices();
        //return apiServices.putRequest(options);
    }


    createPatient(){
        console.log("\n*********** Creating Patient ***********");
        let options = require(path.join(__dirname, '..//..//..//data//jsonObjects//createPatientDetails.json'));
        //var options = { "method": "POST", "url": "", "qs": { "ignoreDuplicateAddress": "true", "validateAddress": "false", "ignoreDuplicatePhone": "true" }, "headers": { "cache-control": "no-cache", "content-type": "application/json", "applicationname": "Retriever", "username": "PTM-WebApp-qa", "x-hospital-id": "153", "authorization": "" }, "body": { "ClientId": "", "HospitalId": 153, "PatientId": 0, "PatientName": "Lilly", "GenderId": 2, "SpeciesId": 1, "SpeciesName": "Canine", "DateOfBirth": "2015-06-16T00:00:00", "Breeds": [{ "BreedId": 156, "BreedName": "Rhodesian Ridgeback","Description": "Rhodesian Ridgeback", "SpeciesId": 1, "ZoasisBreed": "RHOD" }], "Appearances": [{ "AppearanceId": 163, "AppearanceName": "Black And Beige", "AppearanceTypeId": 1, "AppearanceValue": "Black And Beige", "IsActive": true }], "Weight": 3.5, "WeightUnit": "lb", "EnteredDate": "2017-10-30T00:00:00", "HasModifiedWeight": false, "Photo": null, "Neutered": "Neutered", "Sex": { "SexId": 1, "Name": "Male" }, "HasWellnessMembership": false, "DOBAgeAsEntered": "6/16/2015", "PetAge": "2y 4m", "IsPatientCareClubMember": false, "BreedNames": "Canaan Dog", "IsNewPatient": true, "Notes": "This dog will bite you ", "IsModified": null, "NumberOfActiveMemberships": 0, "EarliestMembershipStartDate": null, "HasPhoto": false, "EnteredWeight": "3.5 lb", "EnteredWeightUnitId": 3 }, "json": true };
    
        //Set URL
        options.url = browser.appenvdetails.runtimeenvironment.WWApiEndpoint + 'Patients'
    
        //Set qs values
        // options.qs.ignoreDuplicateAddress = "true";
        // options.qs.validateAddress = "false";
        // options.qs.ignoreDuplicatePhone = "true";
    
        //Set header values
        options.headers['x-hospital-id']=browser.appenvdetails.runtimeenvironment.hospitalId;
        options.headers.authorization = browser.bearerToken;
    
        //Define patient data
        
        browser.patientName = browser.petNameBase+'_'+browser.timestamp;
    
        //Set body data
        options.body.ClientId = browser.clientID;
        options.body.PatientName = browser.patientName;
        options.body.HospitalId = browser.appenvdetails.runtimeenvironment.hospitalId;
        options.body.GenderId = browser.petGenderId;
        options.body.SpeciesId = browser.petSpeciesId;
        options.body.SpeciesName = browser.petSpeciesName;
        
        let apiServices = new CarePlannerApiServices();
        return apiServices.postRequest(options);
    }

}