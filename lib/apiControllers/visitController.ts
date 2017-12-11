import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';

const path = require('path');

export class VisitController {

    constructor() {
        browser.logger.info("*********** Visit Controller ***********")
    }

    // getVisitResources() {
    //     browser.logger.info('*********** Getting User details ***********');
    //     let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getVisitResources.json'));

    //     //Set URL
    //     options.url = browser.appenvdetails.wwapiendpoint + 'VisitResources';

    //     //Set header values
    //     options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
    //     options.headers.authorization = browser.bearerToken;

    //     var api = new CarePlannerApiServices();
    //     return api.makePostRequest(options);
    // }

    // getVisitDetailsByVisitId() {

    //     browser.logger.info('*********** Gettting Visit Details and Invoice Items by Visit Id ***********');

    //     let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getOrders.json'));

    //     //Set URL
    //     options.url = browser.appenvdetails.wwapiendpoint + 'Orders';

    //     //Set header values
    //     options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
    //     options.headers.authorization = browser.bearerToken;

    //     //Add visit Id to query
    //     options.qs.visitIds = browser.visitId;

    //     var api = new CarePlannerApiServices();
    //     return api.makeGetRequest(options);
    // }

    async getVisitDetailsByVisitId1(token: any) {

        let __options = await this.getVisitDetailsByVisitIdOptions(token);
        browser.logger.info(__options);
        var __apiServices = new CarePlannerApiServices();
        let __response = await __apiServices.makeApiCall(__options).then((response) => {
            browser.logger.info(response);
            return response;
        });
        
        let __visitDetails = await __apiServices.parseResultOfMakePostRequest(__response).then((response) => {
            browser.logger.info(response);
            browser.visitInvoiceItems = response[0].VisitInvoiceItems;

            for (let items of browser.visitInvoiceItems) {
                browser.logger.info("Visit Invoice Details :" + JSON.stringify(items));
                browser.logger.info("Visit Invoice Details [Visit Invoice Item Id]" + items.VisitInvoiceItemId);
                browser.logger.info("Visit Invoice Details [Invoice Item Id]" + items.InvoiceItemId);
            }
        });
    }

    getVisitDetailsByVisitIdOptions(token: any) {

        browser.logger.info('*********** Gettting Visit Details and Invoice Items by Visit Id ***********');

        let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getOrders.json'));

        //Set URL
        __options.url = browser.appenvdetails.wwapiendpoint + 'Orders';

        //Set header values
        __options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
        __options.headers.authorization = token;

        //Add visit Id to query
        __options.qs.visitIds = browser.visitId;
        return __options;
    }


    async getVisitResources1(token: any) {
        let __options = this.getVisitResourcesOptions(token);
        browser.logger.info(__options);
        var __apiServices = new CarePlannerApiServices();
        let __response = await __apiServices.makeApiCall(__options).then((response) => {
            return response;
        });
        let __visitDetails = await __apiServices.parseResultOfMakePostRequest(__response).then((response) => {
            browser.visitInvoiceItems = response[0].VisitInvoiceItems;

            for (let i in response) {
                // browser.logger(response[i]);
                let user = response[i];
                if (user['ADusername'] == browser.appenvdetails.username) {
                    browser.logger.info('UserId: ', user['ResourceId']);
                    browser.userId = user['ResourceId'];
                }
            }
        });
    }

    getVisitResourcesOptions(token : any){

        browser.logger.info('**************************** Getting User Details *************************************');
        let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getVisitResources.json'));

        //Set URL
        __options.url = browser.appenvdetails.wwapiendpoint + 'VisitResources';

        //Set header values
        __options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
        __options.headers.authorization = token;
        return __options;
    }
}