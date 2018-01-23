var fs = require('fs');
import { FrameworkComponent } from './frameworkComponent';
import {TestBase } from  './applicationcomponent'
export class JSONReporter {

    
    //Jasmine methods starts from here

    jasmineStarted(jasmine) {
        // this.jasmineTestsStarted = new Date();
        // this.logSync('//--------------------------------\n'+
        //             '//     Begin of tests Run         \n'+
        //             '//--------------------------------\n');
        // this.logSync('//Started Executing test cases @ ' + this.jasmineTestsStarted.toLocaleString());
        //this.logSync('\n//Total specs defined = ' + jasmine.totalSpecsDefined +'\n');
        FrameworkComponent.logHelper.info( jasmine.totalSpecsDefined);
        
        TestBase.GlobalData.LoadedSpecFileCount = jasmine.totalSpecsDefined;
    }

    suiteStarted(suite) {
        FrameworkComponent.logHelper.info("suiteStarted");
        //this.JSONObj[suite.description.trim()] = []
        FrameworkComponent.logHelper.info([suite.description.trim()]);
    }

    specStarted(spec) {
        FrameworkComponent.logHelper.info("specStarted");
        FrameworkComponent.logHelper.info(spec.description);
        FrameworkComponent.logHelper.info(spec.fullName);
    }

    specDone(spec) {
        FrameworkComponent.logHelper.info("specDone");
        FrameworkComponent.logHelper.info(spec.status);
        FrameworkComponent.logHelper.info(spec.failedExpectations);
        FrameworkComponent.logHelper.info(spec.passedExpectations);
    }

    suiteDone(suite) {
        FrameworkComponent.logHelper.info("suiteDone");
        //this.JSONObj[suite.description.trim()] = []
        FrameworkComponent.logHelper.info([suite.description.trim()]);
        FrameworkComponent.logHelper.info(suite.status);
    }

    jasmineDone() {
        
        FrameworkComponent.logHelper.info('Execution complete');
    }
}
