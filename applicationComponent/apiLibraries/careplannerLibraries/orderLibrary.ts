import { Helper, LogHelper } from '../../../frameworkComponent';
import { TestBase, SpecFile, TaskOccurrence, TaskSeries } from '../../../applicationComponent';
import { AddingProductsModel } from '../../data/model/products_model';

const path = require('path');

export class OrderLibrary {

    constructor() {
        LogHelper.Logger.info("*********** Order Controller ***********")
    }

    async addOrderToVisit(specData:SpecFile, productFileName?: string) {
        try {
            LogHelper.Logger.info("******************* Get Order To Visit ******************************");
            let __responseList = [];
            let __rootObject: AddingProductsModel.RootObject;
            let __options = require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/putVisitInvoiceItems.json'));
    
            if (productFileName == null) { __rootObject = new AddingProductsModel.RootObject(); }
            else { __rootObject = new AddingProductsModel.RootObject(productFileName); }
            
            __rootObject.products.forEach(async product => {
                LogHelper.Logger.log("*************** Adding Product to Order **************");
                //Set URL
                __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + "Visits/" + specData.Data.Client.Patient.Visit.VisitId + "/VisitInvoiceItems";
                //Set header values
                __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
                __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;

                __options.body = product
                LogHelper.Logger.info("************product options **********")
                LogHelper.Logger.info(__options);
                LogHelper.Logger.info("************product options **********")
                let __response = await Helper.apiServiceHelper.makeApiCall(__options);
                let __resultValue = await Helper.apiServiceHelper.parseResultOfMakePostRequest(__response).then((result) => {
                    return result;
                });
                __responseList.push(__resultValue);
            });
    
            LogHelper.Logger.info(__responseList);
        } catch (error) {
            LogHelper.Logger.error(error);
            throw error;
        }
    }


    async getTaskSeriesByOrderId(specData:SpecFile) {
        try {
            LogHelper.Logger.info("*********** Get Task Series Details of Patient By Order ID  ***********");
            let __options = await this.getTaskSeriesByOrderIdOptions(specData);
            LogHelper.Logger.info(__options);
            
            let __response = await Helper.apiServiceHelper.makeApiCall(__options).then((response)=>{
                return response;
            });
            
            await Helper.apiServiceHelper.parseResultOfMakePostRequest(__response).then((response) => {
                let __taskSeries:TaskSeries = new TaskSeries();
                let __taskOccurrences:TaskOccurrence = new TaskOccurrence();
                
                for (let items of response[0].TaskOccurences) {                                        
                    
                    __taskSeries.TaskSeriesId = items.TaskSeriesId;
                    __taskOccurrences.TaskOccurrenceId =  items.TaskOccurrenceId;    
                    
                    LogHelper.Logger.info("Task Series Id :'" + __taskSeries.TaskSeriesId + "' for OrderId : '" + specData.Data.Client.Patient.Visit.VisitId + "'");
                    LogHelper.Logger.info("Task Occurance Id :'" + __taskOccurrences.TaskOccurrenceId + "' for OrderId : '" + specData.Data.Client.Patient.Visit.VisitId+ "'");
                }
                specData.Data.Client.Patient.Visit.Product.TaskSeries.fill(__taskSeries);
                specData.Data.Client.Patient.Visit.Product.TaskSeries[0].TaskOccurrence.fill(__taskOccurrences);
            });
        } catch (error) {
            LogHelper.Logger.error(error);
        }       
    }

    getTaskSeriesByOrderIdOptions(specData:SpecFile) {
        try {
            LogHelper.Logger.info('*********** Get Task Series By Order Id ***********');
            let __options = require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/getTaskSeriesByOrderId.json'));
            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + "Orders/" + specData.Data.Client.Patient.Visit.VisitId + "/TaskSeries";
    
            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;
            return __options;
        } catch (error) {
            LogHelper.Logger.error(error);
            throw error;
        }
    }
}



