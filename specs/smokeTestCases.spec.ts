import * as console from 'console';
import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import { CarePlannerSchedulerPage } from '../pages/carePlanner/cpScheduler.page';
import { CarePlannerPetDetails } from '../pages/carePlanner/cpPetdetails.page';
let cpSchedulerPage,cpPetDetailsPage;

describe('Verify the Careplanner Scheduler Page', () => {

  beforeAll(() =>{    
    cpPetDetailsPage = new CarePlannerPetDetails();
    
    cpSchedulerPage = new CarePlannerSchedulerPage();
    cpPetDetailsPage.navigateTo();   // comments 
    console.log("***********URL Launched***********");
    
  });
// UI TEST CASES   ????????////////////////////////////

  it('Should have the title as VCA Charge Capture', () => {    
    console.log("***********Verifying Page Title***********");
    expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
  });

  it('Should have the Pet Name as Lilly ', async () =>{
    await expect(cpPetDetailsPage.petName).toEqual('Lilly');
  });

  it('Should have the Client Name as Chandra ', async () => {
    await expect(cpPetDetailsPage.clientName).toEqual('Chandra');
  });

  it('Should have the Species Name as Canine ', async () => {
    await expect(cpPetDetailsPage.speciesName).toEqual('Canine');
  });
});

describe('Verify the Category Details from the Scehduler Page', () => {

  let cpSchedulerPage =  new CarePlannerSchedulerPage();
  it('Should have the category count of 1',async () => {    
    await expect(cpSchedulerPage.categoryCount).toEqual(1);
  });

  // it('Should have the category name as DIAGNOSTIC', async () => {
  //    await expect(cpSchedulerPage.categoryList).toMatch('DIAGNOSTIC');
  // });  
});

describe('Verify the Product Task Details from the Scheduler Page', () => {

  let cpSchedulerPage =  new CarePlannerSchedulerPage();
  
  it('Should have the Product Task Count of 4', async () => {
    await expect(cpSchedulerPage.productTaskListCount).toEqual(4);
  });
  
  it('Should have the Scheduled task count of 2', async () => {
    await expect(cpSchedulerPage.scheduledProductTaskCount).toEqual(2);
  });
  
  it('Should have the Non-Scheduled task count of 2', async () => {
    await expect(cpSchedulerPage.nonScheduledProductTaskCount).toEqual(2);
  });

  it('Should have the list of Product Task Displayed', async () => {
    var productTaskList = ['Fel Vaccine TiterS16581','SChem SA010','TBF T4ED FeL FIV SA097','TBF T4ED SA090'];
    await expect(cpSchedulerPage.productTaskList).toEqual(productTaskList);
  });
});