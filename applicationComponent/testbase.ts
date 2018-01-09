import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { LogHelper, ReportHelper } from '../frameworkComponent'
import { ReadAppConfig, GlobalValues, SpecFile, APILibraryController } from "../applicationComponent";

export class TestBase {

    public static GlobalData:GlobalValues;
    constructor() {
        // create global object for the framework
        TestBase.GlobalData = new GlobalValues();

    }

    beforeExecution() {
        try{
            LogHelper.getLogger(); // Set logger
            //browser.logger.info('**************On Prepare Started**************');
            //Adding Reporters to the execution
            ReportHelper.pettyHtmlReporter();

            // We are filtering config options based on environment and we are taking only filtered environment details
            TestBase.GlobalData.EnvironmentDetails = ReadAppConfig.LoadConfigAndGetEnvironment();
            
            TestBase.GlobalData.SpecFiles = new Array<SpecFile>();
            // Set token value 
            APILibraryController.careplannerLibrary.getAuthToken();
        }catch (error){
            LogHelper.Logger.info(error);           
            throw error;
        }
    }

    afterExecution() {
        try {
            // set global object as null 
            // close anything that is open
            ReportHelper.JsonReporter();
        } catch (error) {
            LogHelper.Logger.info(error);           
            throw error;
        }
    }


}

