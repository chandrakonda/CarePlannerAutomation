import { APIServiceHelper } from "./apiServiceHelper";

export class Helper {

    public static  get apiServiceHelper() : APIServiceHelper {
        return new APIServiceHelper();
    }

}