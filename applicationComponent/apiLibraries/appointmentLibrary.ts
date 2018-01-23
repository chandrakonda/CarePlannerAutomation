import { FrameworkComponent } from '../../frameworkComponent';
import { TestBase, SpecFile, Visit } from '../../applicationComponent';
import { DataReader } from '../../dataComponent/dataReaderHelper';

const path = require('path');
import * as moment from 'moment';

export class AppointmentLibrary {

    constructor() {
        FrameworkComponent.logHelper.info("*********** AppointmentController ***********");
    }

    async createNewAppointment(specData:SpecFile) {
        try {
            FrameworkComponent.logHelper.info("*********** Creating New Appointment ***********");
            let options = this.createNewAppointmentOptions(specData);

            FrameworkComponent.logHelper.info(options);
            
            // Create client 
            await FrameworkComponent.apiServiceHelper.makeApiCall(options).then((response) => {
                FrameworkComponent.apiServiceHelper.parseResultOfMakePostRequest(response).then((responseValue) => {
                    specData.Data.AppointmentId = responseValue.AppointmentId;
                    FrameworkComponent.logHelper.info("Appointment ID: " + specData.Data.AppointmentId);
                    FrameworkComponent.logHelper.info(responseValue);
                });
            })
            FrameworkComponent.logHelper.info("__appointmentresponse" + specData.Data.AppointmentId);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    createNewAppointmentOptions(specData:SpecFile) {
        try {
            FrameworkComponent.logHelper.info("*********** Create New Appointment ***********");
            // Load Template
           // let __options = require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/postBookAppointment.json'));
           // load API Templates
            let __options = DataReader.loadAPITemplates("postBookAppointment");//require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/postBookAppointment.json'));
    
            var startTime = moment().subtract(6, 'hours').toISOString();
            var endtime = moment().subtract(4, 'hours').toISOString();
    
            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'Appointments';
    
            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;
    
            //Set body data using default values
            __options.body = TestBase.GlobalData.ApiDefaultValues.BookAppointmentValues; // require(path.join(__dirname, '..//..//..//data//defaultValues//bookAppointment.json'));
            __options.body.ClientId = specData.Data.Client.Id;
            __options.body.HospitalId = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.body.PetAppointments[0].PatientId = specData.Data.Client.Patient.Id;
            __options.body.PetAppointments[0].StartTime = startTime;
            __options.body.PetAppointments[0].EndTime = endtime;
            return __options;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async checkinAppointment(specData:SpecFile) {
        try {
            FrameworkComponent.logHelper.info("*********** CheckIn the Appointment created for Client ***********");
            let __options = await this.checkinAppointmentOptions(specData);
            FrameworkComponent.logHelper.info(__options);
            
            // Create client 
            let __response = await FrameworkComponent.apiServiceHelper.makeApiCall(__options).then((response) => {
                return response;
            });

            // parse response
            let __checkinAppointment = await FrameworkComponent.apiServiceHelper.parseResultOfMakePostRequest(__response).then((response) => {
                return response;
            });

            FrameworkComponent.logHelper.info("__checkinAppointment " + __checkinAppointment);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    checkinAppointmentOptions(specData:SpecFile) {
        try {
            FrameworkComponent.logHelper.info("*********** Check In Appointment ***********");
            // Load Template
            let __options = DataReader.loadAPITemplates("postCheckInAppointment"); //require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/postCheckInAppointment.json'));
    
            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'CheckInAppointment';
    
            //Set qs values
            __options.qs.appointmentId = specData.Data.AppointmentId.toString();
            __options.qs.isMergeMedicalNote = "false";
    
            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid.toString();
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;
    
            FrameworkComponent.logHelper.info("Options: " + __options.qs.appointmentId);
            //browser.logger.info(options);
    
            return __options;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getCheckedInPatientDetail(specData:SpecFile) {
        try {
            FrameworkComponent.logHelper.info("*********** Getting Checked-In Patient Details ***********");
            let __options = await this.getCheckedInPatientDetailsOptions(specData);
            FrameworkComponent.logHelper.info(__options);
            
            // Create client 
            let __response = await FrameworkComponent.apiServiceHelper.makeApiCall(__options).then((response) => {
                return response;
            });
            
            let __visit = new Visit();

            // parse response
            let __result = await FrameworkComponent.apiServiceHelper.parseResultOfMakePostRequest(__response).then((response) => {
                __visit = response[0];
                specData.Data.VisitId = __visit.VisitId;
                specData.Data.Client.Patient.Visit = __visit;
                FrameworkComponent.logHelper.info("Visit Id is :" + specData.Data.VisitId);
                return response;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }

    }

    getCheckedInPatientDetailsOptions(specData:SpecFile) {
        try {
            FrameworkComponent.logHelper.info('*********** Getting visit details ***********');
            
            // Load Template
            let __options = DataReader.loadAPITemplates("getCheckedInPatientDetails"); // require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/getCheckedInPatientDetails.json'));
    
            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'CheckedInPatients';
    
            //Set qs values
            __options.qs.patientId = specData.Data.Client.Patient.Id.toString();
            __options.qs.IncludeOrderItemList = 'true';
    
            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid.toString();
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;
            //browser.logger.info(options);
            return __options;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }       
    }

}



