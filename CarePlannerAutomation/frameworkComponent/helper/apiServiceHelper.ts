import { FrameworkComponent } from '../../frameworkComponent';
var request = require('request');
const requestPromise = require('request-promise');

export class APIServiceHelper {
    constructor() { }

    parseResultOfMakePostRequest(response: any) {

        let result: any;
        let __result: Promise<any>;
        result = response;
        FrameworkComponent.logHelper.info("####Parse result of the response####");
        try {
            FrameworkComponent.logHelper.info(result);
            response = (response instanceof Object) ? response : JSON.parse(response);
            if (response.StatusCode >= 400) {
                FrameworkComponent.logHelper.info("Status code 400");
                __result = Promise.reject({ message: result });
            }
            else {
                if (result instanceof Object) {
                    if (result.Data == null) {
                        FrameworkComponent.logHelper.info("Instance of object result.data ==null");
                        __result = Promise.resolve(result.StatusCode);
                    } else {
                        FrameworkComponent.logHelper.info("Instance of object result.data is not null");
                        __result = Promise.resolve(result.Data);
                    }
                } else {
                    result = JSON.parse(result);
                    if (result.Data == null) {
                        FrameworkComponent.logHelper.info("result.data is null");
                        __result = Promise.resolve(result.StatusCode);
                    } else {
                        FrameworkComponent.logHelper.info("result.data is not null");
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
            //FrameworkComponent.logHelper.info(body);
            return body;
        }).catch(function (error) {
            throw error;
            //FrameworkComponent.logHelper.info(error);
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

