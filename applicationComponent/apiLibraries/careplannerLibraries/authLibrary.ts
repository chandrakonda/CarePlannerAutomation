import { FrameworkComponent } from '../../../frameworkComponent';
import { TestBase } from '../../../applicationComponent';

const path = require('path');
const requestPromise = require('request-promise');
var request = require('request');

export class AuthorizationLibrary{

    static authTokenValue: string;
    static tokenValue: string;
    constructor() {
        FrameworkComponent.logHelper.info("*********** Auth Controller ***********");
    }

    async getAuthToken() {
        try {
            let __options = this.authTokenOptions();            
            FrameworkComponent.logHelper.info(__options);
            let __response = await FrameworkComponent.apiServiceHelper.makeApiCall(__options);
            // browser.sleep(10000);
            let __response1 = JSON.parse(__response);
            FrameworkComponent.logHelper.info(__response1);
            FrameworkComponent.logHelper.info("bearer "+__response1.access_token);
            FrameworkComponent.logHelper.info("*******************************************************");
            AuthorizationLibrary.authTokenValue = __response1.access_token;
            TestBase.GlobalData.GlobalAuthToken = "bearer " + __response1.access_token;
        } catch (e) { throw e; }
    }

    authTokenOptions() {
        try {
            FrameworkComponent.logHelper.info("*********** Getting Auth Token value ***********");
            let __options = require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/authToken.json'));
            __options.url = TestBase.GlobalData.EnvironmentDetails.authorizationurl;           
            return __options;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}