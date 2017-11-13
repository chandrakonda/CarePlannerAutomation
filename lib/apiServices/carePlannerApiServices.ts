import { protractor, browser } from 'protractor';
import * as console from 'console';
var request = require('request');

export class CarePlannerApiServices{

    constructor(){}

    makePostAuthRequest(options){
      var defer = protractor.promise.defer();
      request(options, function (error, response, body) {
          if (error || body.statusCode >= 400) {
              defer.reject({ error: error, message: body });
          } else {
              defer.fulfill(JSON.parse(body).access_token);
          }
      });
      return defer.promise;
    }

    makePostRequest(options){
      var defer = protractor.promise.defer();
      request(options, function (error, response, body) {
        var result;
        result = body;
        browser.logger.info(body);
        if (error || body.statusCode >= 400) {
          defer.reject({ error: error, message: body });
        } else {
          if (result instanceof Object) {
            if (result.Data) { defer.fulfill(result.Data);}
          } else {
            result = JSON.parse(result);
            if (result.Data) { defer.fulfill(result.Data);}
          }
        }
      });
      return defer.promise;
    }

    makePutRequest(options){
      var defer = protractor.promise.defer();
      request(options, function (error, response, body) {
        var result = body;
        if (error || body.statusCode >= 400) {
          defer.reject({ error: error, message: body });
        } else {
          if (result instanceof Object) {
            if (result.Data == null) { 
              defer.fulfill(result.StatusCode);
            } else {
              defer.fulfill(result.Data);
            }
          } else {
            result = JSON.parse(result);
            if (result.Data == null) { 
              defer.fulfill(result.StatusCode);
            } else {
              defer.fulfill(result.Data);
            }
          }
        }
      });
      return defer.promise;
    }
    makeGetRequest(options){
      var defer = protractor.promise.defer();
      request(options, function (error, response, body) {
        var result;
        result = body;
        browser.logger.info(body);
        if (error || body.statusCode >= 400) {
          defer.reject({ error: error, message: body });
        } else {
          if (result instanceof Object) {
            if (result.Data) { defer.fulfill(result.Data);}
          } else {
            result = JSON.parse(result);
            if (result.Data) { defer.fulfill(result.Data);}
          }
        }
      });
      return defer.promise;
    }
}