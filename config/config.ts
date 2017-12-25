
import { Config, browser, protractor } from "protractor";
let path = require('path');
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { AuthController } from '../lib/apiControllers/authController';
// Framework

import { TestBase } from '../testbase/TestBase';
import { LogHelper } from '../support/logHelper';
import { GlobalValues, SpecFile } from '../support/globalDataModel';
import { ReportHelper } from "../support/reportHelper";

//var log4js = require('log4js');
//import { ReportHelper } from '../support/reportHelper';
//import { ReadAppConfig } from "./appconfig";

export const config: Config = {


    // seleniumAddress: 'http://localhost:4444/wd/hub',
    // Starting selenium server
    // seleniumServerJar: "C:/Users/prabur/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.7.1.jar",
    // chromeDriver: "C:/Users/prabur/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver",
    // seleniumArgs: [],
    // seleniumPort: 4444,
    directConnect: true,
    //elementExplorer : 
    chromeDriver: path.join(__dirname, '../../support/drivers/chromedriver.exe'),
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
        //"../specs/carePlanner/demoSpecs/testScheduleAndCompleteTaskOccurrence.spec.js",
        // "../specs/carePlanner/demoSpecs/testScheduleAndCancelTaskOccurrence.spec.js",
        // "../specs/carePlanner/demoSpecs/testScheduleAndSkipTaskOccurrence.spec.js",
        "../specs/carePlanner/demoSpecs/testScheduleAndCompleteTaskOccurrence.spec - Copy.js"
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
        //browser.logger = LogHelper.getLogger();
        console.log('**************On Prepare Started**************');

        let __testBase = new TestBase();

        __testBase.beforeExecution();  // set up reporters , loggers 

        browser.allScriptsTimeout = 99999;
        browser.ignoreSynchronization = false;
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(50000);
        browser.baseUrl = TestBase.globalValues.EnvironmentDetails.applicationurl;

    },

    onComplete: () => {
        console.log('*************onComplete- Place holder ******************');

        // Write data to JSON file

    //    let __testBase = new TestBase();

    //     __testBase.afterExecution();  // set up reporters , loggers 
        ReportHelper.JsonReporter();
        // let __filePath = path.join(ReportHelper.FolderName,"JsonReport.json");
        // fs.writeFile(__filePath, JSON.stringify(TestBase.globalValues), (err) => {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     };
        //     console.log("File has been created");
        // });

        browser.driver.quit();

    },

    onCleanUp: () => {
        console.log('*************onCleanUp - Place holder ******************');
    },

    afterLaunch: () => {
        console.log('************afterLaunch - Place holder **************************');
    }
};