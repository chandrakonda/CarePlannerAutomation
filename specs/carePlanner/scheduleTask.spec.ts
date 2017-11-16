import { browser, element, by } from 'protractor';
import { CarePlannerSchedulerPage } from '../../pages/carePlanner/cpScheduler.page';
import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';
import { CarePlannerEditSchedulePopup } from '../../pages/carePlanner/cpEditSchedulePopup.page';

let cpSchedulerPage, cpPetDetailsPage, cpEditSchedulePopupPage;

describe('Verify the user can schedule task', () => {
    
    
    beforeAll(() => {
        
        browser.get("https://hcorpqa-ns02.vcaantech.com/VCAChargeCapture?hospitalId=153&patientId=314760342&orderId=472962967&userName=chandrasekhar.konda&userId=0&accessToken=SltRMWmy6I6W_FY-kwONiNKgtpYqK9xPtanDVkY2VdG8JK7yxErMGj7AMIJpX8xQKhnMe3FK208n7Ul75E1ep95HSm3QvyPzbGQ-VaGPOYm1iFe2VNKS1K-E-7blA8BeSvgkM8KPy09fvS8fnbZ7WAceGtFS8WU_bl7SI9qJ_U1X5PXLdcn8FbTAZzyjHgY5GYyctItNPGfRBKc_HwvxCFwZfemrFuQYaI-k3qOmJ3y7SOZMBcHPr0THRxtgs9_Bcnt1DQ ");
        browser.ignoreSynchronization = true;
    });

    it('Should have the title as VCA Charge Capture', async () => {    
        cpPetDetailsPage = new CarePlannerPetDetails();
        browser.logger.info("***********Verifying Page Title***********");
        await expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
    });
    

    it('Verifying Task Count', async () =>{
        cpSchedulerPage = new CarePlannerSchedulerPage();
        browser.logger.info(cpSchedulerPage.productTaskList);
        await cpSchedulerPage.clickOnTaskName("Vitals");
    });

    it('Enter repeat hours ', () =>{
        cpEditSchedulePopupPage = new CarePlannerEditSchedulePopup();
        cpEditSchedulePopupPage.EnterRepeatEveryHour(3);
        expect(cpEditSchedulePopupPage.repeatEvery).toEqual(3);
    });
});