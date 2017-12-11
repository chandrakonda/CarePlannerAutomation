import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');
const requestPromise = require('request-promise');
var request = require('request');
export class AuthController {

    // private apiServices;
    // private options; 

    constructor() {
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

    getAuthToken() {
        browser.logger.info("*********** Getting Auth Token ***********");
        let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//authToken.json'));
        options.url = browser.appenvdetails.authorizationurl;
        let __apiServices = new CarePlannerApiServices();
        return __apiServices.makePostAuthRequest(options);
    }

    async getAuthToken1() {
        try {
            let token: any;
            browser.logger.info("*********** Getting Auth Token11111 ***********");
            let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//authToken.json'));
            options.url = browser.appenvdetails.authorizationurl;
            let __apiServices = new CarePlannerApiServices();
            // Assign token to global value 
            browser.logger.info(options);
            return await Promise.resolve (__apiServices.makePostAuthRequest1(options)).then((response) => {
                //browser.apiToken = "bearer " + (response.access_token);
                browser.apiToken = "bearer " + (response.access_token);
                browser.logger.info(browser.apiToken);
                return "bearer " + (response.access_token);
                //browser.logger.info(browser.apiToken);
            });
           // browser.sleep(1000);
              
            //return a;
        } catch (e){throw e;}






    //    let b = (JSON.stringify(a));

    //    browser.logger.info(b["access_token"]);
        // apiServices.makePostAuthRequest1(options).then((response)=>{
        //    //let a = (JSON.stringify(response));
        //    browser.logger.info(response);
        // });   

       // --- using existing method ----------------------
       //browser.logger.info(apiServices.makePostAuthRequest2(options));
        // let a : any ;
        // apiServices.makePostAuthRequest2(options).then(function(response){
        //         browser.logger.info(response);
        //         a = JSON.stringify(response);
        //         browser.logger.info(a);
        // });

        // browser.apiToken = 'bearer '+  apiServices.makePostAuthRequest2(options);
        //  browser.logger.info( browser.apiToken );

        // Create client


    }



}