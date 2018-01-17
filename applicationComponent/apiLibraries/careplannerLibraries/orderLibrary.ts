import { FrameworkComponent } from '../../../frameworkComponent';
import { TestBase, SpecFile, TaskOccurrence, TaskSeries, Product } from '../../../applicationComponent';
import { AddingProductsModel } from '../../data/model/products_model';

const path = require('path');

export class OrderLibrary {

    constructor() {
        FrameworkComponent.logHelper.info("*********** Order Controller ***********")
    }

    async addOrderToVisit(specData:SpecFile, productFileName?: string) {
        try {
            FrameworkComponent.logHelper.info("******************* Get Order To Visit ******************************");
            let __responseList = [];
            let __rootObject: AddingProductsModel.RootObject;
            let __options = require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/putVisitInvoiceItems.json'));
    
            if (productFileName == null) { __rootObject = new AddingProductsModel.RootObject(); }
            else { __rootObject = new AddingProductsModel.RootObject(productFileName); }
            
            __rootObject.products.forEach(async product => {
                FrameworkComponent.logHelper.log("*************** Adding Product to Order **************");
                //Set URL
                __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + "Visits/" + specData.Data.Client.Patient.Visit.VisitId + "/VisitInvoiceItems";
                //Set header values
                __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
                __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;

                __options.body = product
                FrameworkComponent.logHelper.info("************product options **********")
                FrameworkComponent.logHelper.info(__options);
                FrameworkComponent.logHelper.info("************product options **********")
                let __response = await FrameworkComponent.apiServiceHelper.makeApiCall(__options);
                let __resultValue = await FrameworkComponent.apiServiceHelper.parseResultOfMakePostRequest(__response).then((result) => {
                    return result;
                });
                __responseList.push(__resultValue);

                let __product:Product = new Product();
                __product.Code = product.Code;
                __product.InvoiceItemId = product.InvoiceItemId;
                __product.InvoiceItemTypeId = product.InvoiceItemTypeId;
                __product.PLNo = product.PLNo;
                __product.SeqNo = product.SeqNo;                
                
                specData.Data.Client.Patient.Visit.Product = __product;

                FrameworkComponent.logHelper.info(specData.Data.Client.Patient.Visit.Product);
            });
    
            FrameworkComponent.logHelper.info(__responseList);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }


    async getTaskSeriesByOrderId(specData:SpecFile) {
        try {
            FrameworkComponent.logHelper.info("*********** Get Task Series Details of Patient By Order ID  ***********");
            let __options = await this.getTaskSeriesByOrderIdOptions(specData);
            FrameworkComponent.logHelper.info(__options);
            
            let __response = await FrameworkComponent.apiServiceHelper.makeApiCall(__options).then((response)=>{
                return response;
            });
            
            await FrameworkComponent.apiServiceHelper.parseResultOfMakePostRequest(__response).then((response) => {
                let __taskSeries:TaskSeries = new TaskSeries();
                let __taskOccurrences:TaskOccurrence = new TaskOccurrence();
                
                for (let items of response[0].TaskOccurences) {                                        
                    
                    __taskSeries.TaskSeriesId = items.TaskSeriesId;
                    __taskOccurrences.TaskOccurrenceId =  items.TaskOccurrenceId;    
                    
                    FrameworkComponent.logHelper.info("Task Series Id :'" + __taskSeries.TaskSeriesId + "' for OrderId : '" + specData.Data.Client.Patient.Visit.VisitId + "'");
                    FrameworkComponent.logHelper.info("Task Occurance Id :'" + __taskOccurrences.TaskOccurrenceId + "' for OrderId : '" + specData.Data.Client.Patient.Visit.VisitId+ "'");
                }
                specData.Data.Client.Patient.Visit.Product.TaskSeries[0] = __taskSeries;
                specData.Data.Client.Patient.Visit.Product.TaskSeries[0].TaskOccurrence.push(__taskOccurrences);
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
        }       
    }

    getTaskSeriesByOrderIdOptions(specData:SpecFile) {
        try {
            FrameworkComponent.logHelper.info('*********** Get Task Series By Order Id ***********');
            let __options = require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/getTaskSeriesByOrderId.json'));
            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + "Orders/" + specData.Data.Client.Patient.Visit.VisitId + "/TaskSeries";
    
            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;
            return __options;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}



