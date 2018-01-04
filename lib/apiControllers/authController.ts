import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');
const requestPromise = require('request-promise');
var request = require('request');

// FrameworkComponents

import { LogHelper } from '../../support/logHelper';

import { TestBase } from '../../testbase/TestBase';

export class AuthController {

    static authTokenValue: string;
    static tokenValue: string;
    constructor() {
        LogHelper.Logger.info("*********** Auth Controller ***********");
    }


    async getAuthToken() {
        try {
            let __options = this.authTokenOptions();
            let __apiServices = new CarePlannerApiServices();
            LogHelper.Logger.info(__options);
            let __response = await __apiServices.makeApiCall(__options);
           // browser.sleep(10000);
            let __response1 = JSON.parse(__response);
           LogHelper.Logger.info(__response1);
           LogHelper.Logger.info("bearer "+__response1.access_token);
            LogHelper.Logger.info("*******************************************************");
            AuthController.authTokenValue = "bearer " +__response1.access_token;
            //AuthController.tokenValue = __response1.access_token;
            TestBase.GlobalData.GlobalAuthToken = "bearer " + __response1.access_token;
        } catch (e) { throw e; }
    }

    authTokenOptions() {
        try {
            LogHelper.Logger.info("*********** Getting Auth Token value ***********");
            let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//authToken.json'));
            //__options.url = browser.appenvdetails.authorizationurl;
            __options.url = TestBase.GlobalData.EnvironmentDetails.authorizationurl;
           
            return __options;
        } catch (error) {
            //LogHelper.Logger.error(error);
            throw error;
        }
    }



}