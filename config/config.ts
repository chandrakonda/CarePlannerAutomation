import { Config, browser } from "protractor";
import { Reporter } from '../support/reporter';


export const config : Config ={

    seleniumAddress: 'http://localhost:4444/wd/hub',
    
    //SELENIUM_PROMISE_MANAGER:false,

    capabilities: {
        browserName: 'chrome',
        //chromeOptions: {'args': ['disable-infobars']}
    },
    //directConnect: true,
    framework:"jasmine",
    specs:["../specs/**/*.js"],
    jasmineNodeOpts:{
        showColors:true,
        defaultTimeoutInterval: 400000,
        isVerbose: true,
    },

    onPrepare: () =>{

        Reporter.addHTMLReporter();
        browser.ignoreSynchronization = false;
        browser.manage().window().maximize();
        console.log("Waiting for the page to load..");
        
        //browser.driver.wait()
        //browser.driver.manage().timeouts().implicitlyWait(25000);
    },

    onComplete: () => {

    }
};