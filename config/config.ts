import { Config, browser } from "protractor";
import { Reporter } from '../support/reporter';
import {Appconfig} from '../config/appconfig';
// var path = require('path');
// var HtmlReporter = require('protractor-beautiful-reporter');

export const config : Config ={

    seleniumAddress: 'http://localhost:4444/wd/hub',
    // Starting selenium server
    // seleniumServerJar : process.env.SELENIUM_SERVER_PATH,
    // chromeDriver : process.env.CHROME_DRIVER_PATH,
    // seleniumArgs : [],
    // seleniumPort : 4444,
    // baseUrl : " https://lapmsqa-ns04.vcaantech.com/VCAChargeCapture?hospitalId=595&patientId=314160584&orderId=471563555&userName=chandrasekhar.konda&userId=0&accessToken=yNEIp_d5k9Xlai7fCPaMMIwEa2y49ejDWM3l2JoPrPlhtAvbFe09znrrorh6ren8F-euh5fAy5rdZGAi53ai0XYEnKhKqA4ID6gEXPRDoQA4n6oUha4KwcvOOTzb8FWcuhdVuCT2qtW-jMqKQ_lli1jcjxVidxl9WI0NXXGUIM7Jd-3h3PoOzTUYZC-e4Fsj2XylAMD-doO8rFtOuprh3bI7bo7_fFmFC-XJYZZ_Vu6grYY0Y4ZTVOcSqXw7_hELReb_mA",
    baseUrl:"",
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

    specs:["../specs/**/smokeTestCases.spec.js"],

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
        console.log('************onPrepare*******************');
        //Adding Reporters to the execution
        Reporter.addBeautifulHTMLReporter();
        //Reporter.addSpecReporter();
        //Reporter.addHTMLReporter();
        // Add a screenshot reporter:

        console.log("App Config location: "+process.env.APP_CONFIG_PATH+"\\appconfig.json");
        let configvalues: Appconfig = require(process.env.APP_CONFIG_PATH+"\\appconfig.json");
        browser.jsonconfig = configvalues;
        console.log(browser.seleniumServerJar);
        browser.allScriptsTimeout=99999;
        browser.ignoreSynchronization = false;
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
        browser.baseUrl=browser.jsonconfig.applicationurl;
        // browser.get(browser.jsonconfig.applicationurl);
        // browser.manage().timeouts().implicitlyWait(50000);
        console.log("Base URL: "+browser.baseUrl);
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
