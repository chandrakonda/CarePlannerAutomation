import { browser } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');
let __timestamp;



// FrameworkComponents

import { LogHelper } from '../../support/logHelper';
import { SpecFile,Client,Patient } from '../../support/globalDataModel';
import { TestBase } from '../../testbase/TestBase';

export class ClientAndPatientController {

    //private apiServices;
    //private options; 
    constructor() {
        LogHelper.Logger.info("*********** ClientAndPatientController ***********");
        //this.__timestamp = new Date().getTime();
        //this.apiServices = new CarePlannerApiServices();
        __timestamp = new Date().getMinutes();
    }



    async createClient(token: any, specData: SpecFile) {
        try {
            let __client = new Client();
            LogHelper.Logger.info("*********** Creating Client ***********");
            let __options = this.setCreateClientOptions(token, specData);
            LogHelper.Logger.info(__options);
            let __apiServices = new CarePlannerApiServices();
            // Create client 
            await __apiServices.makeApiCall(__options).then((response) => {
                // parse response
                __apiServices.parseResultOfMakePostRequest(response).then((responseValue) => {
                    //LogHelper.Logger.info(responseValue);
                    __client.LastName = responseValue.LastName;
                    __client.Id =  responseValue.ClientId
                    specData.Data.Client = __client;
                    LogHelper.Logger.info(specData.Data.Client);
                    specData.Data.Client.Id = responseValue.ClientId;
                    
                });
            });

            LogHelper.Logger.info("__clientResponse" + specData.Data.Client.LastName + "       " + specData.Data.Client.Id);
            } catch (e) {
                throw e;
            }
        }

    setCreateClientOptions(token: any, specData: SpecFile) {
            try {
                let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postClients.json'));
                //Set URL
                __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'Clients';
                //Set header values
                __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
                __options.headers.authorization = token;
                //Set body data
                __options.body = TestBase.GlobalData.ApiDefaultValues.PostClientsDefaultValues; //require(path.join(__dirname, '..//..//..//data//defaultValues//postClients.json'));
                __options.body.FirstName = __options.body.FirstName + __timestamp;
                __options.body.LastName = __options.body.LastName + __timestamp;
                //options.body.HospitalId = browser.appenvdetails.hospitalid;
                __options.body.HospitalId = TestBase.GlobalData.EnvironmentDetails.hospitalid;
                return __options;
            } catch (error) {
                LogHelper.Logger.error(error);
            }
        }

        async createPatient(token : any, specData: SpecFile) {
            try {
                let __patient = new Patient();
                let __options = this.setCreatePatientOptions(token, specData );
                LogHelper.Logger.info(__options);
                __patient.Name  = __options.body.PatientName;
                let __apiServices = new CarePlannerApiServices();
                // Create patient 
                await __apiServices.makeApiCall(__options).then((response) => {
                    //return response;
                    __apiServices.parseResultOfMakePostRequest(response).then((responseValue) => {
                        //browser.patientID = responseValue;
                        __patient.Id = responseValue;
                        specData.Data.Client.Patient = __patient;
                        LogHelper.Logger.info("PatientId: " + specData.Data.Client.Patient.Id);
                        return responseValue;
                    });
                });
                
            } catch (error) {
                LogHelper.Logger.error(error);
            }
        }

        setCreatePatientOptions(token: any, specData: SpecFile){
            try {

                LogHelper.Logger.info("*********** Creating Patient ***********");
                let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postPatients.json'));
                //Set URL
                __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint  + 'Patients'

                //Set header values
                __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
                __options.headers.authorization = token;

                //Set body data
                __options.body = TestBase.GlobalData.ApiDefaultValues.PostPatientsDefaultValues;//require(path.join(__dirname, '..//..//..//data//defaultValues//postPatients.json'));
                //__options.body.ClientId = browser.clientID;
                __options.body.ClientId = specData.Data.Client.Id;                
                //__options.body.PatientName = patientObj.Name ;
                __options.body.HospitalId =TestBase.GlobalData.EnvironmentDetails.hospitalid;
                return __options;
            } catch (error) {
                LogHelper.Logger.error(error);
            }
        }

        // createPatient() {
        //     LogHelper.Logger.info("*********** Creating Patient ***********");
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
        //     LogHelper.Logger.info("*********** Creating Client ***********");
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
        //     //LogHelper.Logger.info(options);
        //     LogHelper.Logger.info("*********reate client options *********");
        //     LogHelper.Logger.info(options);
        //     let __apiServices = new CarePlannerApiServices();
        //     return __apiServices.makePostRequest(options);
        // }
    }