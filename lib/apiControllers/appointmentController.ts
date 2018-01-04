import { browser } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');
import * as moment from 'moment';

// Framework components //////

import { LogHelper } from '../../support/logHelper';
import { SpecFile, Visit } from '../../support/globalDataModel';
import { TestBase } from '../../testbase/TestBase';

export class AppointmentController {

    constructor() {
        LogHelper.Logger.info("*********** AppointmentController ***********");
    }

    async createNewAppointment(token: any, specData: SpecFile) {
        try {
            let options = this.createNewAppointmentOptions(token, specData);

            LogHelper.Logger.info(options);
            let __apiServices = new CarePlannerApiServices();
            // Create client 
            await __apiServices.makeApiCall(options).then((response) => {
                __apiServices.parseResultOfMakePostRequest(response).then((responseValue) => {

                    specData.Data.Client.Patient.AppointmentId = responseValue.AppointmentId;
                    //specData.Data.Client.Patient.Visit
                    //LogHelper.Logger.info("Appointment ID: " + browser.appointmentID);
                    LogHelper.Logger.info("Appointment ID: " + specData.Data.Client.Patient.AppointmentId);
                    LogHelper.Logger.info(responseValue);
                });
            })
            LogHelper.Logger.info("__appointmentresponse" + specData.Data.Client.Patient.AppointmentId);
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    // we need patient id here, appointment will be created for a patient. 
    createNewAppointmentOptions(token: any, specData: SpecFile) {
        try {
            LogHelper.Logger.info("*********** Create New Appointment ***********");
            // Load Template
            let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postBookAppointment.json'));

            var startTime = moment().subtract(6, 'hours').toISOString();
            var endtime = moment().subtract(4, 'hours').toISOString();

            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'Appointments';

            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = token;

            //Set body data using default values
            __options.body = require(path.join(__dirname, '..//..//..//data//defaultValues//bookAppointment.json'));
            __options.body.ClientId = specData.Data.Client.Id;
            __options.body.HospitalId = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.body.PetAppointments[0].PatientId = specData.Data.Client.Patient.Id;
            __options.body.PetAppointments[0].StartTime = startTime;
            __options.body.PetAppointments[0].EndTime = endtime;
            return __options;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    async checkinAppointment(token: any, specData: SpecFile) {
        try {
            let __options = await this.checkinAppointmentOptions(token, specData);
            LogHelper.Logger.info(__options);
            const __apiServices = new CarePlannerApiServices();
            // Create client 
            let __response = await __apiServices.makeApiCall(__options).then((response) => {
                __apiServices.parseResultOfMakePostRequest(response).then((responseValue) => {
                    return responseValue;
                });
            });

            LogHelper.Logger.info("__checkinAppointment" + __response);
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    checkinAppointmentOptions(token: any, specData: SpecFile) {
        try {
            LogHelper.Logger.info("*********** Check In Appointment ***********");
            // Load Template
            let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postCheckInAppointment.json'));

            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'CheckInAppointment';

            //Set qs values
            //__options.qs.appointmentId = browser.appointmentID.toString();
            __options.qs.appointmentId = specData.Data.Client.Patient.AppointmentId;
            __options.qs.isMergeMedicalNote = "false";

            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = token;

            LogHelper.Logger.info("Options: " + __options.qs.appointmentId);
            //LogHelper.Logger.info(__options);

            return __options;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    async getCheckedInPatientDetail(token: any, specData: SpecFile) {
        try {
            let __visit = new Visit();
            let __options = await this.getCheckedInPatientDetailsOptions(token, specData);
            LogHelper.Logger.info(__options);
            let __apiServices = new CarePlannerApiServices();
            // Create client 
            await __apiServices.makeApiCall(__options).then((response) => {
                // parse response
                __apiServices.parseResultOfMakePostRequest(response).then((responseData) => {

                    __visit.VisitId = responseData[0].VisitId;
                    LogHelper.Logger.info("Visit Id is :" + __visit.VisitId);
                });
            });
            specData.Data.Client.Patient.Visit = __visit;
        } catch (e) {
            throw e;
        }

    }


    getCheckedInPatientDetailsOptions(token: any, specData: SpecFile) {
        try {
            LogHelper.Logger.info('*********** Getting visit details ***********');

            // Load Template
            let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getCheckedInPatientDetails.json'));

            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'CheckedInPatients';

            //Set qs values
            __options.qs.patientId = specData.Data.Client.Patient.Id; //browser.patientID.toString();
            __options.qs.IncludeOrderItemList = 'true';

            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = token;
            //LogHelper.Logger.info(__options);
            return __options;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

}


    // createNewAppointment() {
    //     LogHelper.Logger.info("*********** Create New Appointment ***********");
    //     // Load Template
    //     let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postBookAppointment.json'));

    //     var startTime = moment().subtract(6, 'hours').toISOString();
    //     var endtime = moment().subtract(4, 'hours').toISOString();

    //     //Set URL
    //     options.url = browser.appenvdetails.wwapiendpoint + 'Appointments';

    //     //Set header values
    //     options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
    //     options.headers.authorization = browser.bearerToken;

    //     //Set body data using default values
    //     options.body = require(path.join(__dirname, '..//..//..//data//defaultValues//bookAppointment.json'));
    //     options.body.ClientId = browser.clientID;
    //     options.body.HospitalId = browser.appenvdetails.hospitalid;
    //     options.body.PetAppointments[0].PatientId = browser.patientID;
    //     options.body.PetAppointments[0].StartTime = startTime;
    //     options.body.PetAppointments[0].EndTime = endtime;

    //     let apiServices = new CarePlannerApiServices();
    //     return apiServices.makePostRequest(options);
    // }




    // checkInAppointment() {
    //     LogHelper.Logger.info("*********** Check In Appointment ***********");
    //     // Load Template
    //     let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postCheckInAppointment.json'));

    //     //Set URL
    //     options.url = browser.appenvdetails.wwapiendpoint + 'CheckInAppointment';

    //     //Set qs values
    //     options.qs.appointmentId = browser.appointmentID.toString();
    //     options.qs.isMergeMedicalNote = "false";

    //     //Set header values
    //     options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
    //     options.headers.authorization = browser.bearerToken;

    //     LogHelper.Logger.info("Options: " + options.qs.appointmentId);
    //     //LogHelper.Logger.info(options);

    //     let apiServices = new CarePlannerApiServices();
    //     return apiServices.makePostRequest(options);
    // }

    // getCheckedInPatientDetails() {
    //     LogHelper.Logger.info('*********** Getting visit details ***********');

    //     // Load Template
    //     let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getCheckedInPatientDetails.json'));

    //     //Set URL
    //     options.url = browser.appenvdetails.wwapiendpoint + 'CheckedInPatients';

    //     //Set qs values
    //     options.qs.patientId = browser.patientID.toString();
    //     options.qs.IncludeOrderItemList = 'true';

    //     //Set header values
    //     options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
    //     options.headers.authorization = browser.bearerToken;
    //     //LogHelper.Logger.info(options);

    //     let apiServices = new CarePlannerApiServices();
    //     return apiServices.makePostRequest(options);
    // }
