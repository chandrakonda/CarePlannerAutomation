import { Helper, LogHelper } from '../../../frameworkComponent';
import { TestBase } from '../../../applicationComponent';

const path = require('path');
const requestPromise = require('request-promise');
var request = require('request');

export class AuthorizationLibrary{

    static authTokenValue: string;
    static tokenValue: string;
    constructor() {
        LogHelper.Logger.info("*********** Auth Controller ***********");
    }

    async getAuthToken() {
        try {
            let __options = this.authTokenOptions();            
            LogHelper.Logger.info(__options);
            let __response = await Helper.apiServiceHelper.makeApiCall(__options);
            // browser.sleep(10000);
            let __response1 = JSON.parse(__response);
            LogHelper.Logger.info(__response1);
            LogHelper.Logger.info("bearer "+__response1.access_token);
            LogHelper.Logger.info("*******************************************************");
            AuthorizationLibrary.authTokenValue = __response1.access_token;
            TestBase.GlobalData.GlobalAuthToken = "bearer " + __response1.access_token;
        } catch (e) { throw e; }
    }

    authTokenOptions() {
        try {
            LogHelper.Logger.info("*********** Getting Auth Token value ***********");
            let __options = require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/authToken.json'));
            __options.url = TestBase.GlobalData.EnvironmentDetails.authorizationurl;           
            return __options;
        } catch (error) {
            LogHelper.Logger.error(error);
            throw error;
        }
    }
}