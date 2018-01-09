import { Helper, LogHelper } from '../../../frameworkComponent';
import { TestBase, SpecFile,Client,Patient } from '../../../applicationComponent';

const path = require('path');
let __timestamp;

export class ClientAndPatientLibrary {

    constructor() {
        LogHelper.Logger.info("*********** ClientAndPatientController ***********");
        __timestamp = new Date().getMinutes();
    }
    
    async createClient(specData: SpecFile) {
        try {
            let __client = new Client();
            LogHelper.Logger.info("*********** Creating Client ***********");
            let __options = this.setCreateClientOptions(specData);
            LogHelper.Logger.info(__options);
            
            // Create client 
            await Helper.apiServiceHelper.makeApiCall(__options).then((response) => {
                // parse response
                Helper.apiServiceHelper.parseResultOfMakePostRequest(response).then((responseValue) => {
                    //LogHelper.Logger.info(responseValue);
                    __client.LastName = responseValue.LastName;
                    __client.Id =  responseValue.ClientId
                    specData.Data.Client = __client;
                    LogHelper.Logger.info(specData.Data.Client);
                    specData.Data.Client.Id = responseValue.ClientId;                    
                });
            });

            LogHelper.Logger.info("__clientResponse" + specData.Data.Client.LastName + "       " + specData.Data.Client.Id);
        } catch (error) {
            LogHelper.Logger.error(error);
            throw error;
        }
    }
    

    setCreateClientOptions(specData: SpecFile) {
        try {
            let __options = require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/postClients.json'));
            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'Clients';
            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;
            //Set body data
            __options.body = TestBase.GlobalData.ApiDefaultValues.PostClientsDefaultValues; //require(path.join(__dirname, '..//..//..//data//defaultValues//postClients.json'));
            __options.body.FirstName = __options.body.FirstName + __timestamp;
            __options.body.LastName = __options.body.LastName + __timestamp;
            //options.body.HospitalId = browser.appenvdetails.hospitalid;
            __options.body.HospitalId = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            return __options;
        } catch (error) {
            LogHelper.Logger.error(error);
            throw error;
        }
    }

    async createPatient(specData: SpecFile) {
        try {
            let __patient = new Patient();
            LogHelper.Logger.info("*********** Creating Patient ***********");
            let __options = this.setCreatePatientOptions(specData );
            LogHelper.Logger.info(__options);
            __patient.Name  = __options.body.PatientName;
            
            // Create patient 
            await Helper.apiServiceHelper.makeApiCall(__options).then((response) => {
                //return response;
                Helper.apiServiceHelper.parseResultOfMakePostRequest(response).then((responseValue) => {
                    //browser.patientID = responseValue;
                    __patient.Id = responseValue;
                    specData.Data.Client.Patient = __patient;
                    LogHelper.Logger.info("PatientId: " + specData.Data.Client.Patient.Id);
                    return responseValue;
                });
            });
            
        } catch (error) {
            LogHelper.Logger.error(error);
            throw error;
        }
    }

    setCreatePatientOptions(specData: SpecFile){
        try {

            LogHelper.Logger.info("*********** Creating Patient ***********");
            let __options = require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/postPatients.json'));
            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint  + 'Patients'

            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;

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
}
