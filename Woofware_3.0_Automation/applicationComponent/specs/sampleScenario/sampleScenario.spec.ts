import { browser, by, element } from "protractor";
import { Pages, SpecFile, TestBase, TestCase, Utils, WoofwareAPILibrary } from "../../../applicationComponent";
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

            let __clientName = 'Chezum';
            let __searchClient = new WoofwareAPILibrary()
            let __expectedSearchResultCount = await __searchClient.searchBy(__clientName);

            Pages.WoofwareHomePage.EnterSearchText(__clientName);
            let __actualSearchResultCount = Pages.WoofwareHomePage.getSearhResultsCount();

            expect(__expectedSearchResultCount.length).toBe(__actualSearchResultCount);

        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    });
})