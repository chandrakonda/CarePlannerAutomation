import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { ReadAppConfig } from '../config/appconfig';
import { LogHelper } from '../support/logHelper';
import { ReportHelper } from '../support/reportHelper';
import { GlobalValues, SpecFile } from '../support/globalDataModel';
import { AuthController } from '../lib/apiControllers/authController';


export class TestBase {

    static globalValues : GlobalValues ;
    constructor() {

        // create global object for the framework

        TestBase.globalValues = new GlobalValues();

    }


    beforeExecution() {

        LogHelper.getLogger(); // Set logger
        //browser.logger.info('**************On Prepare Started**************');
        LogHelper.Logger.info("print this for testing");
        //Adding Reporters to the execution
        ReportHelper.pettyHtmlReporter();

        // We are filtering config options based on environment and we are taking only filtered environment details
        TestBase.globalValues.EnvironmentDetails = ReadAppConfig.LoadConfigAndGetEnvironment();
        
        TestBase.globalValues.SpecFiles = new Array<SpecFile>();
        // Set token value 
        let __authController = new AuthController();
        __authController.getAuthToken();

    }

    afterExecution() {

        // set global object as null 

        // close anything that is open

        ReportHelper.JsonReporter();
        

    }


}

