import { Config, browser } from "protractor";
import { Reporter } from '../support/reporter';


export const config : Config ={

    seleniumAddress: 'http://localhost:4444/wd/hub',
    
    SELENIUM_PROMISE_MANAGER:false,

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {'args': ['disable-infobars']}
    },

    framework:"jasmine",
    specs:["../specs/**/*.js"],
    jasmineNodeOpts:{
        showColors:true,
        defaultTimeoutInterval: 400000,
        isVerbose: true,
    },

    onPrepare: () =>{

        Reporter.addHTMLReporter();
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);
    },

    onComplete: () => {

    }
};