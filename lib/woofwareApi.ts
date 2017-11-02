import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
var request = require('request');

export class WWApiCalls{
  constructor (){}

  makeRequest(options) {
    console.log("Making api request");
    var defer = protractor.promise.defer();
    request(options, function (error, response, body) {
          if (error || body.statusCode>=400) {
            defer.reject({
              error:error,
              message:body
            });
            // console.log('API Failed with error: '+error);
          } else {
            console.log('statuscode: ', response.statusCode);
            console.log('body: ', body);
            defer.fulfill(JSON.parse(body));
          }
        });
        return defer.promise;
  }

  getAuthToken() {
    console.log("getting auth token");
    var options = { method: 'POST',
      url: 'https://apptsqa.vcahospitals.com:8443/AuthServer/OAuth/Token',
      headers:
       { //'postman-token': 'dd5b6efc-fe55-4760-20e9-3b75184a8038',
         'cache-control': 'no-cache',
         authorization: 'Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=',
         'content-type': 'application/x-www-form-urlencoded' },
      form: { grant_type: 'client_credentials' } };
    let api = new WWApiCalls();
    return api.makeRequest(options);
  }

  createClient(token: String) {
    console.log('creating client');
    var options = { method: 'POST',
      url: 'https://hcorpqa-ns02.vcaantech.com:443/WoofwareWebAPI/API/Clients',
      qs:
       { ignoreDuplicateAddress: 'true',
         validateAddress: 'false',
         ignoreDuplicatePhone: 'true' },
      headers:
       { //'postman-token': 'a99df14d-b621-9247-9eb4-341c09096395',
         'cache-control': 'no-cache',
         'content-type': 'application/json',
         applicationname: 'Retriever',
         username: 'PTM-WebApp-qa',
         'x-hospital-id': '153',
         authorization: 'bearer '+token },
      body:
       { ClientId: 0,
         HospitalId: 153,
         FirstName: 'Steve_1491610122703',
         LastName: 'Rogers_1491610122703',
         IsCorporateClient: false,
         StatusId: 1,
         ClientPhones:
          [ { PhoneId: 0,
              PhoneLabel: 'Home',
              ClientId: 0,
              PhoneNumber: '8052343967',
              IsPrimaryContact: true,
              HospitalId: 153,
              PhoneTypeId: 1,
              OptInStatusId: 1,
              OptInStatusChangedDate: '2017-04-08T00:08:42.703Z',
              IsMobileNumber: true } ] },
      json: true };
      console.log('Options: '+options.headers.authorization);
      let api = new WWApiCalls();
      return api.makeRequest(options);
  }

}
