import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
import { AddingProductsModel } from '../../data/model/products_model';

const path = require('path');

// Framework components 
import { LogHelper } from '../../support/logHelper';
import {SpecFile, TaskSeries, TaskOccurrence} from '../../support/globalDataModel';
import { TestBase } from '../../testbase/TestBase';

export class OrderController {

    constructor() {
        LogHelper.Logger.info("*********** Order Controller ***********")
    }

    async addOrderToVisit(token: any, specData: SpecFile, productFileName?:string ) {
        try {
            LogHelper.Logger.info("******************* Get Order To Visit ******************************");
            let __responseList = [];
            let __rootObject: AddingProductsModel.RootObject;
            let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//putVisitInvoiceItems.json'));
    
            if (productFileName == null) { __rootObject = new AddingProductsModel.RootObject(); }
            else { __rootObject = new AddingProductsModel.RootObject(productFileName); }
            let __apiServices = new CarePlannerApiServices();
            browser.visitId = browser.visitId;
            __rootObject.products.forEach(async product => {
                LogHelper.Logger.log("*************** Adding Product to Order **************");
                //Set URL
                __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + "Visits/" + browser.visitId + "/VisitInvoiceItems";
                //Set header values
                __options.headers['x-hospital-id'] =TestBase.GlobalData.EnvironmentDetails.hospitalid;
                __options.headers.authorization = token;
                __options.body = product;
                LogHelper.Logger.info("************product options **********");
                LogHelper.Logger.info(__options);
                
                let __response = await __apiServices.makeApiCall(__options);
                let __resultValue = await __apiServices.parseResultOfMakePostRequest(__response).then((result) => {
                    return result;
                })
                __responseList.push(__resultValue);
            });
    
            LogHelper.Logger.info(__responseList);
        } catch (error) {
            LogHelper.Logger.error(error);
        }
    }

// This is written to handle only one task series and occurrence. Need to look into 

    async getTaskSeriesByOrderId(token: any,specData: SpecFile) {
        try {
            let __options = await this.getTaskSeriesByOrderIdOptions(token);
            let __taskSeries = new TaskSeries();
            let __taskoccurrence = new TaskOccurrence();
            LogHelper.Logger.info(__options);
            var __apiServices = new CarePlannerApiServices();
            await __apiServices.makeApiCall(__options).then((response)=>{
                __apiServices.parseResultOfMakePostRequest(response).then((responseData) => {
                    //browser.taskOccurances = response[0].TaskOccurences;

                for (let items of browser.taskOccurances) {
                    //browser.taskSeriesId = items.TaskSeriesId;
                    __taskSeries.TaskSeriesId = items.TaskSeriesId;
                    __taskoccurrence.TaskOccurrenceId =  items.TaskOccurrenceId;
                    //browser.taskOccurrenceId = items.TaskOccurrenceId;
                    LogHelper.Logger.info("Task Series Id :'" +  __taskSeries.TaskSeriesId + "' for OrderId : '"+specData.Data.Client.Patient.Visit.VisitId + "'");
                    LogHelper.Logger.info("Task Occurance Id :'" + __taskoccurrence.TaskOccurrenceId + "' for OrderId : '" + specData.Data.Client.Patient.Visit.VisitId + "'");
                }
                });
            });

        } catch (error) {
            LogHelper.Logger.error(error);
        }       
    }

    getTaskSeriesByOrderIdOptions(token: any) {
        try {
            LogHelper.Logger.info('*********** Get Task Series By Order Id ***********');
            let __options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getTaskSeriesByOrderId.json'));
            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint  + "Orders/" + browser.visitId + "/TaskSeries";
    
            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = token;
            return __options;
        } catch (error) {
            LogHelper.Logger.error(error);
        }
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



