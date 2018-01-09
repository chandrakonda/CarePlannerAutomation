import { Helper, LogHelper } from '../../../frameworkComponent';
import { TestBase, SpecFile, TaskOccurrence, TaskSeries } from '../../../applicationComponent';
const path = require('path');

export class VisitLibrary {

    constructor() {
        LogHelper.Logger.info("*********** Visit Controller ***********")
    }

    async getVisitDetailsByVisitId(specData:SpecFile) {
        try {
            LogHelper.Logger.info("*********** Get Visit Details By Patient Visit ID  ***********");
            let __options = await this.getVisitDetailsByVisitIdOptions(specData);
            LogHelper.Logger.info(__options);
            
            let __response = await Helper.apiServiceHelper.makeApiCall(__options).then((response) => {
                LogHelper.Logger.info(response);
                return response;
            });
            
            let __visitDetails = await Helper.apiServiceHelper.parseResultOfMakePostRequest(__response).then((response) => {
                LogHelper.Logger.info(response);
                specData.Data.Client.Patient.Visit.VisitInvoiceItem = response[0].VisitInvoiceItems;
    
                for (let items of specData.Data.Client.Patient.Visit.VisitInvoiceItem) {
                    LogHelper.Logger.info("Visit Invoice Details :" + JSON.stringify(items));
                    LogHelper.Logger.info("Visit Invoice Details [Visit Invoice Item Id]" + items.visitinvoiceitemid);
                    LogHelper.Logger.info("Visit Invoice Details [Invoice Item Id]" + items.invoiceitemid);
                }
            });
        } catch (error) {
            LogHelper.Logger.error(error);
            throw error;
        }        
    }

    getVisitDetailsByVisitIdOptions(specData:SpecFile) {
        try {
            LogHelper.Logger.info('*********** Gettting Visit Details and Invoice Items by Visit Id ***********');
            
            let __options = require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/getOrders.json'));
    
            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'Orders';
    
            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;
    
            //Add visit Id to query
            __options.qs.visitIds = specData.Data.Client.Patient.Visit.VisitId;
            return __options;
        } catch (error) {
            LogHelper.Logger.error(error);
            throw error;
        }        
    }


    async getVisitResources(specData:SpecFile) {
        try {
            LogHelper.Logger.info("*********** Get Resources of the visit Details ***********");
            let __options = this.getVisitResourcesOptions(specData);
            LogHelper.Logger.info(__options);
            
            let __response = await Helper.apiServiceHelper.makeApiCall(__options).then((response) => {
                return response;
            });
            let __visitDetails = await Helper.apiServiceHelper.parseResultOfMakePostRequest(__response).then((response) => {
                specData.Data.Client.Patient.Visit.VisitInvoiceItem = response[0].VisitInvoiceItems;
    
                for (let i in response) {
                    // browser.logger(response[i]);
                    let user = response[i];
                    if (user['ADusername'] == TestBase.GlobalData.EnvironmentDetails.username) {
                        LogHelper.Logger.info('UserId: ', user['ResourceId']);
                        specData.UserId = user['ResourceId'];
                    }
                }
            });
        } catch (error) {
            LogHelper.Logger.error(error);
            throw error;
        }        
    }

    getVisitResourcesOptions(specData:SpecFile){
        try {
            LogHelper.Logger.info('**************************** Getting User Details *************************************');
            let __options = require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/getVisitResources.json'));
    
            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'VisitResources';
    
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