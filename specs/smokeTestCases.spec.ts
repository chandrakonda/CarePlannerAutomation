import * as console from 'console';
import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import { CarePlannerSchedulerPage } from '../pages/carePlanner/cpScheduler.page';
import { CarePlannerPetDetails } from '../pages/carePlanner/cpPetdetails.page';
var request = require('request');
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

    var token='';
    var jar = request.jar();
    var req = request.defaults({
        jar : jar
    });

    function post(options) {
      var defer = protractor.promise.defer();
      request(options, function (error, response, body) {
      		  if (error || body.statusCode>=400) {
              defer.reject({
                error:error,
                message:body
              });
            } else {
              defer.fulfill(JSON.parse(body));
            }
      		});
          return defer.promise;
    }

    function getAuthToken() {
      var options = { method: 'POST',
  		  url: 'https://apptsqa.vcahospitals.com:8443/AuthServer/OAuth/Token',
  		  headers:
  		   { //'postman-token': 'dd5b6efc-fe55-4760-20e9-3b75184a8038',
  		     'cache-control': 'no-cache',
  		     authorization: 'Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=',
  		     'content-type': 'application/x-www-form-urlencoded' },
  		  form: { grant_type: 'client_credentials' } };
      return post(options);
    }

    var flow = protractor.promise.controlFlow();
    flow.execute(getAuthToken).then(function(response){
      var responseObj=response;
      // console.log(responseObj['access_token']);
      token=responseObj['access_token'];
      console.log("new token: "+token);
    });
    flow.execute(function(){
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
    expect(cpSchedulerPage.pageTitle).toEqual('VCA Charge Capture');
  });

  it('Should have the Pet Name as Lilly ', async () =>{
    console.log('TEST 2')
    await expect(cpSchedulerPage.petName).toEqual('Lilly');
  });

  // it('Should have the Client Name as Chandra ', async () => {
  //   await expect(cpSchedulerPage.clientName).toEqual('Chandra');
  // });
  //
  // it('Should have the Species Name as Canine ', async () => {
  //   await expect(cpSchedulerPage.speciesName).toEqual('Canine');
  // });
});

// describe('Verify the Category Details from the Scehduler Page', () => {
//
//   //let cpSchedulerPage =  new CarePlannerSchedulerPage();
//   it('Should have the category count of 1',async () => {
//     await expect(cpSchedulerPage.categoryCount).toEqual(1);
//   });
//
//   it('Should have the category name as DIAGNOSTIC', async () => {
//      await expect(cpSchedulerPage.categoryList).toMatch('DIAGNOSTIC');
//   });
// });
//
// describe('Verify the Product Task Details from the Scheduler Page', () => {
//
//   //let cpSchedulerPage =  new CarePlannerSchedulerPage();
//
//   it('Should have the Product Task Count of 4', async () => {
//     await expect(cpSchedulerPage.productTaskListCount).toEqual(4);
//   });
//
//   it('Should have the Scheduled task count of 2', async () => {
//     await expect(cpSchedulerPage.scheduledProductTaskCount).toEqual(2);
//   });
//
//   it('Should have the Non-Scheduled task count of 2', async () => {
//     await expect(cpSchedulerPage.nonScheduledProductTaskCount).toEqual(2);
//   });
//
//   it('Should have the list of Product Task Displayed', async () => {
//     var productTaskList = ['Fel Vaccine TiterS16581','SChem SA010','TBF T4ED FeL FIV SA097','TBF T4ED SA090'];
//     await expect(cpSchedulerPage.productTaskList).toEqual(productTaskList);
//   });
// });
