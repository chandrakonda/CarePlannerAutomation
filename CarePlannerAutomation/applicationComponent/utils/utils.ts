import { ReadAppConfig, TestBase } from "../../applicationComponent";
import { FrameworkComponent } from "../../frameworkComponent";

export class Utils {

    compressFolder(folderName, destinationFolderName, comparessedFileName, compressFileExtn) {
        try {
            var zipper = require("zip-local");
            zipper.sync.zip(folderName).compress().save(destinationFolderName + '/' + comparessedFileName + '.' + compressFileExtn);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    composeMailContentFromTestResult(testEnvironment) {
        try {
            let __hospitalId = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            let __serverName = TestBase.GlobalData.EnvironmentDetails.servername;
            let __applicationURL = TestBase.GlobalData.EnvironmentDetails.applicationurl;
            let __apiEndPoint = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint;
            let __userName = TestBase.GlobalData.EnvironmentDetails.username;


            let __totalTestCasesCount = 0, __passCount = 0, __failCount = 0, __errorCount = 0;
            let __totalSpecCount = TestBase.GlobalData.SpecFiles.length;
            let __startTime = TestBase.GlobalData.StartTime.toUTCString();
            let __endTime = TestBase.GlobalData.EndTime.toUTCString();
            let __timeOfExecution = (TestBase.GlobalData.EndTime.valueOf() - TestBase.GlobalData.StartTime.valueOf()) / 1000; //in secs

            TestBase.GlobalData.SpecFiles.forEach(specFile => {
                __totalTestCasesCount = __totalTestCasesCount + specFile.TestCases.length;
                specFile.TestCases.forEach(testcase => {
                    if (testcase.TestResult == "passed") {
                        __passCount = __passCount + 1;
                    } else if (testcase.TestResult == "failed") {
                        __failCount = __failCount + 1;
                    } else {
                        __errorCount = __errorCount + 1;
                    }
                });
            });

            let __fulEmailBodyContent = '<html><head><meta charset="utf-8"/><style>div { font - family: Calibri; }, table { font - family: Calibri; }, th{ border: 1px solid black; }, tr { border: 1px solid black; }</style></head><body><div style="width:100%;height:100%"><div style="height:10%;"></br></div><div style="width:50%;margin-left: 5%;border: 1px solid black"><table width="100%"><thead><tr><th colspan="6" class="text-center"><font color="blue">Test Environment Details </font></th></tr></thead><tbody><tr><td style="font-weight:bold; padding-left:5%">Test Environment</td><td>:</td><td style="padding-left:5%">' + testEnvironment + '</td></tr><tr><td style="font-weight:bold; padding-left:5%">HospitalId</td><td>:</td><td style="padding-left:5%">' + __hospitalId + '</td></tr><tr><td style="font-weight:bold; padding-left:5%">Server Name</td><td>:</td><td style="padding-left:5%">' + __serverName + '</td></tr><tr><td style="font-weight:bold; padding-left:5%">Application URL</td><td>:</td><td style="padding-left:5%">' + __applicationURL + '</td></tr><tr><td style="font-weight:bold; padding-left:5%">API EndPoint</td><td>:</td><td style="padding-left:5%">' + __apiEndPoint + '</td></tr><tr><td style="font-weight:bold; padding-left:5%">Username</td><td>:</td><td style="padding-left:5%">' + __userName + '</td></tr></tbody></table></div><div style = "height:10%;"></br></div><div style="width:50%;margin-left: 5%;border: 1px solid black;"><table width="100%"><thead><tr><th colspan="4" class="text-center"><font color="blue">Test Execution Summary</font></th></tr></thead><tbody><tr><td style="font-weight:bold; padding-left:5%">Total Number of Specs</td><td>:</td><td style="padding-left:5%">' + __totalSpecCount + '</td></tr><tr><td style="font-weight:bold; padding-left:5%">Total Number of Test Cases</td><td>:</td><td style="padding-left:5%">' + __totalTestCasesCount + '</td></tr><tr><td style="font-weight:bold; padding-left:5%"><font color="#00AA00">Pass Count</font></td><td>:</td><td style="padding-left:5%"><font color="#00AA00">' + __passCount + '</font></td></tr><tr><td style="font-weight:bold; padding-left:5%"><font color="red">FailCount</font></td><td>:</td><td style="padding-left:5%"><font color="red">' + __failCount + '</font></td></tr><tr><td style="font-weight:bold; padding-left:5%">Start Time</td><td>:</td><td style="padding-left:5%">' + __startTime + '</td></tr><tr><td style="font-weight:bold; padding-left:5%">End Time</td><td>:</td><td style="padding-left:5%">' + __endTime + '</td></tr><tr><td style="font-weight:bold; padding-left:5%">Time of Execution(in secs)</td><td>:</td><td style="padding-left:5%">' + __timeOfExecution + '</td></tr></tbody></table></div></div></body></html>';

            return { __fulEmailBodyContent, __serverName, __hospitalId, __totalTestCasesCount, __passCount, __failCount, __errorCount };
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    sendEmail(testExecutionInfo, testReportFilePath, testReportFileName) {
        try {
            //Mail COnfiguration and attaching the report
            let __mailConfig = ReadAppConfig.loadMailConfigs();
            let __mailSubjectInfo = 'Careplanner Automation Report || Environment : ' + testExecutionInfo.__serverName + ' || Hospital ID : ' + testExecutionInfo.__hospitalId + ' || Total TC : ' + testExecutionInfo.__totalTestCasesCount + ' || Pass Count : ' + testExecutionInfo.__passCount + ' || Fail Count : ' + testExecutionInfo.__failCount;
            let __mailBodyInfo = testExecutionInfo.__fulEmailBodyContent;
            FrameworkComponent.emailHelper.sendEmail(__mailConfig, __mailSubjectInfo, __mailBodyInfo, testReportFilePath, testReportFileName);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}