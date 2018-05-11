//import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';
//import { CareNoteDialog } from '../../pages/carePlanner/careNoteDialog.page';
import * as moment from 'moment';
import { browser } from 'protractor';
import { APILibraryController, Data, Pages, SpecFile, TestBase, TestCase } from '../../applicationcomponent';
import { FrameworkComponent } from '../../frameworkComponent';
//import { CarePlannerApiCalls } from '../../lib/apiServices/carePlannerApiCalls';

let cpSchedulerPage, cpPetDetailsPage, careNote;
//let authController, clientAndPatientController, appointmentController;

describe('Verify user can create a CareNote', () => {

    let specFileData: SpecFile;
    let __data: Data;
    let __testCase: TestCase;
    beforeAll(() => {
        specFileData = new SpecFile();
        __data = new Data();
        specFileData.Data = __data;
        specFileData.TestCases = new Array<TestCase>();
        browser.ignoreSynchronization = true;
    });

    afterAll(() => {

        TestBase.GlobalData.SpecFiles.push(specFileData);
    });

    beforeEach(() => {
        __testCase = new TestCase();
    });

    afterEach(() => {
        FrameworkComponent.logHelper.info("TestCase Data " + __testCase.TestName);
        specFileData.TestCases.push(__testCase);
    });

    it('Data set up and client pet details', async () => {
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
        __testCase.TestName = '- the page has the title "VCA Charge Capture';
        browser.logger.info("***********Verifying Page Title***********");
        await expect(Pages.cpClientAndPetDetailsPage.pageTitle).toEqual('VCA Charge Capture');
    });

    it('Verify clicking the \'+CareNote\' button opens the Add CareNote dialog', async () => {
        __testCase.TestName = 'Verify clicking the \'+CareNote\' button opens the Add CareNote dialog';
        Pages.cpCareNoteDialog.openCareNoteDialog();
        browser.sleep(2000);
        await expect(Pages.cpCareNoteDialog.careNoteHeader).toEqual('Add Care Note');
    });

    it('Verify clicking \'Add care note\' after entering text saves the CareNote and audit information', async () => {
        __testCase.TestName = 'Verify clicking \'Add care note\' after entering text saves the CareNote and audit information';
        var t = moment();
        var careNoteText = 'this is new careNote text ' + t;
        Pages.cpCareNoteDialog.enterCareNoteText(careNoteText);
        // browser.sleep(3500);
        // await expect(careNote.getCareNoteText).toEqual(careNoteText); 

        Pages.cpCareNoteDialog.clickAddCareNoteButton();
        browser.sleep(2000);

        await expect(Pages.cpCareNoteDialog.getTextOfFirstCareNote).toEqual(careNoteText);
    });

    it(' - user can close the Care Note dialog', async () => {
        __testCase.TestName = ' - user can close the Care Note dialog';
        Pages.cpCareNoteDialog.closeCareNoteDialog();
        browser.sleep(2000);

        // await expect(careNote.careNoteHeader).toEqual('Add Care Note');
    });

});    
