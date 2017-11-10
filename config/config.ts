import { Config, browser, protractor } from "protractor";
import { Reporter } from '../support/reporter';
import { ReadAppConfig } from "./appconfig";

let path = require('path');
export const config: Config = {

    
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // Starting selenium server
    // seleniumServerJar: "C:/Users/prabur/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.7.1.jar",
    // chromeDriver: "C:/Users/prabur/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver",
    // seleniumArgs: [],
    // seleniumPort: 4444,

    //elementExplorer : 

    // SELENIUM_PROMISE_MANAGER:false,

    capabilities: {
        browserName: 'chrome',
        loggingPrefs: {
            'driver': 'WARNING',
            'server': 'WARNING',
            'browser': 'INFO'
        },
        //directConnect:true,
        chromeOptions: {
            'args': ['disable-infobars']
        }
    },

    framework: "jasmine",

    specs: ["../specs/carePlanner/testPetDetails.spec.js"],

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 400000,
        isVerbose: true,
        includeStackTrace: true
    },

    allScriptsTimeOut: 99999,

    beforeLaunch: () => {
        console.log('************beforeLaunch*******************');
        // var path = require('path');

    },



    onPrepare: () => {
        //Adding Reporters to the execution
        //Reporter.addBeautifulHTMLReporter();
        // we are filtering config options based on environment and we are taking only filtered environment details
        let appenvdetails: ReadAppConfig.EnvironmentDetails = ReadAppConfig.LoadConfigAndGetEnvironment();
        browser.appenvdetails = appenvdetails;
        browser.allScriptsTimeout = 99999;
        browser.ignoreSynchronization = false;
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(50000);
        browser.baseUrl = browser.appenvdetails.applicationurl;

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