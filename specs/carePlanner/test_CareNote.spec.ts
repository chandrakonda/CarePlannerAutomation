
import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';
import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import { CareNoteDialog } from '../../pages/carePlanner/careNoteDialog.page';
import * as moment from 'moment';
import { CarePlannerApiCalls } from '../../lib/apiServices/carePlannerApiCalls';

let cpSchedulerPage, cpPetDetailsPage, careNote;
//let authController, clientAndPatientController, appointmentController;

describe('Verify user can create a CareNote', () => {

    beforeAll(() => {
        cpPetDetailsPage = new CarePlannerPetDetails();
        careNote = new CareNoteDialog();
        var flow = protractor.promise.controlFlow();
       
        //jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        browser.ignoreSynchronization = true;
    });

    it('Data set up and client pet details' , async () => {
        let __apiCalls = new CarePlannerApiCalls();
        await __apiCalls.CreateClientPetAddProduct();

    });
    /// Test cases 
    it('- the page has the title "VCA Charge Capture"', async () => {    
        browser.logger.info("***********Verifying Page Title***********");
        await expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
    });

    it('Verify clicking the \'+CareNote\' button opens the Add CareNote dialog', async () => {
        careNote.openCareNoteDialog();
        browser.sleep(2000);
        await expect(careNote.careNoteHeader).toEqual('Add Care Note');
    });   

    it('Verify clicking \'Add care note\' after entering text saves the CareNote and audit information', async () => {         
        var t = moment();
        var careNoteText='this is new careNote text '+t;
        careNote.enterCareNoteText(careNoteText);
        // browser.sleep(3500);
        // await expect(careNote.getCareNoteText).toEqual(careNoteText); 

        careNote.clickAddCareNoteButton();
        browser.sleep(2000);

        await expect(careNote.getTextOfFirstCareNote).toEqual(careNoteText);
    });    

    it(' - user can close the Care Note dialog', async () => {
        careNote.closeCareNoteDialog();
        browser.sleep(2000);
        
        // await expect(careNote.careNoteHeader).toEqual('Add Care Note');
    });       

});    
