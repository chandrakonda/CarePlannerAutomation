import { APIServiceHelper } from "./apiServiceHelper";
import { EmailHelper } from "./emailHelper";
import { CustomException } from "./exceptionHelper";

export class Helper {

    public static  get apiServiceHelper() : APIServiceHelper {
        return new APIServiceHelper();
    }

    public static get emailHelper() : EmailHelper {
        return new EmailHelper();
    }

    public static get customException() : CustomException {
        return new CustomException();
    }

}