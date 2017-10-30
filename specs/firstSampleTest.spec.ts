import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import { CarePlannerSchedulerPage } from '../pages/carePlanner/cpScheduler.page';


describe(' pending Verify the Careplanner Scheduler Page 2', () => {
  
    it("pending spec", async () =>{
      browser.get('/');
      browser.pause();
      console.log(browser.baseUrl);
      console.log(browser.jsonconfig.username);
      console.log(browser.jsonconfig.applicationurl);
      console.log(browser.jsonconfig.apiendpoint);
      console.log("pending spec is tested");
    });
  
    it("pending spec 1", async () =>{
      console.log("pending spec is tested");
    });
  
    it("pending spec 2", async () =>{
      console.log("pending spec is tested4234234");
    });
  
    it("pending spec 3", async () =>{
      console.log("pending spec is tested");
    });
  });


// describe('Verify the Careplanner Scheduler Page 1', () => {
 
//   let cpSchedulerPage = new CarePlannerSchedulerPage();

  
//   beforeAll( async ()=>{
//     console.log("before each is printed");
//     cpSchedulerPage.navigateTo();
//     browser.waitForAngularEnabled(false);    
//   });
  

//   it('should have the title as VCA Charge Capture', async () => {
//     console.log("it in the first case");
    
//     await expect(cpSchedulerPage.pageTitle).toEqual('VCA Charge Capture');
    
//   });

//   it('Enter care notes in the page', async () => {
//     console.log("it in the first case");
//     // Click on care note button
//     cpSchedulerPage.eleCareNotesButton.click();
//     cpSchedulerPage.eleEnterCareNotes.sendKeys("Test this value to enter");
//     cpSchedulerPage.eleAddCareNoteButton.click();
//     // Enter care note

//     // Click on Add care note button 

    
    
//   });
  // it('should have the Pet Name as M3 ', async () =>{

  //   await expect(cpSchedulerPage.petName).toEqual('Lion');
  // });

  // it('should have the Client Name as Chandra ', async () => {

  //   await expect(cpSchedulerPage.clientName).toEqual('Chandra');
  // });

  // it('should have the Species Name as Canine ', async () => {

  //   await expect(cpSchedulerPage.speciesName).toEqual('Canine');
  //   cpSchedulerPage.eledrName.getText().then(function(text){
  //     console.log(text);
  //   });
  // });

  // it('Get pet gender ', async () => {
  //   cpSchedulerPage.elePetGender.getText().then(function(text){
  //     console.log(text);
  //   });
  // });

  // it('Get pet shift ', async () => {
  //     cpSchedulerPage.eledrshift.getText().then(function(text){
  //       console.log(text);
  //     });
  // });
  // it('Get pet shift ', async () => {
  //   cpSchedulerPage.eleCageDropdownValue.getText().then(function(text){
  //     console.log("Cage drop down value "+text);
  //   });
  // });

  // it('Get pet shift ', async () => {
  //   cpSchedulerPage.eleLocationDropdownValue.getText().then(function(text){
  //     console.log("Location drop down " + text);
  //   });
  // });
  // it('Get pet shift ', async () => {
  //   cpSchedulerPage.eleTechnicianValue.getText().then(function(text){
  //     console.log(" Technician drop down "+ text);
  //   });
  // });

  // afterAll(async ()=>{
  //   console.log("after all is printed in this");
  // })
//});


