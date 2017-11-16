import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';

const path = require('path');

export class VisitController{
        
    constructor(){
        browser.logger.info("*********** Visit Controller ***********")
    }

    getVisitResources(){
        browser.logger.info('*********** Getting User details ***********');
        let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getVisitResources.json'));

        //Set URL
        options.url = browser.appenvdetails.wwapiendpoint + 'VisitResources';

        //Set header values
        options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
        options.headers.authorization = browser.bearerToken;

        var api = new CarePlannerApiServices();
        return api.makePostRequest(options);
    }

    getVisitDetailsByVisitId(){
        browser.logger.info('*********** Gettting Visit Details and Invoice Items by Visit Id ***********');

        let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getOrders.json'));

        //Set URL
        options.url = browser.appenvdetails.wwapiendpoint + 'Orders';

       //Set header values
       options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
       options.headers.authorization = browser.bearerToken;

       //Add visit Id to query
       options.qs.visitIds = browser.visitId;

       var api = new CarePlannerApiServices();
       return api.makeGetRequest(options);
    }
}