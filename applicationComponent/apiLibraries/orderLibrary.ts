import { FrameworkComponent } from '../../frameworkComponent';
import { TestBase, SpecFile, TaskOccurrence, TaskSeries, Product, Category, TaskSeriesList } from '../../applicationComponent';
import { AddingProductsModel } from '../data/model/products_model';
import { DataReader } from '../../dataComponent/dataReaderHelper';

const path = require('path');
import * as moment from 'moment';

export class OrderLibrary {

    constructor() {
        FrameworkComponent.logHelper.info("*********** Order Controller ***********")
    }

    async addOrderToVisit(specData:SpecFile, productFileName?: string, productFolderName?:string) {
        try {
            FrameworkComponent.logHelper.info("******************* Get Order To Visit ******************************");
            let __responseList = [];
            let __rootObject: AddingProductsModel.RootObject;
            let __options = DataReader.loadAPITemplates("putVisitInvoiceItems"); // require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/putVisitInvoiceItems.json'));
    
            if (productFileName == null) { 
                __rootObject = new AddingProductsModel.RootObject(); 
            } else {                
                __rootObject = new AddingProductsModel.RootObject(productFileName, productFolderName); 
            }
            
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
            let __options =  DataReader.loadAPITemplates("getTaskSeriesByOrderId"); // require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/getTaskSeriesByOrderId.json'));
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

    async getAggregatedDataByOrderId(specData:SpecFile){
        try {
            FrameworkComponent.logHelper.info("*********** Get Aggregated Details By Order ID  ***********");
            let __options = await this.getAggregatedDataByOrderIdOptions(specData);
            let __response = await FrameworkComponent.apiServiceHelper.makeApiCall(__options).then((response)=>{
                return response;
            });
            
            let __categoryList:Category[] = new Array;             
            await FrameworkComponent.apiServiceHelper.parseResultOfMakePostRequest(__response).then((response) => {
               for (let index = 0; index < response.TaskCategories.length; index++) {
                    
                    let __category = new Category();
                    __category.CategoryName   = response.TaskCategories[index].CategoryName;

                    let __taskSeries:TaskSeriesList[] =  new Array;
                    for (let i = 0; i < response.TaskCategories[index].TaskSeries.length; i++) {                       
                        __taskSeries[i] = response.TaskCategories[index].TaskSeries[i].Name;
                    }

                    __category.TaskSeriesList = __taskSeries;                        
                    __categoryList[index] = __category;
               }
            });
            specData.Data.Client.Patient.Visit.Category = __categoryList;            
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getAggregatedDataByOrderIdOptions(specData:SpecFile) {
        try {
            FrameworkComponent.logHelper.info('*********** Set Options for Aggregated DataBy Order Id ***********');
            let __options =  DataReader.loadAPITemplates("getAggregatedData");

            let startTime = moment().subtract(6, 'hours').toISOString();
            let endTime = moment().subtract(4, 'hours').toISOString();
            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + "Orders/" + specData.Data.Client.Patient.Visit.VisitId + "/AggregatedData/" + startTime + "/" + endTime;
    
            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;

            //Query string
            __options.qs.visitIds = specData.Data.Client.Patient.Visit.VisitId;
            __options.qs.startTime = startTime;
            __options.qs.endTime = endTime;
            return __options;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}



