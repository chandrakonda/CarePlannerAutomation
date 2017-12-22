import { browser } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');
import * as moment from 'moment';

// Framework components //////

import { LogHelper } from '../../support/logHelper';
import { TestBase } from '../../testbase/TestBase';

export class AppointmentController {

    constructor() {
        LogHelper.Logger.info("*********** AppointmentController ***********");
    }

    async createNewAppointment(token: any) {
        try {
            let options = this.createNewAppointmentOptions(token);

            LogHelper.Logger.info(options);
            let __apiServices = new CarePlannerApiServices();
            // Create client 
            await __apiServices.makeApiCall(options).then((response) => {
                  __apiServices.parseResultOfMakePostRequest(response).then((responseValue) => {
                    browser.appointmentID = responseValue.AppointmentId;
                    LogHelper.Logger.info("Appointment ID: " + browser.appointmentID);
                    LogHelper.Logger.info(responseValue);
                });
            })
            LogHelper.Logger.info("__appointmentresponse" + browser.appointmentID);
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    createNewAppointmentOptions(token: any) {
        try {
            LogHelper.Logger.info("*********** Create New Appointment ***********");
            // Load Template
            let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postBookAppointment.json'));
    
            var startTime = moment().subtract(6, 'hours').toISOString();
            var endtime = moment().subtract(4, 'hours').toISOString();
    
            //Set URL
            options.url = browser.appenvdetails.wwapiendpoint + 'Appointments';
    
            //Set header values
            options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
            options.headers.authorization = token;
    
            //Set body data using default values
            options.body = require(path.join(__dirname, '..//..//..//data//defaultValues//bookAppointment.json'));
            options.body.ClientId = browser.clientID;
            options.body.HospitalId = browser.appenvdetails.hospitalid;
            options.body.PetAppointments[0].PatientId = browser.patientID;
            options.body.PetAppointments[0].StartTime = startTime;
            options.body.PetAppointments[0].EndTime = endtime;
            return options;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    async checkinAppointment(token: any) {
        try {
            let options = await this.checkinAppointmentOptions(token);
            LogHelper.Logger.info(options);
            let __apiServices = new CarePlannerApiServices();
            // Create client 
            let __response = await __apiServices.makeApiCall(options).then((response) => {
                return response;
            })

            // parse response
            let __checkinAppointment = await __apiServices.parseResultOfMakePostRequest(__response).then((response) => {
                return response;
            });

            LogHelper.Logger.info("__checkinAppointment" + __checkinAppointment);
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    checkinAppointmentOptions(token: any) {
        try {
            LogHelper.Logger.info("*********** Check In Appointment ***********");
            // Load Template
            let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//postCheckInAppointment.json'));
    
            //Set URL
            options.url = browser.appenvdetails.wwapiendpoint + 'CheckInAppointment';
    
            //Set qs values
            options.qs.appointmentId = browser.appointmentID.toString();
            options.qs.isMergeMedicalNote = "false";
    
            //Set header values
            options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid.toString();
            options.headers.authorization = token;
    
            LogHelper.Logger.info("Options: " + options.qs.appointmentId);
            //LogHelper.Logger.info(options);
    
            return options;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    async getCheckedInPatientDetail(token: any) {
        try {
            let __options = await this.getCheckedInPatientDetailsOptions(token);
            LogHelper.Logger.info(__options);
            let __apiServices = new CarePlannerApiServices();
            // Create client 
            let __response = await __apiServices.makeApiCall(__options).then((response) => {
                return response;
            })

            // parse response
            let __result = await __apiServices.parseResultOfMakePostRequest(__response).then((response) => {
                browser.visitId = response[0].VisitId;
                LogHelper.Logger.info("Visit Id is :" + browser.visitId);
                return response;
            });
        } catch (e) {
            throw e;
        }

    }

    getCheckedInPatientDetailsOptions(token: any) {
        try {
            LogHelper.Logger.info('*********** Getting visit details ***********');
            
            // Load Template
            let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getCheckedInPatientDetails.json'));
    
            //Set URL
            options.url = browser.appenvdetails.wwapiendpoint + 'CheckedInPatients';
    
            //Set qs values
            options.qs.patientId = browser.patientID.toString();
            options.qs.IncludeOrderItemList = 'true';
    
            //Set header values
            options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid.toString();
            options.headers.authorization = token;
            //LogHelper.Logger.info(options);
            return options;
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
    //     options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid.toString();
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
    //     options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid.toString();
    //     options.headers.authorization = browser.bearerToken;
    //     //LogHelper.Logger.info(options);

    //     let apiServices = new CarePlannerApiServices();
    //     return apiServices.makePostRequest(options);
    // }
