import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
import * as reporter from "protractor-jasmine2-html-reporter";

const htmlReportsPath = path.join(process.cwd(), "/reports/html");

export class Reporter{
    public static createDirectory(dir: string) {
        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
    }

    public static addHTMLReporter() {
        try {
            this.createDirectory(htmlReportsPath),
            jasmine.getEnv().addReporter(new reporter({
                savePath: htmlReportsPath,
                cleanDestination: false,

                screenshotsFolder: 'images',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: false,
                fixedScreenshotName: false,

                fileName:"Automation Report",
                fileNamePrefix:"VCA",
                fileNameSeparator: '_',
                fileNameSuffix:'',
                fileNameDateSuffix: true,

                showPassed: true,
                consolidateAll: true,
                displayStacktrace: true

            }));
        } catch (err) {
            if (err) {
                throw new Error("Failed to save jasmine report as test results to html file.");
            }
        }
    }
}