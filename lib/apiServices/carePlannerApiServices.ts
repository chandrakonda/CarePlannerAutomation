import { protractor, browser } from 'protractor';
import * as console from 'console';
var request = require('request');
const requestPromise = require('request-promise');

import { LogHelper } from '../../support/logHelper';
import { GlobalValues } from '../../support/globalDataModel';

export class CarePlannerApiServices {

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


  // makePostAuthRequest(options) {
  //   var defer = protractor.promise.defer();
  //   console.log("makePostAuthRequest");
  //   request(options, function (error, response, body) {
  //     if (error || body.statusCode >= 400) {
  //       defer.reject({ error: error, message: body });
  //     } else {
  //       defer.fulfill(JSON.parse(body).access_token);
  //     }
  //   });
  //   return defer.promise;
  // }

  // // using async await

  // async makePostAuthRequest2(options) {
  //   var defer = protractor.promise.defer();
  //   browser.logger.info("makePostAuthRequest");
  //   await request(options, function (error, response, body) {
  //     if (error || body.statusCode >= 400) {
  //       defer.reject({ error: error, message: body });
  //     } else {
  //       defer.fulfill(JSON.parse(body).access_token);
  //     }
  //   });
  //   // browser.logger.info(defer.promise);
  //   return defer.promise;
  // }
  // // using request - promise 

  // async makePostAuthRequest1(options) {
  //   // let response: any;
  //   try {
  //     browser.logger.info("makePostAuthRequest");
  //     return await requestPromise(options).then((response) => {
  //       //browser.logger.info(response);
  //       return JSON.parse(response);
  //     });
  //     //return a;
  //   } catch (err) {
  //     browser.logger.info(err);
  //     Promise.reject(err);
  //   }
  // }

  // async makePostRequest1(options) {
  //   //var defer = protractor.promise.defer();
  //   let response: any;
  //   try {
  //     browser.logger.info('%%%%%%%%%%%%%5');
  //     return await requestPromise(options);
  //   } catch (err) {
  //     Promise.reject(err);
  //     browser.logger.info("error");
  //   }
  // }

  // async makePostRequest2(options) {
  //   //var defer = protractor.promise.defer();

  //   let response: any;
  //   try {
  //     browser.logger.info('%%%%%%%%%%%%%5');
  //     let __response = await requestPromise(options).then((response) => {
  //       return JSON.parse(response);
  //     });
  //     return __response;
  //   } catch (err) {
  //     Promise.reject(err);
  //     browser.logger.info("error");
  //   }
  // }
  // makePostRequest3

  // parseResultOfMakePostRequest1(response: any) { 
  //   let result : any;
  //   let __result : Promise<any>;
  //   result = response;
  //   browser.logger.info("parseResultOfMakePostRequest********************");
  //   try {

  //       if (response.StatusCode >= 400) {
  //         browser.logger.info("Status code 400");
  //         __result = Promise.reject({ message: result });
  //       }

  //       else if (response.StatusCode == 200) {

  //         browser.logger.info("Status code 200");
  //         __result =   Promise.resolve((result.Data));

  //       }

  //       else if (response instanceof Object) {
  //         browser.logger.info("result is instance of object");
  //         if (result.Data) {
  //           __result = Promise.resolve(result.Data);
  //         }
  //       }
  //   } catch (e) {
  //     throw e;
  //   }
  //   return __result;
  // }


  // makePostRequest(options) {
  //   var defer = protractor.promise.defer();
  //   request(options, function (error, response, body) {
  //     var result;
  //     result = body;
  //     browser.logger.info(body);
  //     if (error || body.statusCode >= 400) {
  //       defer.reject({ error: error, message: body });
  //     } else {
  //       if (result instanceof Object) {
  //         if (result.Data) { defer.fulfill(result.Data); }
  //       } else {
  //         result = JSON.parse(result);
  //         if (result.Data) { defer.fulfill(result.Data); }
  //       }
  //     }
  //   });
  //   return defer.promise;
  // }

  // makePutRequest(options) {
  //   var defer = protractor.promise.defer();
  //   request(options, function (error, response, body) {
  //     var result = body;
  //     if (error || body.statusCode >= 400) {
  //       defer.reject({ error: error, message: body });
  //     } else {
  //       if (result instanceof Object) {
  //         if (result.Data == null) {
  //           defer.fulfill(result.StatusCode);
  //         } else {
  //           defer.fulfill(result.Data);
  //         }
  //       } else {
  //         result = JSON.parse(result);
  //         if (result.Data == null) {
  //           defer.fulfill(result.StatusCode);
  //         } else {
  //           defer.fulfill(result.Data);
  //         }
  //       }
  //     }
  //   });
  //   return defer.promise;
  // }

  // async makePutRequest3(options) {
  //   //Get response in an object and return value
  //   let __response = await requestPromise(options).then((body) => {
  //     return body;
  //   }).catch(function (error) {
  //     throw error;
  //   });
  //   return __response;
  // }



//   makeGetRequest(options) {
//     var defer = protractor.promise.defer();
//     request(options, function (error, response, body) {
//       var result;
//       result = body;
//       browser.logger.info(body);
//       if (error || body.statusCode >= 400) {
//         defer.reject({ error: error, message: body });
//       } else {
//         if (result instanceof Object) {
//           if (result.Data) { defer.fulfill(result.Data); }
//         } else {
//           result = JSON.parse(result);
//           if (result.Data) { defer.fulfill(result.Data); }
//         }
//       }
//     });
//     return defer.promise;
//   }
// }


// if (body.statusCode >= 400) {
  //   return Promise.reject({ message: body });
  // } 
  // else 
  // {
  //   //browser.logger.info(body);
  // if  (result  instanceof  Object) 
  // {
  //   if (result.Data) 
  //   { 
  //     return Promise.resolve(result.Data); 
  //   }
  // } 
  // else 
  // {
  //   result = JSON.parse(result);
  //   if (result.Data) 
  //   { 
  //     return Promise.resolve(result.Data) 
  //   }
  // }