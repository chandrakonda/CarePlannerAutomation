var fs = require('fs');
import { FrameworkComponent } from './frameworkComponent';
import { TestBase } from './applicationcomponent'
export class JSONReporter {


    //Jasmine methods starts from here

    jasmineStarted(jasmine) {
        // this.jasmineTestsStarted = new Date();
        // this.logSync('//--------------------------------\n'+
        //             '//     Begin of tests Run         \n'+
        //             '//--------------------------------\n');
        // this.logSync('//Started Executing test cases @ ' + this.jasmineTestsStarted.toLocaleString());
        //this.logSync('\n//Total specs defined = ' + jasmine.totalSpecsDefined +'\n');
        FrameworkComponent.logHelper.info('Total number of specs loaded   : ' + jasmine.totalSpecsDefined);

        TestBase.GlobalData.LoadedSpecFileCount = jasmine.totalSpecsDefined;
    }

    suiteStarted(suite) {
        FrameworkComponent.logHelper.info("***********************Describe with name :'"+[suite.description.trim()]+"' execution started");
        //this.JSONObj[suite.description.trim()] = []
        //FrameworkComponent.logHelper.info([suite.description.trim()]);
    }

    specStarted(spec) {
        FrameworkComponent.logHelper.info("**********TestStarted: Test case execution started");
        FrameworkComponent.logHelper.info("Test Case Name '" + spec.description +"'");
    }

    specDone(spec) {

        FrameworkComponent.logHelper.info("Test case status: '" + spec.status + "'");

        if (spec.passedExpectations.length !== 0) {
            FrameworkComponent.logHelper.info(spec.passedExpectations);
        }
        else {
            for (var i = 0; i < spec.failedExpectations.length; i++) {
                FrameworkComponent.logHelper.info('Failure: ' + spec.failedExpectations[i].message);
                FrameworkComponent.logHelper.info(spec.failedExpectations[i].stack);
            }
        }
        FrameworkComponent.logHelper.info("**********TestCompleted : Test case execution completed");
    }

    suiteDone(suite) {
        FrameworkComponent.logHelper.info("***********************Describe with name : '"+[suite.description.trim()]+"' completed with status '"+suite.status+"'");
        //this.JSONObj[suite.description.trim()] = []
    }

    jasmineDone() {

        FrameworkComponent.logHelper.info('Execution complete');
    }
}
