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
                fileNameSeparator: '_',
                fileNameDateSuffix: true,
                consolidateAll: true,
                displayStacktrace: true,
                screenshotsFolder: 'images',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                fixedScreenshotName: false,
                showPassed:true,
                fileName:"Protractor-Jasmine Report Title",

            }));
        } catch (err) {
            if (err) {
                throw new Error("Failed to save jasmine report as test results to html file.");
            }
        }
    }
}