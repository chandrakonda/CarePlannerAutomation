import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');

export class AuthController{
    
    // private apiServices;
    // private options; 

    constructor(){
        // this.apiServices = new AuthServices();
        // this.options = require(path.join(__dirname, '..//..//..//data//jsonObject//authToken.json'));
        // this.options.url = browser.appenvdetails.authorizationurl;     
        browser.logger.info("*********** Auth Controller ***********");
    }

    // getAuthToken() {
    //     browser.logger.info("\n*********** Getting Auth Token ***********");
    //     return this.apiServices.authRequest(this.options);
    // }
    
    // getOAuthToken() {
    //     browser.logger.info("\n******************Getting OAuth Token******************");
    //     return this.apiServices.authRequest(this.options);
    // }

    getAuthToken(){
        browser.logger.info("*********** Getting Auth Token ***********");
        let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//authToken.json'));
        options.url = browser.appenvdetails.authorizationurl;          
        
        let apiServices = new CarePlannerApiServices();
        return apiServices.makePostAuthRequest(options);
    }
}