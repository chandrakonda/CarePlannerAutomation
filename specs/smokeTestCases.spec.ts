import * as console from 'console';
import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import { CarePlannerSchedulerPage } from '../pages/carePlanner/cpScheduler.page';
import { CarePlannerPetDetails } from '../pages/carePlanner/cpPetdetails.page';
let cpSchedulerPage,cpPetDetailsPage;

describe('Verify the Careplanner Scheduler Page', () => {

  beforeAll( () =>{
    cpPetDetailsPage = new CarePlannerPetDetails();
    cpSchedulerPage = new CarePlannerSchedulerPage();
    // cpPetDetailsPage.navigateTo();   // comments

    var token;
  	var responseObj;
    var request = require("request");
		var options = { method: 'POST',
		  url: 'https://apptsqa.vcahospitals.com:8443/AuthServer/OAuth/Token',
		  headers:
		   { //'postman-token': 'dd5b6efc-fe55-4760-20e9-3b75184a8038',
		     'cache-control': 'no-cache',
		     authorization: 'Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=',
		     'content-type': 'application/x-www-form-urlencoded' },
		  form: { grant_type: 'client_credentials' } };

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
      console.log("Body: "+body);
			responseObj=JSON.parse(body);
			token=responseObj.access_token;
		});


    console.log("token: "+token);

    browser.get(browser.baseUrl+token);
    browser.sleep(4000);

    console.log("***********URL Launched***********");
  });

  // beforeEach(() => {
  //   var accessToken=await lib.apiCalls.getAuthToken();
  //   var hosptialId= await lib.getHospitalId();
  //   var patientId=await lib.apiCalls.createNewPatient(); //this is a meta api call that creates both the client and patient
  //   var orderId=await lib.apiCalls.createNewOrder('medical');  //create a new medical appt
  //   var userName=await lib.apiCalls.getCurrentUserName();
  //   var userId=await lib.apiCalls.getCurrentUserId();
  //
  //   var url = function {baseUrl+'?hospitalId='+hospitalId+'&patientId='patientId+'&orderId='+orderId+'&userName='+userName+'&userId='+userId+'&accessToken='+accessToken};
  //
  //   browser.get(url);
  // });

  it('Should have the title as VCA Charge Capture', () => {
    console.log("***********Verifying Page Title***********");
    expect(cpSchedulerPage.pageTitle).toEqual('VCA Charge Capture');
  });

  it('Should have the Pet Name as Lilly ', async () =>{
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
