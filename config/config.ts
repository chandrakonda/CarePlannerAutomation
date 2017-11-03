import { Config, browser,protractor } from "protractor";
import { Reporter } from '../support/reporter';
import {Appconfig} from '../config/appconfig';
// var path = require('path');
// var HtmlReporter = require('protractor-beautiful-reporter');

export const config : Config ={

    //seleniumAddress: 'http://localhost:4444/wd/hub',
    // Starting selenium server
    seleniumServerJar : "C:/Users/User/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.6.0.jar",
    chromeDriver : "C:/Users/User/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver",
    seleniumArgs : [],
    seleniumPort : 4444,
    //baseUrl : "",

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

    specs:["../specs/apiTestCasesCall.spec.js"],

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
        //Reporter.addSpecReporter();
        //Reporter.addHTMLReporter();
        // Add a screenshot reporter:
        
        let configvalues: Appconfig = require("C:/Workingdirectory/Vca/Protractor/Careplannernew/protractor_jasmine_typescript/config/appconfig.json");
        browser.jsonconfig = configvalues;
        
        browser.allScriptsTimeout=99999;
        browser.ignoreSynchronization = false;               
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
        // browser.get("https://lapmsqa-ns04.vcaantech.com/VCAChargeCapture/?hospitalId=595&patientId=314160584&orderId=471563555&userName=chandrasekhar.konda&userId=0&accessToken=4lQaJ0jw-5BpFThL4IcAVVCemF3AShcDIFBsCtQqj7mw2a-makDIqfB7L2KPjkjBLKo2LHN4xejg025ag8AxCiE_rG1qq_d0x0rrIwcQaYOeKqd0w2o3-X77p09EOHpUJ_G60WHj86-MpS2QJwGXniVWlFKLeLh4jbUFQBFStdy7FNT74SnwFTCuHMq3_KtOvGYp3XfDh8X3C61lpEejcvgpSpGeI4heDhGjO4GgPbBASIClXkx_s8iCx8h-bqWA3a3MxQ");
        browser.manage().timeouts().implicitlyWait(50000);
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