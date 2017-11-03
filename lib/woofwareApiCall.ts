import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import * as console from 'console';
var request = require('request');
var flow = protractor.promise.controlFlow();


export class WWApiCalls {
  constructor( ){}
  
  makeRequest(options) {
    // console.log("******************Making api request******************");
    var defer = protractor.promise.defer();
    request(options, function(error, response, body) {
      var queryResult : any[];
      if (error || body.statusCode >= 400) {
        defer.reject({ error: error, message: body });
      } else {
        defer.fulfill(body.Data);
      }
    });
    return defer.promise;
  }

  makeAuthRequest(options){
    // console.log("******************Making Authorization request******************");
    var defer = protractor.promise.defer();
    request(options, function(error, response, body) {
      if (error || body.statusCode >= 400) {
        defer.reject({ error: error, message: body });        
      } else {          
        defer.fulfill(JSON.parse(body).access_token);
      }
    });
    return defer.promise;
  }
  
  getAuthToken(){
    console.log("******************getting auth token******************");    
    var options = { method: "POST", url: "", 
                    headers: {"cache-control": "no-cache", 
                    authorization: "Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=", 
                    "content-type": "application/x-www-form-urlencoded" }, 
                    form: { grant_type: "client_credentials" } };
    //Set auth token URL
    if (browser.jsonconfig.environment == "QA"){
      options.url=browser.jsonconfig.authorizationURL;
    }
    else if (browser.jsonconfig.environment == "Staging") {
      options.url=browser.jsonconfig.authorizationURL;
    }
    var api = new WWApiCalls();
    return  api.makeAuthRequest(options);
  }

  createClient() {
    console.log("******************creating client******************");
    var options = {"method":"POST","url":"","qs":{"ignoreDuplicateAddress":"true","validateAddress":"false","ignoreDuplicatePhone":"true"},"headers":{"cache-control":"no-cache","content-type":"application/json","applicationname":"Retriever","username":"PTM-WebApp-qa","x-hospital-id":"153","authorization":browser.bearerToken},"body":{"ClientId":0,"HospitalId":153,"FirstName":"Steve_1491610122703","LastName":"Rogers_1491610122703","IsCorporateClient":false,"StatusId":1,"ClientPhones":[{"PhoneId":0,"PhoneLabel":"Home","ClientId":0,"PhoneNumber":"8052343967","IsPrimaryContact":true,"HospitalId":153,"PhoneTypeId":1,"OptInStatusId":1,"OptInStatusChangedDate":"2017-04-08T00:08:42.703Z","IsMobileNumber":true}]},"json":true};

    //Set URL
    options.url=browser.jsonconfig.WWApiEndpoint+'Clients';

    //Set qs values
    options.qs.ignoreDuplicateAddress="true";
    options.qs.validateAddress="false";
    options.qs.ignoreDuplicatePhone="true";
    
    //Set header values
    // options.headers.'x-hospital-id'=browser.jsonconfig.hospitalId;
    options.headers.authorization=browser.bearerToken;

    //Set body data
    var timestamp = new Date().getTime();
    browser.timestamp=timestamp;
    var fname = "Steve_"+browser.timestamp;
    var lname = "Rogers_"+browser.timestamp;
    options.body.FirstName=fname;
    options.body.LastName=lname;
    options.body.HospitalId=browser.jsonconfig.hospitalId;

    // console.log("Options: " + options.headers.authorization);
    var api = new WWApiCalls();
    return  api.makeRequest(options);
  }

  createPatient(){
    console.log("******************creating patient******************");
    var options = {"method":"POST","url":"","qs":{"ignoreDuplicateAddress":"true","validateAddress":"false","ignoreDuplicatePhone":"true"},"headers":{"cache-control":"no-cache","content-type":"application/json","applicationname":"Retriever","username":"PTM-WebApp-qa","x-hospital-id":"153","authorization":""},"body":{"ClientId":"","HospitalId":153,"PatientId":0,"PatientName":"Lilly","GenderId":2,"SpeciesId":1,"SpeciesName":"Canine","DateOfBirth":"2015-06-16T00:00:00","Breeds":[{"BreedId":10,"BreedName":"Canaan Dog","BreedRank":1,"Description":"Canaan Dog","GeriatricAge":null,"SpeciesId":1,"ZoasisBreed":"CANA"}],"Appearances":[{"AppearanceId":163,"AppearanceName":"Black And Beige","AppearanceTypeId":1,"AppearanceValue":"Black And Beige","IsActive":true}],"Weight":3.5,"WeightUnit":"lb","EnteredDate":"2017-10-30T00:00:00","HasModifiedWeight":false,"Photo":null,"Neutered":"Neutered","Sex":{"SexId":1,"Name":"Male"},"HasWellnessMembership":false,"DOBAgeAsEntered":"6/16/2015","PetAge":"2y 4m","IsPatientCareClubMember":false,"BreedNames":"Canaan Dog","IsNewPatient":true,"Notes":"This dog will bite you ","IsModified":null,"NumberOfActiveMemberships":0,"EarliestMembershipStartDate":null,"HasPhoto":false,"EnteredWeight":"3.5 lb","EnteredWeightUnitId":3},"json":true};

    //Set URL
    options.url=browser.jsonconfig.WWApiEndpoint+'Patients'

    //Set qs values
    options.qs.ignoreDuplicateAddress="true";
    options.qs.validateAddress="false";
    options.qs.ignoreDuplicatePhone="true";

    //Set header values
    // options.headers.'x-hospital-id'=browser.jsonconfig.hospitalId;
    options.headers.authorization=browser.bearerToken;
    
    //Set body data
    options.body.ClientId=browser.clientID;
    options.body.PatientName="Lilly_"+browser.timestamp;
    options.body.HospitalId=browser.jsonconfig.hospitalId;

    // console.log("Options: " + options.headers.authorization);
    var api = new WWApiCalls();
    return  api.makeRequest(options);
  }

  createNewAppointment(){
    console.log("**********Create New Appointment**********");
    var options = { method: 'POST',
    url: 'https://hcorpqa-ns02.vcaantech.com:443/WoofwareWebAPI/API/Appointments',
    headers: 
     { 'cache-control': 'no-cache',
       applicationname: 'Retriever',
       username: 'vcaantech\\tablet_nonprod',
       'x-hospital-id': '153',
       authorization: "",
       'content-type': 'application/json',
       accept: 'application/json, text/json, application/xml, text/xml' },
    body: 
     { AppointmentId: 0,
       HospitalId: 153,
       AppointmentTypeId: 1,
       ClientId: 304006080,
       StatusId: 9,
       IsDraftAppointment: false,
       IsWalkInAppointment: true,
       PetAppointments: 
        [ { PetAppointmentId: 0,
            PatientId: 314760073,
            StatusId: 14,
            StartTime: '2017-11-02T17:03:05.424Z',
            EndTime: '2017-11-2T23:59:00.00Z',
            AppointmentTypeId: 1,
            HospitalId: 153,
            ProviderTypeId: 100,
            DepartmentAppointmentTypeId: 201,
            ReasonIds: '9',
            Resource: { UserId: 232800233, ResourceId: 233000253 } } ] },
    json: true }
    
    // var timeUTC = new Date();
    // var diffInMinBetweenUTCandLocal = timeUTC.getTimezoneOffset();
    
    // var datetime = timeUTC.addMinutes(-diffInMinBetweenUTCandLocal)
    // var startTime =datetime.addHours(1).toISOString();
    
    // var currentYear = datetime.getFullYear()
    // var currentMonth = datetime.getMonth()+1
    // var currentDate = datetime.getDate()
    
    // console.log(datetime.getFullYear() + "-" + datetime.getMonth()+1 + "-" + datetime.getDate() + "-" + "T23:59:00.000Z")
    
    // var endTime=currentYear + "-" + currentMonth + "-" + currentDate + "T23:59:00.00Z";

    //Set URL
    options.url=browser.jsonconfig.WWApiEndpoint+'Appointments';

    //Set header values
    // options.headers.'x-hospital-id'=browser.jsonconfig.hospitalId;
    options.headers.authorization=browser.bearerToken;

    //Set body data
    options.body.ClientId=browser.clientID;
    options.body.HospitalId=browser.jsonconfig.hospitalId;
    options.body.PetAppointments[0].PatientId=browser.patientID;
    
    console.log("Options: " + options.body.PetAppointments[0].PatientId);
    var api = new WWApiCalls();
    return  api.makeRequest(options);
  }

  checkInAppointment(){
    console.log("**********Check In Appointment**********");
    var options = {"method":"POST","url":"https://hcorpqa-ns02.vcaantech.com:443/WoofwareWebAPI/API/CheckInAppointment","qs":{"appointmentId":"307204433","isMergeMedicalNote":"false"},"headers":{"postman-token":"94ae967e-dd58-c83c-9f70-dbfd1320d172","cache-control":"no-cache","applicationname":"Retriever","username":"vcaantech\\tablet_nonprod","x-hospital-id":"153","authorization":"","accept":"application/json, text/json, application/xml, text/xml"}};

    //Set URL
    options.url=browser.jsonconfig.WWApiEndpoint+'CheckInAppointment';

    //Set qs values
    options.qs.appointmentId=browser.appointmentID;
    options.qs.isMergeMedicalNote="false";

    //Set header values
    // options.headers.'x-hospital-id'=browser.jsonconfig.hospitalId;
    options.headers.authorization=browser.bearerToken;    
    
    // console.log("Options: " + options.headers.authorization);
    var api = new WWApiCalls();
    return  api.makeRequest(options);    
  }
}