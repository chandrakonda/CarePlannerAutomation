import { browser } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');
import * as moment from 'moment';

export class AppointmentController {

    constructor() {
        browser.logger.info("*********** AppointmentController ***********");
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async createNewAppointment(token: any) {
        try {
            let options = this.createNewAppointmentOptions(token);

            browser.logger.info(options);
            let __apiServices = new CarePlannerApiServices();
            // Create client 
            await __apiServices.makeApiCall(options).then((response) => {
                  __apiServices.parseResultOfMakePostRequest(response).then((responseValue) => {
                    browser.appointmentID = responseValue.AppointmentId;
                    browser.logger.info("Appointment ID: " + browser.appointmentID);
                    browser.logger.info(responseValue);
                });
            })

            // parse response
            // let __appointmentResponse = await __apiServices.parseResultOfMakePostRequest(__response).then((response) => {
            //     browser.appointmentID = response.AppointmentId;
            //     browser.logger.info("Appointment ID: " + browser.appointmentID);
            //     browser.logger.info(response);
            // });

            browser.logger.info("__appointmentresponse" + browser.appointmentID);
        } catch (e) {
            throw e;
        }

    }

    createNewAppointmentOptions(token: any) {

        browser.logger.info("*********** Create New Appointment ***********");
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

    }

    async checkinAppointment1(token: any) {
        try {
            let options = await this.checkinAppointmentOptions(token);
            browser.logger.info(options);
            let __apiServices = new CarePlannerApiServices();
            // Create client 
            let __response = await __apiServices.makeApiCall(options).then((response) => {
                return response;
            })

            // parse response
            let __checkinAppointment = await __apiServices.parseResultOfMakePostRequest(__response).then((response) => {
                return response;
            });

            browser.logger.info("__checkinAppointment" + __checkinAppointment);
        } catch (e) {
            throw e;
        }


    }

    checkinAppointmentOptions(token: any) {

        browser.logger.info("*********** Check In Appointment ***********");
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

        browser.logger.info("Options: " + options.qs.appointmentId);
        //browser.logger.info(options);

        return options;

    }

    async getCheckedInPatientDetail1(token: any) {
        try {
            let __options = await this.getCheckedInPatientDetailsOptions(token);
            browser.logger.info(__options);
            let __apiServices = new CarePlannerApiServices();
            // Create client 
            let __response = await __apiServices.makeApiCall(__options).then((response) => {
                return response;
            })

            // parse response
            let __result = await __apiServices.parseResultOfMakePostRequest(__response).then((response) => {
                browser.visitId = response[0].VisitId;
                browser.logger.info("Visit Id is :" + browser.visitId);
                return response;
            });

           // browser.logger.info("getcheckedinpatientdetails" + __result);
        } catch (e) {
            throw e;
        }

    }

    getCheckedInPatientDetailsOptions(token: any) {

        browser.logger.info('*********** Getting visit details ***********');

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
        //browser.logger.info(options);
        return options;
    }

}


    // createNewAppointment() {
    //     browser.logger.info("*********** Create New Appointment ***********");
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
    //     browser.logger.info("*********** Check In Appointment ***********");
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

    //     browser.logger.info("Options: " + options.qs.appointmentId);
    //     //browser.logger.info(options);

    //     let apiServices = new CarePlannerApiServices();
    //     return apiServices.makePostRequest(options);
    // }

    // getCheckedInPatientDetails() {
    //     browser.logger.info('*********** Getting visit details ***********');

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
    //     //browser.logger.info(options);

    //     let apiServices = new CarePlannerApiServices();
    //     return apiServices.makePostRequest(options);
    // }
