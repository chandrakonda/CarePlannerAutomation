import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { ReadAppConfig } from '../config/appconfig';
import { LogHelper } from '../support/logHelper';
import { ReportHelper } from '../support/reportHelper';
import { GlobalValues, SpecFile } from '../support/globalDataModel';
import { AuthController } from '../lib/apiControllers/authController';


export class TestBase {

    public static GlobalData;
    constructor() {

        // create global object for the framework
        TestBase.GlobalData = new GlobalValues();

    }

    beforeExecution() {
        try{
        LogHelper.getLogger(); // Set logger
        //browser.logger.info('**************On Prepare Started**************');
       // LogHelper.Logger.info("print this for testing");
        //Adding Reporters to the execution
        ReportHelper.pettyHtmlReporter();

        // We are filtering config options based on environment and we are taking only filtered environment details
        TestBase.GlobalData.EnvironmentDetails = ReadAppConfig.LoadConfigAndGetEnvironment();
        
        TestBase.GlobalData.SpecFiles = new Array<SpecFile>();
        //LogHelper.Logger.info(TestBase.GlobalData.ApiDefaultValues);
        // Set token value 
        let __authController = new AuthController();
        __authController.getAuthToken();
        }catch (error)
        {
           LogHelper.Logger.info(error);           
            throw error;
        }

    }

    afterExecution() {

        // set global object as null 

        // close anything that is open

        ReportHelper.JsonReporter();
        

    }


}

