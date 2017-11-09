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
        console.log("test")      ;
    }

    // getAuthToken() {
    //     console.log("\n*********** Getting Auth Token ***********");
    //     return this.apiServices.authRequest(this.options);
    // }
    
    // getOAuthToken() {
    //     console.log("\n******************Getting OAuth Token******************");
    //     return this.apiServices.authRequest(this.options);
    // }

    getAuthToken(){
        let options = require(path.join(__dirname, '..//..//..//data//jsonObjects//authToken.json'));
        options.url = browser.appenvdetails.authorizationurl;          
        console.log("\n*********** Getting Auth Token ***********");
        let apiServices = new CarePlannerApiServices();
        return apiServices.postAuthRequest(options);
    }
}