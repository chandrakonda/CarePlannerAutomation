import { browser } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');
import * as moment from 'moment';

export class AppointmentController{

    constructor(){}

    createNewAppointment(){
        console.log("\n*********** Create New Appointment ***********");
        let options = require(path.join(__dirname, '..//..//..//data//jsonObjects//createNewAppointment.json'));
    
        var startTime = moment().subtract(6,'hours').toISOString();
        var endtime = moment().subtract(4,'hours').toISOString();
    
        //Set URL
        options.url = browser.appenvdetails.runtimeenvironment.wwapiendpoint + 'Appointments';
    
        //Set header values
        options.headers['x-hospital-id']=browser.appenvdetails.runtimeenvironment.hospitalId;
        options.headers.authorization = browser.bearerToken;
    
        //Set body data
        options.body.ClientId = browser.clientID;
        options.body.HospitalId = browser.appenvdetails.runtimeenvironment.hospitalId;
        options.body.PetAppointments[0].PatientId = browser.patientID;
        options.body.PetAppointments[0].StartTime = startTime;
        options.body.PetAppointments[0].EndTime = endtime;
    
        let apiServices = new CarePlannerApiServices();
        return apiServices.postRequest(options);
    }

    checkInAppointment(){
        console.log("\n*********** Check In Appointment ***********");
        let options = require(path.join(__dirname, '..//..//..//data//jsonObjects//checkInAppointment.json'));
    
        //Set URL
        options.url = browser.appenvdetails.runtimeenvironment.wwapiendpoint + 'CheckInAppointment';
    
        //Set qs values
        options.qs.appointmentId = browser.appointmentID.toString();
        options.qs.isMergeMedicalNote = "false";
    
        //Set header values
        options.headers['x-hospital-id']=browser.appenvdetails.runtimeenvironment.hospitalId.toString();
        options.headers.authorization = browser.bearerToken;
    
        console.log("Options: " + options.qs.appointmentId);
        
        let apiServices = new CarePlannerApiServices();
        return apiServices.postRequest(options);
    }

    checkedInPatientDetails(){
        console.log('\n*********** Getting visit details ***********');
        let options = require(path.join(__dirname, '..//..//..//data//jsonObjects//checkedInPatientDetails.json'));
    
        //Set URL
        options.url = browser.appenvdetails.runtimeenvironment.wwapiendpoint + 'CheckedInPatients';
        
        //Set qs values
        options.qs.patientId = browser.patientID.toString();
        options.qs.IncludeOrderItemList = 'true';
    
        //Set header values
        options.headers['x-hospital-id']=browser.appenvdetails.runtimeenvironment.hospitalId.toString();
        options.headers.authorization = browser.bearerToken;
    
        let apiServices = new CarePlannerApiServices();
        return apiServices.postRequest(options);  
    }

}