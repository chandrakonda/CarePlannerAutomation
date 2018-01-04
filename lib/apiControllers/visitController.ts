import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';

const path = require('path');

// Framework components 
import { LogHelper } from '../../support/logHelper';
import { SpecFile, VisitInvoiceItem } from '../../support/globalDataModel';
import { TestBase } from '../../testbase/TestBase';

export class VisitController {

    constructor() {
        LogHelper.Logger.info("*********** Visit Controller ***********");
    }

    // getVisitResources() {
    //     LogHelper.Logger.info('*********** Getting User details ***********');
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

    //     LogHelper.Logger.info('*********** Gettting Visit Details and Invoice Items by Visit Id ***********');

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

    async getVisitDetailsByVisitId(token: any, specData: SpecFile) {
        try {
            let __options = await this.getVisitDetailsByVisitIdOptions(token);
            LogHelper.Logger.info(__options);

            var __apiServices = new CarePlannerApiServices();
            await __apiServices.makeApiCall(__options).then((response) => {
                __apiServices.parseResultOfMakePostRequest(response).then((responseData) => {
                    LogHelper.Logger.info(responseData);
                    browser.visitInvoiceItems = responseData[0].VisitInvoiceItems;
                    for (let items of browser.visitInvoiceItems) {
                        let __visitinvoiceitem = new VisitInvoiceItem();
                        LogHelper.Logger.info("Visit Invoice Details :" + JSON.stringify(items));
                        __visitinvoiceitem.visitinvoiceitemid = items.VisitInvoiceItemId;
                        LogHelper.Logger.info("Visit Invoice Details [Visit Invoice Item Id]" + items.VisitInvoiceItemId);
                        __visitinvoiceitem.invoiceitemid = items.InvoiceItemId;
                        LogHelper.Logger.info("Visit Invoice Details [Invoice Item Id]" + items.InvoiceItemId);
                        specData.Data.Client.Patient.Visit.VisitInvoiceItem.push(__visitinvoiceitem);
                    }
                });
            });

        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    getVisitDetailsByVisitIdOptions(token: any) {
        try {
            LogHelper.Logger.info('*********** Gettting Visit Details and Invoice Items by Visit Id ***********');

            let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getOrders.json'));

            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'Orders';

            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = token;

            //Add visit Id to query
            __options.qs.visitIds = browser.visitId;
            return __options;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }


    async getVisitResources(token: any, specData: SpecFile) {
        try {
            let __options = this.getVisitResourcesOptions(token);
            LogHelper.Logger.info(__options);
            let __apiServices = new CarePlannerApiServices();
            await __apiServices.makeApiCall(__options).then((response) => {
                __apiServices.parseResultOfMakePostRequest(response).then((responseValue) => {
                    browser.visitInvoiceItems = responseValue[0].VisitInvoiceItems;
                    for (let i in responseValue) {
                        // LogHelper.Logger(response[i]);
                        let __user = responseValue[i];
                        let __userValue: string = __user['ADusername'];
                        if (__userValue.toUpperCase() == TestBase.GlobalData.EnvironmentDetails.username.toUpperCase()) {
                            LogHelper.Logger.info('UserId: ', __user['ResourceId']);
                            specData.UserId = __user['ResourceId'];
                        }
                    }
                });
            });
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

    getVisitResourcesOptions(token: any) {
        try {
            LogHelper.Logger.info('**************************** Getting User Details *************************************');
            let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getVisitResources.json'));

            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'VisitResources';

            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = token;
            return __options;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }
}