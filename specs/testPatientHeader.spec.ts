import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import { CarePlannerPetDetails } from '../pages/carePlanner/cpPetdetails.page';
import { testSetupScenarios } from '../lib/testDataGeneration/setup_BasicTest'

let cpSchedulerPage, cpPetDetailsPage;

describe('Verify the Patient Header has accurate Patient and Visit information', () => {

  beforeAll(function () {
      let setup = new testSetupScenarios();
      setup.basicSetup('Josh','Chezum','Shallan','canine','female');
      cpPetDetailsPage = new CarePlannerPetDetails();
  });

  it('Should have the title as VCA Charge Capture', () => {    
    // console.log("\n***********Verifying Page Title***********");
    expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
  });

  it('Pet name should be correct', async () =>{
    if (browser.patientName.length >= 12){
        await expect(cpPetDetailsPage.petName).toEqual(browser.patientName.slice(0,12)+'…');    
    }
    else {
        await expect(cpPetDetailsPage.petName).toEqual(browser.patientName);
    }
  });  

  it('Client last name should be correct ', async () =>{
    if (browser.clientLastName.length >= 12){
        await expect(cpPetDetailsPage.clientName).toEqual(browser.clientLastName.slice(0,12)+'…');    
    }
    else {
        await expect(cpPetDetailsPage.clientName).toEqual(browser.clientLastName);
    }
  });
  
  it('Species name should be correct', async () => {
    await expect(cpPetDetailsPage.speciesName).toEqual(browser.petSpeciesName);
  });  

  it('Patient\'s species should be correct', async () => {
    await expect(cpPetDetailsPage.petGender).toEqual(browser.petGenderName);
  }); 

});