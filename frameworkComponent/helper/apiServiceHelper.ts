import { LogHelper } from '../../frameworkComponent';
var request = require('request');
const requestPromise = require('request-promise');

export class APIServiceHelper {
    constructor() { }

    parseResultOfMakePostRequest(response: any) {
    
        let result: any;
        let __result: Promise<any>;
        result = response;
        LogHelper.Logger.info("####Parse result of the response####");
        try {
            LogHelper.Logger.info(result);
            if (response.StatusCode >= 400) {
                LogHelper.Logger.info("Status code 400");
                __result = Promise.reject({ message: result });
            }
            else {
                if (result instanceof Object) {
                    if (result.Data == null) {
                        LogHelper.Logger.info("Instance of object result.data ==null");
                        __result = Promise.resolve(result.StatusCode);
                    } else {
                        LogHelper.Logger.info("Instance of object result.data is not null");
                        __result = Promise.resolve(result.Data);
                    }
                } else {
                    result = JSON.parse(result);
                    if (result.Data == null) {
                        LogHelper.Logger.info("result.data is null");
                        __result = Promise.resolve(result.StatusCode);
                    } else {
                        LogHelper.Logger.info("result.data is not null");
                        __result = Promise.resolve(result.Data);
                    }
                }
            }
        } catch (e) {
            throw e;
        }
        return __result;
    }

    async makeApiCall1(options) {
        //Get response in an object and return value
        let __response = await requestPromise(options).then((body) => {
            //LogHelper.Logger.info(body);
            return body;
        }).catch(function (error) {
            throw error;
            //LogHelper.Logger.info(error);
        });
        return __response;
    }

    makeApiCall(options) {
        //Get response in an object and return value
        try {
            return requestPromise(options);
        } catch (e) {
            throw e;
        }
    }
}

