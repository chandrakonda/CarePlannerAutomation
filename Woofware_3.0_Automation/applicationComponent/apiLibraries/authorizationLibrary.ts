import { browser } from "protractor";
import { TestBase } from "../../applicationComponent";
import { DataReaderController } from "../../dataComponent";
import { FrameworkComponent } from "../../frameworkComponent";

export class AuthorizationLibrary {

    constructor() {
        FrameworkComponent.logHelper.info("*************** Authorization Library ***************")
    }

    async getAuthToken() {
        try {
            let __authTokenOptions = this.setAuthorizationTokenOptions();
            FrameworkComponent.logHelper.info("Options set to get authorization token : ");
            FrameworkComponent.logHelper.info(__authTokenOptions);

            await browser.sleep(1000);

            let __apiResponse = await FrameworkComponent.apiServiceHelper.makeApiCallToGetBody(__authTokenOptions);
            let __apiParsedResponse = await JSON.parse(__apiResponse);
            
            FrameworkComponent.logHelper.info("**************************************************");
            FrameworkComponent.logHelper.info("Parsed response of 'GetAuthorizationToken'  : " + __apiParsedResponse);
            FrameworkComponent.logHelper.info("**************************************************");
            FrameworkComponent.logHelper.info("**************************************************");
            FrameworkComponent.logHelper.info("'Bearer Token' from the 'GetAuthorizationToken' API Response" + __apiParsedResponse.access_token);

            TestBase.GlobalData.GlobalAuthToken = "bearer " + __apiParsedResponse.access_token;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    setAuthorizationTokenOptions() {
        try {
            FrameworkComponent.logHelper.info("*********** Setting Options for Authorization Token Value ***********");
            
            let __options = DataReaderController.loadAPITemplates('authToken');
            // __options.url = TestBase.GlobalData.EnvironmentConfigDetails.authorizationurl;
            return __options;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    
}