import { LogHelper } from '../support/logHelper';
import { Config, browser, protractor } from "protractor";
import { ReportHelper } from '../support/reportHelper';
import { ReadAppConfig } from "./appconfig";
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { AuthController } from '../lib/apiControllers/authController';

let path = require('path');
var log4js = require('log4js');

export const config: Config = {

    
   // seleniumAddress: 'http://localhost:4444/wd/hub',
    // Starting selenium server
    // seleniumServerJar: "C:/Users/prabur/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.7.1.jar",
    // chromeDriver: "C:/Users/prabur/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver",
    // seleniumArgs: [],
    // seleniumPort: 4444,
    directConnect:true,
    //elementExplorer : 
    chromeDriver: path.join(__dirname,'../../support/drivers/chromedriver.exe'),
    // SELENIUM_PROMISE_MANAGER:false,

    capabilities: {
        browserName: 'chrome',
        loggingPrefs: {
            'driver': 'WARNING',
            'server': 'WARNING',
            'browser': 'INFO'
        },
        
        chromeOptions: {
            'args': ['disable-infobars']
        }
    },
    //highlightDelay : 1000,
    framework: "jasmine",

    specs: [
        //"../specs/carePlanner/testScheduleSingleTaskSingleOccurrence.spec.js",
          "../specs/carePlanner/logtest.spec.js"
    ],

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 99999,
        isVerbose: true,
        includeStackTrace: true
    },

    allScriptsTimeOut: 99999,
    
    beforeLaunch: () => {
        console.log('************Before Launch Started*******************');

        LogHelper.loggerConfiguration();

        console.log('************Before Launch Finished*******************');
    },


    onPrepare: () => {
        browser.logger = LogHelper.getLogger();
        browser.logger.info('**************On Prepare Started**************');
        
        //Adding Reporters to the execution
        ReportHelper.pettyHtmlReporter();
        
        // we are filtering config options based on environment and we are taking only filtered environment details
        let appenvdetails: ReadAppConfig.EnvironmentDetails = ReadAppConfig.LoadConfigAndGetEnvironment();
        browser.appenvdetails = appenvdetails;
        browser.allScriptsTimeout = 99999;
        browser.ignoreSynchronization = false;
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(50000);
        browser.baseUrl = browser.appenvdetails.applicationurl;
        let __authController = new AuthController();
        __authController.getAuthToken1();

    },

    onComplete: () => {
        console.log('*************onComplete- Place holder ******************');
       browser.driver.quit();
    },

    onCleanUp: () => {
        console.log('*************onCleanUp - Place holder ******************');
    },

    afterLaunch: () => {
        console.log('************afterLaunch - Place holder **************************');
    }
};