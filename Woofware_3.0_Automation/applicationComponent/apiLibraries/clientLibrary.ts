import { browser } from "protractor";
import { TestBase } from "../../applicationComponent";
import { DataReaderController } from "../../dataComponent";
import { FrameworkComponent } from "../../frameworkComponent";

export class ClientLibrary {

    constructor() {
        FrameworkComponent.logHelper.info("*************** Client Library ***************")
    }


    async searchClientByClientName(clientName) {
        try {
            let __searchOptions = this.setOptionsForSearchClientByClientName(clientName);
            FrameworkComponent.logHelper.info("Options set to search for the client by name: ");
            FrameworkComponent.logHelper.info(__searchOptions);

            await browser.sleep(1000);

            let __apiResponse = await FrameworkComponent.apiServiceHelper.makeApiCall(__searchOptions);
            let __parsedApiResponse = await JSON.parse(__apiResponse);

            return __parsedApiResponse;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    private setOptionsForSearchClientByClientName(clientName) {
        try {
            FrameworkComponent.logHelper.info("*********** Setting Options for Search Client API Request ***********");
            
            let __options = DataReaderController.loadAPITemplates('getClientTemplate');
            __options.url = TestBase.GlobalData.EnvironmentConfigDetails.wwapiendpoint + "/client/search/" + clientName;
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;
            return __options;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getClientByDocumentId(documentId) {
        try {
            let __options = this.setOptionsForSearchClientByClientName(documentId);
            FrameworkComponent.logHelper.info("Options set to get the the client by document id: ");
            FrameworkComponent.logHelper.info(__options);

            await browser.sleep(1000);

            let __apiResponse = await FrameworkComponent.apiServiceHelper.makeApiCall(__options);
            let __parsedApiResponse = await JSON.parse(__apiResponse);
            return __parsedApiResponse;
        } catch (error) {
            
        }
    }

    private setOptionsForGetClientByDocumentId(documentId) {
        try {
            FrameworkComponent.logHelper.info("*********** Setting Options for GetClientByDocumentId API Request ***********");
            
            let __options = DataReaderController.loadAPITemplates('getClientTemplate');
            __options.url = TestBase.GlobalData.EnvironmentConfigDetails.wwapiendpoint + "/client/" + documentId;
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;
            return __options;
        } catch (error) {
            
        }
    }
}