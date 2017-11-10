import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
const path = require('path');

export class VisitController{


    getVisitResources(){
        console.log('\n*********** Getting User details ***********');
        let options = require(path.join(__dirname, '..//..//..//data//jsonObjects//visitResources.json'));

        //Set URL
        options.url = browser.appenvdetails.wwapiendpoint + 'VisitResources';

        //Set header values
        options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
        options.headers.authorization = browser.bearerToken;

        var api = new CarePlannerApiServices();
        return api.postRequest(options);
    }
}