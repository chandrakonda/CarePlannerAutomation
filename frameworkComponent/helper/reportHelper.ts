import * as fs from 'fs';
import { DisplayProcessor, SpecReporter } from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;
import * as path from 'path';
import { Utilities } from '../support/utilities';
import { TestBase } from '../../applicationComponent';

let PrettyReporter = require('protractor-pretty-html-reporter').Reporter;

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `TypeScript ${log}`;
    }
}

export class ReportHelper{

   static FolderName : string;
   static FileName : string;
    public static addSpecReporter() {
        try {           
            //jasmine.getEnv().clearReporters();
            jasmine.getEnv().addReporter(new SpecReporter({
                customProcessors: [CustomProcessor],

            }));
        } catch (error) {
            
        }
    }

    public static  pettyHtmlReporter()
    {
        let currentDate = new Date(),
        day = currentDate.getDate(),
        month = currentDate.getMonth() + 1,
        year = currentDate.getFullYear(),
        hours = currentDate.getUTCHours(),
        min = currentDate.getUTCMinutes(),
        sec = currentDate.getUTCSeconds()
        let __resultsFolderName = "Results"+ day + "-" + month + "-" + year + hours + min + sec;
        ReportHelper.FolderName = path.join(__dirname,'../../../results/'+day + "-" + month + "-" + year,__resultsFolderName);
        Utilities.createDirectory(ReportHelper.FolderName);
        ReportHelper.FileName = "JsonResult"+ day + "-" + month + "-" + year + hours + min + sec;
        // Utilities.createDirectory(__folderName);
        var prettyReporter = new PrettyReporter({
            // required, there is no default
            path: ReportHelper.FolderName, //__path.join(__dirname, __folderName),
            screenshotOnPassed: false,
            showBrowser : true,


        });
        jasmine.getEnv().addReporter(prettyReporter);
    }

    public static JsonReporter(){
        let __filePath = path.join(ReportHelper.FolderName,"JsonReport.json");
       // FrameworkComponent.logHelper.info(TestBase.globalValues);
        fs.writeFile(__filePath, JSON.stringify(TestBase.GlobalData), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });

    }
}