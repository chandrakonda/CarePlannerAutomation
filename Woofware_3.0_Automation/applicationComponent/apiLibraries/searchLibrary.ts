import { browser } from "protractor";
import { TestBase } from "../../applicationComponent";
import { DataReaderController } from "../../dataComponent";
import { FrameworkComponent } from "../../frameworkComponent";

export class SearchLibrary {

    constructor() {
        FrameworkComponent.logHelper.info("*************** Search Client Library ***************")
    }


    async searchByClientName(clientName) {
        try {
            let __searchOptions = this.setOptionsForSearchByClient(clientName);
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

    setOptionsForSearchByClient(clientName) {
        try {
            FrameworkComponent.logHelper.info("*********** Setting Options for Search Client API Request ***********");
            
            let __options = DataReaderController.loadAPITemplates('searchClient');
            __options.url = TestBase.GlobalData.EnvironmentConfigDetails.wwapiendpoint + "/client/search/" + clientName;
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;
            return __options;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}