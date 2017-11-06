import { Config, browser,protractor } from "protractor";
import { Reporter } from '../support/reporter';
import {Appconfig} from '../config/appconfig';
// var path = require('path');
// var HtmlReporter = require('protractor-beautiful-reporter');

export const config : Config ={

    seleniumAddress: 'http://localhost:4444/wd/hub',
    // Starting selenium server
    // seleniumServerJar : "C:/Users/User/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.6.0.jar",
    // chromeDriver : "C:/Users/User/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver",
    // seleniumArgs : [],
    // seleniumPort : 4444,
    baseUrl : "",

    //elementExplorer : 
    
    // SELENIUM_PROMISE_MANAGER:false,

    capabilities: {
        browserName: 'chrome',
        loggingPrefs:{
            'driver':'WARNING',
            'server':'WARNING',
            'browser':'INFO'
        },        
        //directConnect:true,
        chromeOptions: {
            'args': ['disable-infobars']
        }
    },
    
    framework:"jasmine",

    specs:["../specs/test_PatientHeader.spec.js"],

    jasmineNodeOpts:{
        showColors:true,
        defaultTimeoutInterval: 400000,
        isVerbose: true,
        includeStackTrace:true
    },

    allScriptsTimeOut:99999,

    beforeLaunch: () => {
        console.log('************beforeLaunch*******************');
    },

    

    onPrepare: () =>{
        //Adding Reporters to the execution
        Reporter.addBeautifulHTMLReporter();
        
        let configvalues: Appconfig = require(process.env.APP_CONFIG_PATH+"\\appconfig.json");
        browser.jsonconfig = configvalues;
        
        browser.allScriptsTimeout=99999;
        browser.ignoreSynchronization = false;               
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
        // browser.hospitalId=browser.jsonconfig.hospitalId;
        browser.baseUrl=browser.jsonconfig.applicationurl;

    },

    onComplete: () => {
        console.log('*************onComplete******************');
    },

    onCleanUp: () => {
        console.log('*************onCleanUp******************');
    },

    afterLaunch: () => {
        console.log('************afterLaunch**************************');
    }
};