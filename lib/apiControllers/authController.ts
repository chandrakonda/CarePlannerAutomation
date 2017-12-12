import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');
const requestPromise = require('request-promise');
var request = require('request');

export class AuthController {
 
    static authTokenValue : string;
    constructor() {
        browser.logger.info("*********** Auth Controller ***********");
    }

  
   async getAuthToken1() {
        try {
            let __options = this.authTokenOptions();
            let __apiServices = new CarePlannerApiServices();
            let  __response = await __apiServices.makeApiCall(__options);
            let __response1 = JSON.parse(__response);
            browser.logger.info("*******************************************************");
            browser.logger.info("bearer "+__response1.access_token);
            browser.logger.info("*******************************************************");
            AuthController.authTokenValue = "bearer "+__response1.access_token;
        } catch (e){throw e;}
    }

    authTokenOptions(){
        browser.logger.info("*********** Getting Auth Token value ***********");
        let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//authToken.json'));
        __options.url = browser.appenvdetails.authorizationurl;
        // Assign token to global value 
        browser.logger.info(__options);
        return __options;
    }



}