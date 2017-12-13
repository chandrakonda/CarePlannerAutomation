import { browser } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');

export class ClientAndPatientController {

    //private apiServices;
    //private options; 
    static __timestamp = new Date().getTime();
    constructor() {
        browser.logger.info("*********** ClientAndPatientController ***********");
        //this.__timestamp = new Date().getTime();
        //this.apiServices = new CarePlannerApiServices();
    }

 

    async createClient1(token: any) {
        try {
            browser.logger.info("*********** Creating Client ***********");
            let options = await this.setCreateClientOptions(token);
            browser.logger.info(options);
            let __apiServices = new CarePlannerApiServices();
            // Create client 
            let __response = await __apiServices.makeApiCall(options).then((response) => {
                return response;
            });
            // parse response
            let __clientResponse = await __apiServices.parseResultOfMakePostRequest(__response).then((response) => {
                browser.logger.info(response);
                browser.LastName = (response.LastName);
                browser.clientID =(response.ClientId);
                return response.LastName;
            });

            browser.logger.info("__clientResponse" +browser.LastName +"       "+ browser.clientID );
        } catch (e) {
            throw e;
        }
    }

    setCreateClientOptions(token: any) {
        let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postClients.json'));
        //Set URL
        options.url = browser.appenvdetails.wwapiendpoint + 'Clients';
        //Set header values
        options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
        options.headers.authorization = token;
        //Set body data
        options.body = require(path.join(__dirname, '..//..//..//data//defaultValues//postClients.json'));
        options.body.FirstName = options.body.FirstName + ClientAndPatientController.__timestamp;
        options.body.LastName = options.body.LastName + ClientAndPatientController.__timestamp;
        options.body.HospitalId = browser.appenvdetails.hospitalid;
        return options;
    }

    async createPatient(token : any) {
        let options = this.setCreatePatientOptions(token);
        browser.logger.info(options);
        let __apiServices = new CarePlannerApiServices();
        // Create patient 
        let __response = await __apiServices.makeApiCall(options).then((response) => {
            //return response;
             __apiServices.parseResultOfMakePostRequest(response).then((responseValue) => {
                    browser.patientID = responseValue;
                    browser.logger.info("PatientId: " + browser.patientID);
                   return responseValue;
                });
        });
        // parse response
        // let __patientResponse = __apiServices.parseResultOfMakePostRequest(__response).then((response) => {
        //     browser.patientID = response;
        //     browser.logger.info("PatientId: " + browser.patientID);
        //    return response;
        // });

      // browser.logger.info(__patientResponse);
      return __response;
    }

    setCreatePatientOptions(token: any){

        browser.logger.info("*********** Creating Patient ***********");
        let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postPatients.json'));
        //Set URL
        options.url = browser.appenvdetails.wwapiendpoint + 'Patients'

        //Set header values
        options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
        options.headers.authorization = token;

        //Define patient data

        //Set body data
        options.body = require(path.join(__dirname, '..//..//..//data//defaultValues//postPatients.json'));
        options.body.ClientId = browser.clientID;
        browser.patientName = options.body.PatientName + ClientAndPatientController.__timestamp;
        options.body.PatientName = browser.patientName;
        options.body.HospitalId = browser.appenvdetails.hospitalid;
        return options;
    }

    // createPatient() {
    //     browser.logger.info("*********** Creating Patient ***********");
    //     let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postPatients.json'));
    //     //var options = { "method": "POST", "url": "", "qs": { "ignoreDuplicateAddress": "true", "validateAddress": "false", "ignoreDuplicatePhone": "true" }, "headers": { "cache-control": "no-cache", "content-type": "application/json", "applicationname": "Retriever", "username": "PTM-WebApp-qa", "x-hospital-id": "153", "authorization": "" }, "body": { "ClientId": "", "HospitalId": 153, "PatientId": 0, "PatientName": "Lilly", "GenderId": 2, "SpeciesId": 1, "SpeciesName": "Canine", "DateOfBirth": "2015-06-16T00:00:00", "Breeds": [{ "BreedId": 156, "BreedName": "Rhodesian Ridgeback","Description": "Rhodesian Ridgeback", "SpeciesId": 1, "ZoasisBreed": "RHOD" }], "Appearances": [{ "AppearanceId": 163, "AppearanceName": "Black And Beige", "AppearanceTypeId": 1, "AppearanceValue": "Black And Beige", "IsActive": true }], "Weight": 3.5, "WeightUnit": "lb", "EnteredDate": "2017-10-30T00:00:00", "HasModifiedWeight": false, "Photo": null, "Neutered": "Neutered", "Sex": { "SexId": 1, "Name": "Male" }, "HasWellnessMembership": false, "DOBAgeAsEntered": "6/16/2015", "PetAge": "2y 4m", "IsPatientCareClubMember": false, "BreedNames": "Canaan Dog", "IsNewPatient": true, "Notes": "This dog will bite you ", "IsModified": null, "NumberOfActiveMemberships": 0, "EarliestMembershipStartDate": null, "HasPhoto": false, "EnteredWeight": "3.5 lb", "EnteredWeightUnitId": 3 }, "json": true };

    //     //Set URL
    //     options.url = browser.appenvdetails.wwapiendpoint + 'Patients'

    //     //Set header values
    //     options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
    //     options.headers.authorization = browser.bearerToken;

    //     //Define patient data

    //     //Set body data
    //     options.body = require(path.join(__dirname, '..//..//..//data//defaultValues//postPatients.json'));
    //     options.body.ClientId = browser.clientID;
    //     browser.patientName = options.body.PatientName + ClientAndPatientController.__timestamp;
    //     options.body.PatientName = browser.patientName;
    //     options.body.HospitalId = browser.appenvdetails.hospitalid;

    //     let apiServices = new CarePlannerApiServices();
    //     return apiServices.makePostRequest(options);
    // }

    // createClient() {
    //     browser.logger.info("*********** Creating Client ***********");
    //     let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postClients.json'));

    //     //Set URL
    //     options.url = browser.appenvdetails.wwapiendpoint + 'Clients';

    //     //Set header values
    //     options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
    //     options.headers.authorization = browser.bearerToken;

    //     //Set body data
    //     options.body = require(path.join(__dirname, '..//..//..//data//defaultValues//postClients.json'));
    //     options.body.FirstName = options.body.FirstName + ClientAndPatientController.__timestamp;
    //     options.body.LastName = options.body.LastName + ClientAndPatientController.__timestamp;
    //     options.body.HospitalId = browser.appenvdetails.hospitalid;
    //     //browser.logger.info(options);
    //     browser.logger.info("*********reate client options *********");
    //     browser.logger.info(options);
    //     let __apiServices = new CarePlannerApiServices();
    //     return __apiServices.makePostRequest(options);
    // }
}