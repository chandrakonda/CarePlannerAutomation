// import { browser, element, by, ExpectedConditions, protractor } from 'protractor';

// import { AppointmentController } from '../../lib/apiControllers/appointmentController';
// import { AuthController } from '../../lib/apiControllers/authController';
// import { ClientAndPatientController } from '../../lib/apiControllers/clientAndPatientController';
// import { VisitController } from '../../lib/apiControllers/visitController';
// import { OrderController } from '../../lib/apiControllers/orderController';

// import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';
// import { AddOptionalTaskDialog } from '../../pages/carePlanner/addTaskDialog.page';
// import { CarePlannerSchedulerPage } from '../../pages/carePlanner/cpScheduler.page';
// import * as moment from 'moment';
// import { CarePlannerApiCalls } from '../../lib/apiServices/carePlannerApiCalls';

// let schdedulerPage, cpPetDetailsPage, addTask;

// describe('Verify user can add an optional task', () => {

//     beforeAll(() => {
//         cpPetDetailsPage = new CarePlannerPetDetails();
//         addTask = new AddOptionalTaskDialog();
//         schdedulerPage = new CarePlannerSchedulerPage();
//         // Set Values for Global Variables
//         browser.productDataFile='test_addTask.spec.data';
//         browser.taskName = 'Body weight';
        
      
//     });

//     it('Data set up and client pet details' , async () => {
//         let __apiCalls = new CarePlannerApiCalls();
//         await __apiCalls.CreateClientPetAddProduct();

//     });

//     /// Test cases 
//     it('- the page has the title "VCA Charge Capture"', async () => {    
//         browser.logger.info("***********Verifying Page Title***********");
//         await expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
//     });

//     it('- user can open the AddTask dialog', async () => {    
//         addTask.openAddTaskDialog();
//         browser.sleep(3000);
//         await expect(addTask.getAddTaskHeaderTitle).toEqual('Add Task');
//     });    

//     it('- user can select a task from the list', async () => {    
//         addTask.setTaskLocatorString(browser.taskName); //taskName defined as global variable at start of spec
//         addTask.selectTaskFromList();
//         browser.sleep(1500);
//         await expect(addTask.selectedTaskName).toEqual(browser.taskName);
//         await expect(addTask.getSelectHeaderText).toContain('1');
//     });    

//     it('- user can add selected tasks to the schedule', async () => {    
//         addTask.addSelectedTasksToScheduler();
//         // browser.sleep(3000);
        
//         schdedulerPage.productTaskList.then(function(value){
//             // console.log(value);
//             expect(value).toContain[browser.taskName];
//         })

//     });        
// });      

