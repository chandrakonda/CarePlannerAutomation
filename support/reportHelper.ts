import * as reporter from "protractor-jasmine2-html-reporter";
import {DisplayProcessor, SpecReporter} from "jasmine-spec-reporter";
import SuiteInfo = jasmine.SuiteInfo;
var HtmlReporter = require('protractor-beautiful-reporter');


class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `TypeScript ${log}`;
    }
}

export class ReportHelper{

    public static addSpecReporter() {
        try {           
            //jasmine.getEnv().clearReporters();
            jasmine.getEnv().addReporter(new SpecReporter({
                customProcessors: [CustomProcessor],

            }));
        } catch (error) {
            
        }
    }

    public static addBeautifulHTMLReporter(){
        let __path = require('path');
        try {
            // Add a screenshot reporter:
            jasmine.getEnv().addReporter(new HtmlReporter({
            preserveDirectory: true,
            baseDirectory: 'reports',
            screenshotsSubfolder: 'screenshots',
            jsonsSubfolder: 'jsons',
            takeScreenShotsOnlyForFailedSpecs: true,
            pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                // Return '<30-12-2016>/<browser>/<specname>' as path for screenshots:
                // Example: '30-12-2016/firefox/list-should work'.
                var currentDate = new Date(),
                    day = currentDate.getDate(),
                    month = currentDate.getMonth() + 1,
                    year = currentDate.getFullYear(),
                    hours = currentDate.getUTCHours(),
                    min = currentDate.getUTCMinutes()/*,
                    sec = currentDate.getUTCSeconds()*/;

                var validDescriptions = descriptions.map(function (description) {
                    return description.replace('/', '@');
                });

                return __path.join(
                    day + "-" + month + "-" + year + hours + min /*+ sec*/,
                    // capabilities.get('browserName'),
                    validDescriptions.join('-'));
            }
        }).getJasmine2Reporter());
        } catch (error) {
            
        }
    }
 


}
