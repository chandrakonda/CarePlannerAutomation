import { Config, browser } from "protractor";
import { TestBase } from '../applicationComponent';
import { JSONReporter } from '../customReport';
import { FrameworkComponent } from '../frameworkComponent';
let path = require('path');
var q = require('q');
let __testBase: TestBase;

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
    framework: "jasmine2",

    specs: [

        // "../applicationComponent/specs/databaseScenarios/databaseScenarios.spec.js",

        // "../applicationComponent/specs/singleTaskSeriesMultipleOccurrence/scenario1_CompleteOccurrence.spec.js",
        // "../applicationComponent/specs/singleTaskSeriesMultipleOccurrence/scenario2_SkipOccurrence.spec.js",
        // "../applicationComponent/specs/singleTaskSeriesMultipleOccurrence/scenario3_CancelOccurrence.spec.js",

        "../applicationComponent/specs/singleTaskSeriesSingleOccurrence/scenario1_CompleteOccurrence.spec.js",
        // "../applicationComponent/specs/singleTaskSeriesSingleOccurrence/scenario2_SkipOccurrence.spec.js",
        // "../applicationComponent/specs/singleTaskSeriesSingleOccurrence/scenario3_CancelOccurrence.spec.js",
        // "../applicationComponent/specs/singleTaskSeriesSingleOccurrence/scenario4_ReScheduleOccurrence.spec.js",

        // "../applicationComponent/specs/multipleTaskSeries/scenario1_CompleteOccurrences.spec.js",
        // "../applicationComponent/specs/multipleTaskSeries/scenario2_SkipOccurrences.spec.js",

        // "../applicationComponent/specs/whiteboardScenarios/scenario1_NonScheduledTaskCount.spec.js",
        // "../applicationComponent/specs/whiteboardScenarios/scenario2_OverdueCount.spec.js",
        // "../applicationComponent/specs/whiteboardScenarios/scenario3_OccurrenceCountAndStatus.spec.js",
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
            __testBase = new TestBase();
            __testBase.beforeExecution();  // set up reporters , loggers 

            browser.allScriptsTimeout = 99999;
            browser.ignoreSynchronization = false;
            browser.waitForAngularEnabled(false);
            browser.manage().window().maximize();
            browser.manage().timeouts().implicitlyWait(50000);

            let __jsonreport = new JSONReporter();
            jasmine.getEnv().addReporter(__jsonreport);

            console.log('**************On Prepare Exit**************');
        } catch (error) {
            console.log('Error in OnPrepare ' + error);
            throw error;
        }
    },

    onComplete: () => {
        try {
            FrameworkComponent.logHelper.info('*************onComplete- Place holder ******************');

            browser.driver.quit();

            return q.fcall(function () {
                __testBase.afterExecution();
            }).delay(10000);

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