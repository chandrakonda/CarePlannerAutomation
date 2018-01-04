import * as reporter from "protractor-jasmine2-html-reporter";
import {DisplayProcessor, SpecReporter} from "jasmine-spec-reporter";
import SuiteInfo = jasmine.SuiteInfo;
import { Utilities } from "./utils";
import * as fs from 'fs';
import { TestBase } from "../testbase/TestBase";
import { LogHelper } from "./logHelper";
let __path = require('path');
//var HtmlReporter = require('protractor-beautiful-reporter');

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
        ReportHelper.FolderName = __path.join(__dirname,'../../results/'+day + "-" + month + "-" + year,__resultsFolderName);
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
        let __filePath = __path.join(ReportHelper.FolderName,"JsonReport.json");
       // LogHelper.Logger.info(TestBase.GlobalData);
        fs.writeFile(__filePath, JSON.stringify(TestBase.GlobalData), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });

    }



 


}
