import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { FrameworkComponent } from '../frameworkComponent'
import { ReadAppConfig, GlobalValues, SpecFile, APILibraryController, TestCase } from "../applicationComponent";
import { ReportHelper } from '../frameworkComponent/helper/reportHelper';
import { Utils } from './utils/utils';

export class TestBase {

    public static GlobalData:GlobalValues;
    constructor() {
        // create global object for the framework
        TestBase.GlobalData = new GlobalValues();
    }

    beforeExecution() {
        try{
            FrameworkComponent.getLogger; // Set logger
            //browser.logger.info('**************On Prepare Started**************');
            //Adding Reporters to the execution
            FrameworkComponent.pettyHtmlReporter();
            
            // We are filtering config options based on environment and we are taking only filtered environment details
            TestBase.GlobalData.EnvironmentDetails = ReadAppConfig.LoadConfigAndGetEnvironment();
            
            TestBase.GlobalData.SpecFiles = new Array<SpecFile>();

            // Set token value 
            APILibraryController.careplannerLibrary.getAuthToken();
        } catch (error){
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

            let __utils = new Utils();
            //Zip the result folder which contains html report            
            __utils.compressFolder(ReportHelper.FolderName, ReportHelper.FolderName, 'CareplannerAutomationReport', 'war');

            //Compose Email with test execution results
            let __testExecutionInfo = __utils.composeMailContentFromTestResult();

            //Send Email with the test execution result parameters with report attached
            __utils.sendEmail(__testExecutionInfo, ReportHelper.FolderName, 'CareplannerAutomationReport.war');

        } catch (error) {
            FrameworkComponent.logHelper.error(error);           
            throw error;
        }
    }
}

