import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import * as console from 'console';
import * as moment from 'moment';
var request = require('request');


export class WWApiCalls {

  constructor() {
  }

  makeRequest(options) {
    // console.log("******************Making api request******************");
    var defer = protractor.promise.defer();
    request(options, function (error, response, body) {
      // var queryResult: any[];
      if (error || body.statusCode >= 400) {
        defer.reject({ error: error, message: body });
      } else {
        console.log('response body: '+body);
        console.log('response body.Data: '+body.Data);
        // console.log('As JSON: ',JSON.parse(body));
        defer.fulfill(body.Data);
      }
    });
    return defer.promise;
  }

  makeAuthRequest(options) {
    // console.log("******************Making Authorization request******************");
    var defer = protractor.promise.defer();
    request(options, function (error, response, body) {
      if (error || body.statusCode >= 400) {
        defer.reject({ error: error, message: body });
      } else {
        // console.log(body);
        defer.fulfill(JSON.parse(body).access_token);
      }
    });
    return defer.promise;
  }

  makeOAuthRequest(options){
    // console.log("******************Making Authorization request******************");
    var defer = protractor.promise.defer();
    request(options, function (error, response, body) {
      if (error || body.statusCode >= 400) {
        defer.reject({ error: error, message: body });
      } else {
        console.log(body);
        defer.fulfill(body);
        // defer.fulfill(body);
      }
    });
    return defer.promise;
  }

  getAuthToken() {
    console.log("\n*********** getting auth token ***********");
    var options = {
      method: "POST", url:"",
      headers: {
        "cache-control": "no-cache",
        authorization: "Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=",
        "content-type": "application/x-www-form-urlencoded"
      },
      form: { grant_type: "client_credentials" }
    };
    // Set auth URL when we set options 
    options.url = browser.appenvdetails.runtimeenvironment.authorizationurl;

    var api = new WWApiCalls();
    return api.makeAuthRequest(options);
  }

  getOAuthToken() {
    console.log("******************getting auth token******************");
    var request = require("request");
    var options = { method: 'POST',
    url: 'https://apptsqa.vcahospitals.com:8443/OAuthTokenHelper/home/getToken',
    headers: 
     { 'postman-token': '73c23583-eb25-63f3-e4ae-d86f48f0f172',
       'cache-control': 'no-cache',
       authorization: 'Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=',
       'content-type': 'application/x-www-form-urlencoded' },
    form: {} };

    // Set auth URL when we set options 
    // options.url = browser.appenvdetails.runtimeenvironment.authorizationurl;

    var api = new WWApiCalls();
    return api.makeOAuthRequest(options);
  }  

  createClient() {
    console.log("\n*********** creating client ***********");
    var options = { "method": "POST", "url": "", "qs": { "ignoreDuplicateAddress": "true", "validateAddress": "false", "ignoreDuplicatePhone": "true" }, "headers": { "cache-control": "no-cache", "content-type": "application/json", "applicationname": "Retriever", "username": "PTM-WebApp-qa", "x-hospital-id": "153", "authorization": browser.bearerToken }, "body": { "ClientId": 0, "HospitalId": 153, "FirstName": "Steve_1491610122703", "LastName": "Rogers_1491610122703", "IsCorporateClient": false, "StatusId": 1, "ClientPhones": [{ "PhoneId": 0, "PhoneLabel": "Home", "ClientId": 0, "PhoneNumber": "8052343967", "IsPrimaryContact": true, "HospitalId": 153, "PhoneTypeId": 1, "OptInStatusId": 1, "OptInStatusChangedDate": "2017-04-08T00:08:42.703Z", "IsMobileNumber": true }] }, "json": true };

    //Set URL
    options.url = browser.appenvdetails.runtimeenvironment.WWApiEndpoint + 'Clients';

    //Set qs values
    options.qs.ignoreDuplicateAddress = "true";
    options.qs.validateAddress = "false";
    options.qs.ignoreDuplicatePhone = "true";

    //Set header values
    options.headers['x-hospital-id']=browser.appenvdetails.runtimeenvironment.hospitalId;
    options.headers.authorization = browser.bearerToken;

    //Set body data
    var timestamp = new Date().getTime();
    browser.timestamp = timestamp;
    var fname = "Steve_" + browser.timestamp;
    var lname = "Rogers_" + browser.timestamp;
    options.body.FirstName = fname;
    options.body.LastName = lname;
    options.body.HospitalId = browser.appenvdetails.runtimeenvironment.hospitalId;

    // console.log("Options: " + options.headers.authorization);
    var api = new WWApiCalls();
    return api.makeRequest(options);
  }

  createPatient() {
    console.log("\n*********** creating patient ***********");
    var options = { "method": "POST", "url": "", "qs": { "ignoreDuplicateAddress": "true", "validateAddress": "false", "ignoreDuplicatePhone": "true" }, "headers": { "cache-control": "no-cache", "content-type": "application/json", "applicationname": "Retriever", "username": "PTM-WebApp-qa", "x-hospital-id": "153", "authorization": "" }, "body": { "ClientId": "", "HospitalId": 153, "PatientId": 0, "PatientName": "Lilly", "GenderId": 2, "SpeciesId": 1, "SpeciesName": "Canine", "DateOfBirth": "2015-06-16T00:00:00", "Breeds": [{ "BreedId": 10, "BreedName": "Canaan Dog", "BreedRank": 1, "Description": "Canaan Dog", "GeriatricAge": null, "SpeciesId": 1, "ZoasisBreed": "CANA" }], "Appearances": [{ "AppearanceId": 163, "AppearanceName": "Black And Beige", "AppearanceTypeId": 1, "AppearanceValue": "Black And Beige", "IsActive": true }], "Weight": 3.5, "WeightUnit": "lb", "EnteredDate": "2017-10-30T00:00:00", "HasModifiedWeight": false, "Photo": null, "Neutered": "Neutered", "Sex": { "SexId": 1, "Name": "Male" }, "HasWellnessMembership": false, "DOBAgeAsEntered": "6/16/2015", "PetAge": "2y 4m", "IsPatientCareClubMember": false, "BreedNames": "Canaan Dog", "IsNewPatient": true, "Notes": "This dog will bite you ", "IsModified": null, "NumberOfActiveMemberships": 0, "EarliestMembershipStartDate": null, "HasPhoto": false, "EnteredWeight": "3.5 lb", "EnteredWeightUnitId": 3 }, "json": true };

    //Set URL
    options.url = browser.appenvdetails.runtimeenvironment.WWApiEndpoint + 'Patients'

    //Set qs values
    options.qs.ignoreDuplicateAddress = "true";
    options.qs.validateAddress = "false";
    options.qs.ignoreDuplicatePhone = "true";

    //Set header values
    options.headers['x-hospital-id']=browser.appenvdetails.runtimeenvironment.hospitalId;
    options.headers.authorization = browser.bearerToken;

    //Set body data
    options.body.ClientId = browser.clientID;
    options.body.PatientName = "Lilly_" + browser.timestamp;
    options.body.HospitalId = browser.appenvdetails.runtimeenvironment.hospitalId;

    // console.log("Options: " + options.headers.authorization);
    var api = new WWApiCalls();
    return api.makeRequest(options);
  }

  createNewAppointment() {
    console.log("\n*********** Create New Appointment ***********");
    var options = {
      method: 'POST',
      url: 'https://hcorpqa-ns02.vcaantech.com:443/WoofwareWebAPI/API/Appointments',
      headers:
      {
        'cache-control': 'no-cache',
        applicationname: 'Retriever',
        username: 'vcaantech\\tablet_nonprod',
        'x-hospital-id': '153',
        authorization: "",
        'content-type': 'application/json',
        accept: 'application/json, text/json, application/xml, text/xml'
      },
      body:
      {
        AppointmentId: 0,
        HospitalId: 153,
        AppointmentTypeId: 1,
        ClientId: 304006080,
        StatusId: 9,
        IsDraftAppointment: false,
        IsWalkInAppointment: true,
        PetAppointments:
        [{
          PetAppointmentId: 0,
          PatientId: 314760073,
          StatusId: 14,
          StartTime: '2017-11-07T17:03:05.424Z',
          EndTime: '2017-11-7T23:59:00.00Z',
          AppointmentTypeId: 1,
          HospitalId: 153,
          ProviderTypeId: 100,
          DepartmentAppointmentTypeId: 201,
          ReasonIds: '9',
          Resource: { UserId: 232800233, ResourceId: 233000253 }
        }]
      },
      json: true
    }

    var startTime = moment().subtract(6,'hours').toISOString();
    var endtime = moment().subtract(4,'hours').toISOString();

    //Set URL
    options.url = browser.appenvdetails.runtimeenvironment.WWApiEndpoint + 'Appointments';

    //Set header values
    options.headers['x-hospital-id']=browser.appenvdetails.runtimeenvironment.hospitalId;
    options.headers.authorization = browser.bearerToken;

    //Set body data
    options.body.ClientId = browser.clientID;
    options.body.HospitalId = browser.appenvdetails.runtimeenvironment.hospitalId;
    options.body.PetAppointments[0].PatientId = browser.patientID;
    options.body.PetAppointments[0].StartTime = startTime;
    options.body.PetAppointments[0].EndTime = endtime;

    // console.log("Options: " + options.body.PetAppointments[0].StartTime);
    var api = new WWApiCalls();
    return api.makeRequest(options);
  }

  checkInAppointment() {
    console.log("\n*********** Check In Appointment ***********");
    // var options = { "method": "POST", "url": "https://hcorpqa-ns02.vcaantech.com:443/WoofwareWebAPI/API/CheckInAppointment", "qs": { "appointmentId": "307204433", "isMergeMedicalNote": "false" }, "headers": { "postman-token": "94ae967e-dd58-c83c-9f70-dbfd1320d172", "cache-control": "no-cache", "applicationname": "Retriever", "username": "vcaantech\\tablet_nonprod", "x-hospital-id": "153", "authorization": "", "accept": "application/json, text/json, application/xml, text/xml" } };

    var options = { method: 'POST',
    url: 'https://hcorpqa-ns02.vcaantech.com:443/WoofwareWebAPI/API/CheckInAppointment',
    qs: { appointmentId: '307204562', isMergeMedicalNote: 'false' },
    headers: 
     { 'postman-token': '42c01a2c-1060-53df-a97f-1eefe69e3c3f',
       'cache-control': 'no-cache',
       applicationname: 'Retriever',
       username: 'vcaantech\\tablet_nonprod',
       'x-hospital-id': '153',
       authorization: 'bearer ZVWeoS0zB9BcxRTiOj0aFwQL314t_tUHvXrnwFtKIw5zILed38AA3UJNrhIlC076WnwUqw_Bos1PJJtgbndlXA-yXKD6LpZAfC7uLtONeMe4VHKYMFJcWrH6SFNWtDAYjKhzadK3n3hvpELfclwa4clWzgnzqLySsm80eEuLsQWWFBViXlDfNNYVLlBCtPxWKNOkjyhCk3llEM8bTdjJoKekAtXhDKmSvuGt9BD2r2cH_1mqheKKdGHb4LiFIuQBym6paA',
       accept: 'application/json, text/json, application/xml, text/xml' } };   

    //Set URL
    options.url = browser.appenvdetails.runtimeenvironment.WWApiEndpoint + 'CheckInAppointment';

    //Set qs values
    options.qs.appointmentId = browser.appointmentID.toString();
    options.qs.isMergeMedicalNote = "false";

    //Set header values
    options.headers['x-hospital-id']=browser.appenvdetails.runtimeenvironment.hospitalId.toString();
    // use a temporary access token to get around the basic auth issue  - its in the options above, provided from postman
    // options.headers.authorization = browser.bearerToken;

    // console.log("Options: " + options.qs.appointmentId);
    // console.log('Automation token: ',browser.bearerToken);
    // console.log('Postman token: ',options.headers.authorization);
    var api = new WWApiCalls();
    return api.makeRequest(options);
  }

  getCheckedInPatientDetails(){
    console.log('\n*********** Getting visit details ***********');
    var options = { method: 'GET',
    url: 'https://hcorpqa-ns02.vcaantech.com:443/WoofwareWebAPI/API/CheckedInPatients',
    qs: { IncludeOrderItemList: 'true', patientId: '314760138' },
    headers: 
     { 'cache-control': 'no-cache',
       applicationname: 'Retriever',
       username: 'vcaantech\\tablet_nonprod',
       'x-hospital-id': '153',
       authorization: 'bearer 1k-RCH6Kp1GRGiviURTU7KhhTDPDhZC9yvqgTp_2dSz_Sa3ZBGHkjzdv52btmQt0UsUQitE65lFZ7W6Vc6jo1TF-WvZ3WKzqwqcyeW6HipGCj2OChdnCGRT4WbiO88j0QFc52jbobFzqXFq9iL1rzG89jCKv9WcxfiuBb2TF2BVqc0cVneENh4zEOM3q2zjXr2_u0nCf4Jt9vbxKUKV2cmvprDkKUW-oH97TAmVmrU8r6TSBmWfN1Re3lfFOjB5eIIOI5A',
       accept: 'application/json, text/json, application/xml, text/xml' } };    

    //Set URL
    options.url = browser.appenvdetails.runtimeenvironment.WWApiEndpoint + 'CheckedInPatients';
    
    //Set qs values
    options.qs.patientId = browser.patientID.toString();
    options.qs.IncludeOrderItemList = 'true';

    //Set header values
    options.headers['x-hospital-id']=browser.appenvdetails.runtimeenvironment.hospitalId.toString();
    // use a temporary access token to get around the basic auth issue  - its in the options above, provided from postman
    options.headers.authorization = browser.bearerToken;

    var api = new WWApiCalls();
    return api.makeRequest(options);    
  }

  // makeRequest(options) {
  //   console.log("******************Making api request******************");
  //   var defer = protractor.promise.defer();
  //   request(options, function(error, response, body) {
  //     var queryResult : any[];
  //     if (error || body.statusCode >= 400) {
  //       defer.reject({ error: error, message: body });
  //       // console.log('API Failed with error: '+error);
  //     } else {
  //       defer.fulfill(body.Data);


  //     }
  //   });
  //   return defer.promise;
  // }

  // makeAuthRequest(options){
  //   console.log("******************Making Authorization request******************");
  //   var defer = protractor.promise.defer();
  //   request(options, function(error, response, body) {
  //     if (error || body.statusCode >= 400) {
  //       defer.reject({ error: error, message: body });        
  //     } else {          
  //       defer.fulfill(JSON.parse(body).access_token);
  //     }
  //   });
  //   return defer.promise;
  // }

  // getAuthToken(){
  //   console.log("******************getting auth token******************");    
  //   var options = { method: "POST", url: "https://apptsqa.vcahospitals.com:8443/AuthServer/OAuth/Token", headers: { //'postman-token': 'dd5b6efc-fe55-4760-20e9-3b75184a8038',
  //       "cache-control": "no-cache", authorization: "Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=", "content-type": "application/x-www-form-urlencoded" }, form: { grant_type: "client_credentials" } };
  //   var api = new WWApiCalls();
  //   return  api.makeAuthRequest(options);
  // }




  // createClient() {
  //   console.log("******************creating client******************");
  //   console.log(browser.bearerToken);
  //   var options = { 
  //     method: "POST", 
  //     url: "https://hcorpqa-ns02.vcaantech.com:443/WoofwareWebAPI/API/Clients", 
  //     qs: { 
  //       ignoreDuplicateAddress: "true", 
  //       validateAddress: "false", 
  //       ignoreDuplicatePhone: "true" 
  //     }, 
  //     headers: { //'postman-token': 'a99df14d-b621-9247-9eb4-341c09096395',
  //       "cache-control": "no-cache", 
  //       "content-type": "application/json", 
  //       applicationname: "Retriever", 
  //       username: "PTM-WebApp-qa", 
  //       "x-hospital-id": "153", 
  //       authorization: browser.bearerToken
  //     }, 
  //     body: { 
  //       ClientId: 0, 
  //       HospitalId: 153, 
  //       FirstName: "Steve_1491610122703", 
  //       LastName: "Rogers_1491610122703", 
  //       IsCorporateClient: false, 
  //       StatusId: 1, 
  //       ClientPhones: [{ 
  //         PhoneId: 0, 
  //         PhoneLabel: "Home", 
  //         ClientId: 0,
  //         PhoneNumber: "8052343967", 
  //         IsPrimaryContact: true, 
  //         HospitalId: 153, 
  //         PhoneTypeId: 1, 
  //         OptInStatusId: 1, 
  //         OptInStatusChangedDate: "2017-04-08T00:08:42.703Z", 
  //         IsMobileNumber: true 
  //       }] 
  //     }, 
  //     json: true 
  //   };
  //   console.log("Options: " + options.headers.authorization);
  //   var api = new WWApiCalls();
  //   return  api.makeRequest(options);
  // }

  // createPatient(){
  //   console.log("******************creating patient******************");
  //   var options = {
  //     method: "POST", 
  //     url: "https://hcorpqa-ns02.vcaantech.com:443/WoofwareWebAPI/API/Patients", 
  //     qs: { 
  //       ignoreDuplicateAddress: "true", 
  //       validateAddress: "false", 
  //       ignoreDuplicatePhone: "true" 
  //     },
  //     headers: { //'postman-token': 'a99df14d-b621-9247-9eb4-341c09096395',
  //       "cache-control": "no-cache", 
  //       "content-type": "application/json", 
  //       applicationname: "Retriever", 
  //       username: "PTM-WebApp-qa", 
  //       "x-hospital-id": "153", 
  //       authorization: browser.bearerToken
  //     }, 
  //     body: { 
  //         ClientId: browser.clientID,
  //         HospitalId: 153,
  //         PatientId: 0,
  //         PatientName: "Lilly",
  //         GenderId: 2,
  //         SpeciesId: 1,
  //         SpeciesName: "Canine",
  //         DateOfBirth: "2015-06-16T00:00:00",
  //         Breeds: [
  //           {
  //             BreedId: 10,
  //             BreedName: "Canaan Dog",
  //             BreedRank: 1,
  //             Description: "Canaan Dog",
  //             GeriatricAge: null,
  //             SpeciesId: 1,
  //             ZoasisBreed: "CANA"
  //           }
  //         ],
  //         Appearances: [
  //           {
  //             AppearanceId: 163,
  //             AppearanceName: "Black And Beige",
  //             AppearanceTypeId: 1,
  //             AppearanceValue: "Black And Beige",
  //             IsActive: true
  //           }
  //         ],
  //         Weight: 3.5,
  //         WeightUnit: "lb",
  //         EnteredDate: "2017-10-30T00:00:00",
  //         HasModifiedWeight: false,
  //         Photo: null,
  //         Neutered: "Neutered",
  //         Sex: {
  //           SexId: 1,
  //           Name: "Male"
  //         },
  //         HasWellnessMembership: false,
  //         DOBAgeAsEntered: "6/16/2015",
  //         PetAge: "2y 4m",
  //         IsPatientCareClubMember: false,
  //         BreedNames: "Canaan Dog",
  //         IsNewPatient: true,
  //         Notes: "This dog will bite you ",
  //         IsModified: null,
  //         NumberOfActiveMemberships: 0,
  //         EarliestMembershipStartDate: null,
  //         HasPhoto: false,
  //         EnteredWeight: "3.5 lb",
  //         EnteredWeightUnitId: 3
  //     }, 
  //     json:true
  //   };
  //   console.log("Options: " + options.headers.authorization);
  //   var api = new WWApiCalls();
  //   return  api.makeRequest(options);
  // }
}