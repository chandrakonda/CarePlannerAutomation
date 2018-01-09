import { LogHelper } from '../../../frameworkComponent';
import { SpecFile, Data, TestCase, TestBase, APILibraryController, Pages } from  '../../../applicationcomponent'


let occurrenceDetails: TaskOccurreceDetails;

describe('Parent: schedule task occurrence and complete the task occurrence scheduled', async () => {

    let specFileData: SpecFile;
    let __data: Data;
    let __testCase: TestCase;
    
    beforeAll(() => {
        specFileData = new SpecFile();
        __data = new Data();
        specFileData.Data = __data;
        specFileData.TestCases = new Array<TestCase>();
    });

    afterAll(() => {
        //clearBrowserValues();
        TestBase.GlobalData.SpecFiles.push(specFileData);
    });

    beforeEach(() => {
        __testCase = new TestCase();
        LogHelper.Logger.info( "TestCase Template " + __testCase.TestName);
    });

    afterEach(()=> {


        LogHelper.Logger.info("TestCase Data " + __testCase.TestName);
        specFileData.TestCases.push(__testCase);
    });

    it('TesCase1 : Data set up and client pet details', async () => {
        // let _testcase = new TestCase();
        try{
            Pages.cpSchedulerPage.categoryNameList
            __testCase.TestName = 'Create Client and Pet';
            //await CarePlannerAPIController.createClientPetAddProduct1(specFileData);
            // __apiCalls.BuildURLLauchApplication(specFileData);
        } catch(e) {
            __testCase.TestResult = 'Fail';
            __testCase.ExceptionDetails = e;
        }
        // specFileData.TestCases.push(_testcase);
        expect(true).toBe(true);
    });

    it('TestCase2 : Data set up and client pet details', async () => {
        // let _testcase = new TestCase();
        
        __testCase.TestName = 'Create visit and appointment and add product';
        __testCase.TestResult = 'Pass';
        // specFileData.TestCases.push(_testcase);
        expect(true).toBe(true);
        LogHelper.Logger.info("Click on the task occurrence by index ");

    });

    // it('TestCase3 : Data set up and client pet details', async () => {
    //     let _testcase = new TestCase();
        
    //     _testcase.TestName = 'Data set up and client pet details2';
    //     _testcase.TestResult = 'Fail';
    //     specFileData.TestCases.push(_testcase);
    //     expect(true).toBe(true);
    //     LogHelper.Logger.info("Test case 3");
    // });

    // it('TestCase4 : Data set up and client pet details', async () => {
    //     let _testcase = new TestCase();
        
    //     _testcase.TestName = 'Data set up and client pet details2';
    //     _testcase.TestResult = 'Fail';
    //     specFileData.TestCases.push(_testcase);
    //     expect(true).toBe(true);
    //     LogHelper.Logger.info("Test case 4");
    // });

    // it('TestCase5 : Data set up and client pet details', async () => {
    //     let _testcase = new TestCase();
        
    //     _testcase.TestName = 'Data set up and client pet details2';
    //     _testcase.TestResult = 'Fail';
    //     specFileData.TestCases.push(_testcase);
    //     expect(true).toBe(true);
    //     LogHelper.Logger.info("Test case 5");
    // });

    // it('TestCase6 : Data set up and client pet details', async () => {
    //     let _testcase = new TestCase();
        
    //     _testcase.TestName = 'Data set up and client pet details2';
    //     _testcase.TestResult = 'Fail';
    //     specFileData.TestCases.push(_testcase);
    //     //expect(true).toBe(truncate);
    //     LogHelper.Logger.info("Test case 5");
    // });


    
    // it('TestCase7 : Data set up and client pet details', async () => {
    //     let _testcase = new TestCase();
        
    //     _testcase.TestName = 'Data set up and client pet details2';
    //     _testcase.TestResult = 'Fail';
    //     specFileData.TestCases.push(_testcase);
    //     expect(true).toBe(false);
    //     LogHelper.Logger.info("Test case 5");
    // });

    // it('TestCase8 : Data set up and client pet details', async () => {
    //     let _testcase = new TestCase();
        
    //     _testcase.TestName = 'Data set up and client pet details2';
    //     _testcase.TestResult = 'Fail';
    //     specFileData.TestCases.push(_testcase);
    //     expect(true).toBe(false);
    //     LogHelper.Logger.info("Test case 5");
    // });
 
 
});