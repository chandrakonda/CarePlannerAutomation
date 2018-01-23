import { FrameworkComponent } from '../frameworkComponent';
import { TestBase, GlobalValues, SpecFile } from '../applicationComponent';
import { Config, browser, protractor } from "protractor";
let path = require('path');
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';



export const config: Config = {

    // seleniumAddress: 'http://localhost:4444/wd/hub',
    // Starting selenium server
    // seleniumServerJar: "C:/Users/prabur/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.7.1.jar",
    // chromeDriver: "C:/Users/prabur/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver",
    // seleniumArgs: [],
    // seleniumPort: 4444,
    directConnect: true,
    //elementExplorer : 
    chromeDriver: path.join(__dirname, '../../frameworkComponent/support/drivers/chromedriver.exe'),
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
        "../applicationComponent/specs/multipleTaskSeries/taskObservationSample.spec.js",
        // "../specs/carePlanner/demoSpecs/testScheduleAndCancelTaskOccurrence.spec.js",
        // "../specs/carePlanner/demoSpecs/testScheduleAndSkipTaskOccurrence.spec.js",
        //"../specs/carePlanner/demoSpecs/testScheduleAndCompleteTaskOccurrence.spec - Copy.js"
        //"../applicationComponent/specs/smokeTests/sampletest.spec.js"
    ],

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 99999,
        isVerbose: true,
        includeStackTrace: true
        
    },

    allScriptsTimeOut: 99999,

    beforeLaunch: () => {
       try {
        console.log('************Before Launch Started*******************');

        FrameworkComponent.loggerConfiguration;

        console.log('************Before Launch Finished*******************');
       } catch (error) {
           console.log('Unable to configure logger ' + error);
           throw error;
       }
    },


    onPrepare: () => {
        try {
            console.log('**************On Prepare Started**************');
            let __testBase = new TestBase();

            __testBase.beforeExecution();  // set up reporters , loggers 
        
            browser.allScriptsTimeout = 99999;
            browser.ignoreSynchronization = false;
            browser.waitForAngularEnabled(false);
            browser.manage().window().maximize();
            browser.manage().timeouts().implicitlyWait(50000);

            console.log('**************On Prepare Exit**************');
        } catch (error) {
            console.log('Error in OnPrepare ' + error);
            throw error;
        }
    },

    onComplete: () => {
        try {
            FrameworkComponent.logHelper.info('*************onComplete- Place holder ******************');

            // Write data to JSON file    
            FrameworkComponent.JsonReporter();
    
            browser.driver.quit();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    },

    onCleanUp: () => {
        console.log('*************onCleanUp - Place holder ******************');
    },

    afterLaunch: () => {
        console.log('************afterLaunch - Place holder **************************');
    }
};