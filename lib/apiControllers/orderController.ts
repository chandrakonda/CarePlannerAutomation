import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
import { AddingProductsModel } from '../../data/model/products_model';

const path = require('path');

export class OrderController {

    constructor() {
        browser.logger.info("*********** Order Controller ***********")
    }

    async addOrderToVisit1(token: any, productFileName?: string) {
        browser.logger.info("******************* Get Order To Visit ******************************");
        let __responseList = [];
        let __rootObject: AddingProductsModel.RootObject;
        let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//putVisitInvoiceItems.json'));

        if (productFileName == null) { __rootObject = new AddingProductsModel.RootObject(); }
        else { __rootObject = new AddingProductsModel.RootObject(productFileName); }
        let __apiServices = new CarePlannerApiServices();
        browser.visitId = browser.visitId;
        __rootObject.products.forEach(async product => {
            browser.logger.log("*************** Adding Product to Order **************");
            //Set URL
            options.url = browser.appenvdetails.wwapiendpoint + "Visits/" + browser.visitId + "/VisitInvoiceItems";
            //Set header values
            options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
            options.headers.authorization = token;
            options.body = product
            browser.logger.info("************product options **********")
            browser.logger.info(options)
            browser.logger.info("************product options **********")
            let __response = await __apiServices.makeApiCall(options);
            let __resultValue = await __apiServices.parseResultOfMakePostRequest(__response).then((result) => {
                return result;
            })
            __responseList.push(__resultValue);
        });

        browser.logger.info(__responseList);
    }


    async getTaskSeriesByOrderId1(token: any) {

        let __options = await this.getTaskSeriesByOrderIdOptions(token);
        browser.logger.info(__options);
        var __apiServices = new CarePlannerApiServices();
        let __response = await __apiServices.makeApiCall(__options).then((response)=>{
            return response;
        })
        await __apiServices.parseResultOfMakePostRequest(__response).then((response) => {
            browser.taskOccurances = response[0].TaskOccurences;
            for (let items of browser.taskOccurances) {
                browser.taskSeriesId = items.TaskSeriesId;
                browser.taskOccurrenceId = items.TaskOccurrenceId;
                browser.logger.info("Task Series Id :'" + browser.taskSeriesId + "' for OrderId : '" + browser.visitId + "'");
                browser.logger.info("Task Occurance Id :'" + browser.taskOccurrenceId + "' for OrderId : '" + browser.visitId + "'");
            }
        });
    }

    getTaskSeriesByOrderIdOptions(token: any) {

        browser.logger.info('*********** Get Task Series By Order Id ***********');
        let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getTaskSeriesByOrderId.json'));
        //Set URL
        options.url = browser.appenvdetails.wwapiendpoint + "Orders/" + browser.visitId + "/TaskSeries";

        //Set header values
        options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
        options.headers.authorization = token;
        return options;

    }

    
    // addOrderToVisit() {
    //     if (browser.productDataFile != undefined) { return AddingProductsModel.submitProductToVisit(browser.productDataFile); }
    //     else { return AddingProductsModel.submitProductToVisit(); }
    // }

    // getTaskSeriesByOrderId() {

    //     browser.logger.info("*********** Get Task Series By Order Id ***********");
    //     let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getTaskSeriesByOrderId.json'));
    //     //Set URL
    //     options.url = browser.appenvdetails.wwapiendpoint + "Orders/" + browser.visitId + "/TaskSeries";

    //     //Set header values
    //     options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
    //     options.headers.authorization = browser.bearerToken;

    //     var api = new CarePlannerApiServices();
    //     return api.makeGetRequest(options);
    // }
}



