import { browser, by, element } from "protractor";
import { APILibraries, Pages, SpecFile, TestBase, TestCase, Utils } from "../../../applicationComponent";
import { FrameworkComponent } from "../../../frameworkComponent";


describe('Test Woofware 3.0', () => {

    let specFileData: SpecFile;
        // let __data: Data;
        let __testCase: TestCase;        
        let __utils: Utils;

        let __userName = 'mobile.test21@vca.com';
        let __password = 'Helpdesk21!';

        beforeAll(() => {
            specFileData = new SpecFile();            
            specFileData.TestCases = new Array<TestCase>();

            browser.get("https://api-dev.vcaantech.com/WOOFwareUI/#/home");
            browser.sleep(5000);
            browser.getCurrentUrl().then((url) => {
                if(url.includes('https://sso2.vcaantech.com/adfs/ls')) {
                    element(by.id('userNameInput')).sendKeys(__userName);
                    element(by.id('passwordInput')).sendKeys(__password);
                    element(by.id('submitButton')).click();
                }
            })
            browser.sleep(5000);

            var width = 3200;
            var height = 769;
            // browser.driver.manage().window().setSize(width, height);
            // browser.executeScript('window.parent.document.body.style.zoom = 0.5;');
        });

        afterAll(() => {
            TestBase.GlobalData.SpecFiles.push(specFileData);
        });

        beforeEach(() => {
            __testCase = new TestCase();
        });

        afterEach(() => {            
            specFileData.TestCases.push(__testCase);
        });
    it('Verify the search result count with api response of woofware3.0', async () => {
        try {

            let __clientFirstName = 'Smith';
           
            let __expectedSearchResultCount = await APILibraries.clientLibrary.searchClientByClientName(__clientFirstName);

            await Pages.WoofwareHomePage.EnterSearchText(__clientFirstName);
            browser.sleep(2000);
            
            let __actualSearchResultCount = await Pages.WoofwareHomePage.getSearhResultsCount();

            await expect(__expectedSearchResultCount.length).toBe(__actualSearchResultCount);

            browser.sleep(2000);
            
        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    });

    it('Verify the patient Exist under the client name ', async () => {
        try {
            let __clientFullName = 'Smith, G';
            let __patientName = 'Lucy';

            let __actualStatus = await Pages.WoofwareHomePage.isPatientNameExitUnderClientName(__clientFullName, __patientName);

            expect(__actualStatus).toBe(true);

            await Pages.WoofwareHomePage.clickOnPatientNameFromSearchResults(__clientFullName, __patientName);

            browser.sleep(2000);
            
        } catch (error) {
            
        }
    })

    it('Verify the patient medical overview page displayed', async () => {
        try {
           
            let __medicalOverviewPageDisplayed = await Pages.WoofwareMedicalOverviewPage.isMedicalOverviewPageDisplayed();
            browser.sleep(2000);
            // browser.executeScript('window.parent.document.body.style.zoom = 0.5;');
            expect(__medicalOverviewPageDisplayed).toBe(true);
        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    })

    it('Verify the patient name & client name displayed in the medical overview page', async () => {
        try {

            let __expectedClientName = 'Smith, G';
            let __expectedPatientName = 'Lucy';
            let __actualPatientName = await Pages.WoofwareMedicalOverviewPage.getPatientNameDisplayed();
            let __actualClientName = await Pages.WoofwareMedicalOverviewPage.getClientNameDisplayed();

            expect(__actualClientName).toBe(__expectedClientName);

            expect(__actualPatientName).toBe(__expectedPatientName);

        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    })
})