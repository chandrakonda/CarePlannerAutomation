import { browser, element, by } from 'protractor';
import { CarePlannerSchedulerPage } from '../../pages/carePlanner/cpScheduler.page';
import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';
import { CarePlannerEditSchedulePopup } from '../../pages/carePlanner/cpEditSchedulePopup.page';

let cpSchedulerPage, cpPetDetailsPage, cpEditSchedulePopupPage;

describe('Verify the user can schedule task', () => {
    
    
    beforeAll(() => {
        
        browser.get("https://hcorpqa-ns02.vcaantech.com/VCAChargeCapture?hospitalId=153&patientId=314760369&orderId=472963006&userName=Josh.Chezum&userId=246200262&accessToken=s7r7kG-9H8aMp9aiGjkFQo3794o4Q4-UkSrj3bf_sXD1nUC1jAdGsdIPA3wVjOqVfAstMZ8PZPDIoj3ZUbbn5QcqqzgGpV-HS4hsR-Xfaw3STt1Y6pBZUyv9y2UqR-frIAN9A8MeJ4M-Wtzb12Ev3QKe8JXIvW0Yg2qlf3ngnX8s_mOgIqAu5BHW8tkE4N7Kut9RHZji4Nwh7iSczxOPd3r2co7gVTAcBsd2F37Ea6IVW4Yy7heCVAx41jsQmPxAJmj2SA ");
        browser.ignoreSynchronization = true;
       // browser.executeScript("document.body.style.zoom='80%'");
        cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
        cpSchedulerPage = new CarePlannerSchedulerPage();
    });

    it('Should have the title as VCA Charge Capture', async () => {    
        cpPetDetailsPage = new CarePlannerPetDetails();
        browser.logger.info("***********Verifying Page Title***********");
        await expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
    });
    
    it('Category name list should be ', async () =>{
        let list1 : any;
        
        console.log(await cpSchedulerPage.categoryNameList);
    });


    it('Verifying Task Count', async () =>{
       // cpSchedulerPage = new CarePlannerSchedulerPage();
        browser.logger.info(cpSchedulerPage.productTaskList);
        await cpSchedulerPage.clickOnTaskName("Vitals");
    });

    it('Enter repeat hours ', () =>{
        
        browser.sleep(3000);
        cpEditSchedulePopupPage.EnterRepeatEveryHour(1);
       // expect(cpEditSchedulePopupPage.repeatEvery).toEqual(3);
    });


    
    it('Enter End time ', () =>{
        //cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
        browser.sleep(3000);
        cpEditSchedulePopupPage.EnterEndTime(20.00);
       // expect(cpEditSchedulePopupPage.repeatEvery).toEqual(3);
    });

    it('Enter instructions  ', () =>{
       // cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
        //browser.sleep(3000);
        cpEditSchedulePopupPage.EnterInstructions("Enter your instructions");
       // expect(cpEditSchedulePopupPage.repeatEvery).toEqual(3);
    });

    it('Click on Schedule button ', () =>{
       // cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
        //browser.sleep(3000);
        cpEditSchedulePopupPage.ClickScheduleButton();
       // expect(cpEditSchedulePopupPage.repeatEvery).toEqual(3);
    });



});