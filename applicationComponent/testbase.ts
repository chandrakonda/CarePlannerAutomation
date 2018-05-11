import { APILibraryController, GlobalValues, ReadAppConfig, SpecFile } from "../applicationComponent";
import { FrameworkComponent } from '../frameworkComponent';
import { ReportHelper } from '../frameworkComponent/helper/reportHelper';
import { Utils } from './utils/utils';
let path = require('path');

export class TestBase {

    public static GlobalData: GlobalValues;
    constructor() {
        // create global object for the framework
        TestBase.GlobalData = new GlobalValues();
    }

    beforeExecution() {
        try {
            FrameworkComponent.getLogger; // Set logger
            //browser.logger.info('**************On Prepare Started**************');
            //Adding Reporters to the execution
            FrameworkComponent.pettyHtmlReporter();

            // We are filtering config options based on environment and we are taking only filtered environment details
            TestBase.GlobalData.EnvironmentDetails = ReadAppConfig.LoadConfigAndGetEnvironment();

            TestBase.GlobalData.SpecFiles = new Array<SpecFile>();

            // Set token value 
            APILibraryController.careplannerLibrary.getAuthToken();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    afterExecution() {
        try {
            // set global object as null 
            // close anything that is open
            // Write data to JSON file    
            FrameworkComponent.JsonReporter();

            let __configValues: ReadAppConfig.AppConfig = require(path.join(__dirname, '..\\..\\config\\appconfig.json'));

            if (__configValues.emailTestReports) {
                let __utils = new Utils();
                //Zip the result folder which contains html report            
                __utils.compressFolder(ReportHelper.FolderName, ReportHelper.FolderName, 'CareplannerAutomationReport', 'zip');

                //Compose Email with test execution results
                let __testExecutionInfo = __utils.composeMailContentFromTestResult(__configValues.environment);

                //Send Email with the test execution result parameters with report attached
                __utils.sendEmail(__testExecutionInfo, ReportHelper.FolderName, 'CareplannerAutomationReport.zip');
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}

