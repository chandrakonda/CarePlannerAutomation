import { Config } from "protractor";
import { TestBase } from "../applicationComponent";
import { FrameworkComponent } from "../frameworkComponent";
let path = require('path');
var q = require('q');
let __testBase: TestBase;

export const config: Config = {

    directConnect: true,

    chromeDriver: path.join(__dirname, '..\\..\\..\\frameworkComponent/support/drivers/chromedriver.exe'),

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

    framework: "jasmine2",

    specs: [
        "../applicationComponent/specs/sampleScenario/sampleScenario.spec.js"
    ],

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 99999,
        isVerbose: true,
        includeStackTrace: true
    },

    allScriptsTimeOut: 99999,

    onPrepare: async () => {
        try {
            console.log('*************** On Prepare Started ***************');

            //Invoking Before Execution method from testbase to configure browser details, initiate the reporters, loggers & generate the authorization token for the application
            __testBase = new TestBase();
            await __testBase.beforeExecution();

            console.log('*************** On Prepare Finished ***************');

        } catch (error) {
            console.log('Error occurred in on prepare section : ' + error);
            throw error;
        }
    },

    onComplete: () => {
        try {
            console.log('*************** On Complete Started ***************');

            // browser.driver.quit();

            return q.fcall(function () {
                __testBase.afterExecution();

                console.log('*************** On Complete Finished ***************');

            }).delay(10000);

        } catch (error) {
            console.log('Error occurred in on complete section : ' + error);
            throw error;
        }
    },

    onCleanUp: () => {
        try {
            console.log('*************** On Cleanup Started ***************');

            console.log('*************** On Cleanup Finished ***************');
        } catch (error) {
            console.log('Error occurred in on cleanup section : ' + error);
            throw error;
        }
    },

    beforeLaunch: () => {
        try {
            console.log('*************** Before Launch Started ***************');

            FrameworkComponent.loggerConfiguration('Woofware3.0');

            console.log('*************** Before Launch Finished ***************');
        } catch (error) {
            console.log('Unable to configure the logger');
            console.log('Error occurred in before launch section : ' + error);
            throw error;
        }
    },

    afterLaunch: () => {
       try {
            console.log('*************** After Launch Started ***************');

            console.log('*************** After Launch Finished ***************');
       } catch (error) {
            console.log('Error occurred in after launch section : ' + error);
            throw error;
       }
    }



}