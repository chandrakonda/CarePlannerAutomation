
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
