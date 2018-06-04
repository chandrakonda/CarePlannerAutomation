import { AppConfig, GlobalValues, JSONReporter, ReadAppConfig, SpecFile, Utils, APILibraries } from "../applicationComponent";
import { FrameworkComponent, ReportHelper } from "../frameworkComponent";
let path = require('path');

export class TestBase {
    public static GlobalData: GlobalValues;
    constructor() {
        // create global object for the framework
        TestBase.GlobalData = new GlobalValues();
    }

    async beforeExecution () {
        try {
            console.log("*************** Setting up the Logger ***************");
            // Set logger
            FrameworkComponent.getLogger; 

            FrameworkComponent.logHelper.info("*************** Before Execution Started ***************");
            
            
            //Adding Reporters to the execution
            FrameworkComponent.pettyHtmlReporter('Woofware3.0');

            //Loading the environment details to the global data
            TestBase.GlobalData.EnvironmentConfigDetails = ReadAppConfig.loadConfigAndGetEnvironment();
            
            //Loading the database configuration details to the global data
            TestBase.GlobalData.DatabaseConfigDetails = ReadAppConfig.loadDatabaseConfiguration();
            
            //Initiating the specfile object to the global data object
            TestBase.GlobalData.SpecFiles = new Array<SpecFile>();
          
            //Attach the JSON reporter with jasmine to get the jasmine execution information
            let __jsonreport = new JSONReporter();
            jasmine.getEnv().addReporter(__jsonreport);

            //Setup the browser configuration details
            Utils.setBrowserConfigurations();

            // Create and Set authorization token value 
            await APILibraries.woofware30.getAuthToken();     
            
            FrameworkComponent.logHelper.info('Generated Authorization token  : ' + TestBase.GlobalData.GlobalAuthToken);
                
            FrameworkComponent.logHelper.info("*************** Before Execution Finished ***************");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    afterExecution () {
        try {
            FrameworkComponent.logHelper.info("*************** After Execution Finished ***************");
            FrameworkComponent.JsonReporter(TestBase.GlobalData);

            let __configValues: AppConfig = require(path.join(__dirname, '..\\..\\..\\Woofware_3.0_Automation\\config\\appconfig.json'));

            if (__configValues.emailTestReports) {
                
                //Zip the result folder which contains html report            
                Utils.compressFolder(ReportHelper.FolderName, ReportHelper.FolderName, 'CareplannerAutomationReport', 'zip');

                //Compose Email with test execution results
                let __testExecutionInfo = Utils.composeMailContentFromTestResult(__configValues.environment);

                //Send Email with the test execution result parameters with report attached
                Utils.sendEmail(__testExecutionInfo, ReportHelper.FolderName, 'CareplannerAutomationReport.zip');
            }

            FrameworkComponent.logHelper.info("*************** After Execution Finished ***************");
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}