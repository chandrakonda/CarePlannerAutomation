import { APIServiceHelper } from "./apiServiceHelper";
import { EmailHelper } from "./emailHelper";
import { CustomException } from "./exceptionHelper";
import { LogHelper } from "./logHelper";
import { ReportHelper } from "./reportHelper";

export class FrameworkComponent {

    public static get apiServiceHelper(): APIServiceHelper {
        return new APIServiceHelper();
    }

    public static get emailHelper(): EmailHelper {
        return new EmailHelper();
    }

    public static get customException(): CustomException {
        return new CustomException();
    }


    public static get logHelper(): any {
        return LogHelper.Logger;
    }

    public static get getLogger(): any {
        return LogHelper.getLogger();
    }

    public static get loggerConfiguration(): any {
        return LogHelper.loggerConfiguration();
    }


    public static pettyHtmlReporter(): any {
        return ReportHelper.pettyHtmlReporter();
    }

    public static JsonReporter(): any {
        return ReportHelper.JsonReporter();
    }

}