import { Config, browser } from "protractor";
import { Reporter } from '../support/reporter';
import {Appconfig} from '../custom/appconfig';
// var path = require('path');
// var HtmlReporter = require('protractor-beautiful-reporter');

export const config : Config ={

    //seleniumAddress: 'http://localhost:4444/wd/hub',
    // Starting selenium server
    seleniumServerJar : "C:/Users/User/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.6.0.jar",
    chromeDriver : "C:/Users/User/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver",
    seleniumArgs : [],
    seleniumPort : 4444,
    baseUrl : "https://angular.io",

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

    specs:["../specs/**/*.js"],

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
        
        let configvalues: Appconfig = require("C://Workingdirectory//Vca//Protractor//Careplannerprabhu//protractor_jasmine_typescript//custom//appconfig.json");
        browser.jsonconfig = configvalues;

        browser.allScriptsTimeout=99999;
        browser.ignoreSynchronization = false;               
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
        // browser.manage().timeouts().implicitlyWait(50000);
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