import * as console from 'console';
import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import { CarePlannerSchedulerPage } from '../pages/carePlanner/cpScheduler.page';
import { CarePlannerPetDetails } from '../pages/carePlanner/cpPetdetails.page';
var request = require('request');
import { WWApiCalls } from '../lib/woofwareApi';
let cpSchedulerPage,cpPetDetailsPage;

describe('Verify the Careplanner Scheduler Page', () => {

  // beforeAll( () =>{
  //   cpPetDetailsPage = new CarePlannerPetDetails();
  //   cpSchedulerPage = new CarePlannerSchedulerPage();
  //   // cpPetDetailsPage.navigateTo();   // comments
  //   console.log("***********URL Launched***********");
  // });
  beforeAll(function() {
    cpPetDetailsPage = new CarePlannerPetDetails();
    cpSchedulerPage = new CarePlannerSchedulerPage();
    // cpPetDetailsPage.navigateTo();   // comments
    // console.log("***********URL Launched***********");
    let token:String='';
    // function post(options) {
    //   var defer = protractor.promise.defer();
    //   request(options, function (error, response, body) {
    //   		  if (error || body.statusCode>=400) {
    //           defer.reject({
    //             error:error,
    //             message:body
    //           });
    //         } else {
    //           defer.fulfill(JSON.parse(body));
    //         }
    //   		});
    //       return defer.promise;
    // }
    //
    // function getAuthToken() {
    //   var options = { method: 'POST',
  	// 	  url: 'https://apptsqa.vcahospitals.com:8443/AuthServer/OAuth/Token',
  	// 	  headers:
  	// 	   { //'postman-token': 'dd5b6efc-fe55-4760-20e9-3b75184a8038',
  	// 	     'cache-control': 'no-cache',
  	// 	     authorization: 'Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=',
  	// 	     'content-type': 'application/x-www-form-urlencoded' },
  	// 	  form: { grant_type: 'client_credentials' } };
    //   return post(options);
    // }
    let api = new WWApiCalls();

    var flow = protractor.promise.controlFlow();
    flow.execute(api.getAuthToken).then(function(response){
      var responseObj=response;
      // console.log(responseObj['access_token']);
      token=responseObj['access_token'].toString();
      console.log("new token: "+token);
    }).then( ()=> {
      api.createClient(token);
      // .then((response)=> {
      //   console.log('response:'+response);
      // });
    }).then( ()=> {
      console.log('launching browser');
      console.log("token: "+token);
      var url = browser.baseUrl+token;
      console.log("URL: "+url);
      browser.get(url);
      browser.sleep(4000);
    });

  });

  it('Should have the title as VCA Charge Capture', () => {
    // console.log("***********Verifying Page Title***********");
    console.log('TEST 1')
    expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture');
  });

  
});
