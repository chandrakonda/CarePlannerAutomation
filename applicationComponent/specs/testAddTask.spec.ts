
import * as moment from 'moment';
import { FrameworkComponent } from '../../frameworkComponent';
import { SpecFile, Data, TestCase, TestBase, APILibraryController, Pages, TaskSeries, Product } from '../../applicationcomponent'
import { browser, element, by, ExpectedConditions, protractor } from 'protractor';

let schdedulerPage, cpPetDetailsPage, addTask;

describe('Verify user can add an optional task', () => {
    let specFileData: SpecFile;
    let __data: Data;
    let __testCase: TestCase;

    beforeAll(() => {
       // cpPetDetailsPage = new CarePlannerPetDetails();
       // addTask = new AddOptionalTaskDialog();
       // schdedulerPage = new CarePlannerSchedulerPage();
        // Set Values for Global Variables
        browser.productDataFile='test_addTask.spec.data';
        browser.taskName = 'Body weight';
        specFileData = new SpecFile();
        __data = new Data();
        specFileData.Data = __data;
        specFileData.TestCases = new Array<TestCase>();   
    });

    afterAll( () => {
        TestBase.GlobalData.SpecFiles.push(specFileData);
    });

    beforeEach(()=> {
        __testCase = new TestCase();          
    });

    afterEach(()=> {
        FrameworkComponent.logHelper.info("TestCase Data " + __testCase.TestName);
        specFileData.TestCases.push(__testCase);
    });

    it('Data set up and client pet details' , async () => {
        try {
            __testCase.TestName = 'API Calls for scheduling a task in careplanner';
            await APILibraryController.careplannerLibrary.apiTestDataSetUpWithDefaultData(specFileData);   
            FrameworkComponent.logHelper.info("TestCase Data " + __testCase.TestName);
        } catch (error) {
            __testCase.TestResult = 'Fail';
            __testCase.ExceptionDetails = error;
        }
    });

    /// Test cases 
    it('- the page has the title "VCA Charge Capture"', async () => {    
        FrameworkComponent.logHelper.info("***********Verifying Page Title***********");
        await expect (Pages.cpClientAndPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
    });

    it('- user can open the AddTask dialog', async () => {    
        Pages.cpAddOptionalTaskDialog.openAddTaskDialog();
        browser.sleep(3000);
        await expect(Pages.cpAddOptionalTaskDialog.getAddTaskHeaderTitle).toEqual('Add Task');
    });    

    it('- user can select a task from the list', async () => {    
        Pages.cpAddOptionalTaskDialog.setTaskLocatorString(browser.taskName); //taskName defined as global variable at start of spec
        Pages.cpAddOptionalTaskDialog.selectTaskFromList();
        browser.sleep(1500);
        await expect(Pages.cpAddOptionalTaskDialog.selectedTaskName).toEqual(browser.taskName);
        await expect(Pages.cpAddOptionalTaskDialog.getSelectHeaderText).toContain('1');
    });    

    it('- user can add selected tasks to the schedule', async () => {    
        Pages.cpAddOptionalTaskDialog.addSelectedTasksToScheduler();
        // browser.sleep(3000);
        
        Pages.cpSchedulerPage.productTaskList.then(function(value){
            // console.log(value);
            expect(value).toContain[browser.taskName];
        })

    });        
});      

