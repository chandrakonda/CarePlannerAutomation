// import { protractor,error } from 'protractor';
// import { $ } from 'jquery';


// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';


// var request = require('request');

// export function getToken2() {
//     var val;
//     var request1 = require('request-promise');
//     var options = {
//         token: null,

//         method: 'POST',
//         uri: 'https://apptsqa.vcahospitals.com:8443/AuthServer/OAuth/Token',
//         json: true,
//         headers:
//         { //'postman-token': 'dd5b6efc-fe55-4760-20e9-3b75184a8038',
//             'cache-control': 'no-cache',
//             authorization: 'Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=',
//             'content-type': 'application/x-www-form-urlencoded'
//         },
//        // form: { grant_type: 'client_credentials' }

//     }

//     request1(options)
//     .then(function (body){
//        // val = body;
//         //process(body);
//          console.log(body);
//          //console.log(error);
//        //  console.log(response);
//     })
//     .catch(function (err) {
//         console.log(err);
//     });
       
     
//     return val;
// }
// export function getToken() {
//     var req = require('request');
//     var quote;
//     var options = {
//         method: 'POST',
//         uri: 'https://apptsqa.vcahospitals.com:8443/OAuthTokenHelper/home/getToken',
//         json: true,
//         headers:
//         { //'postman-token': 'dd5b6efc-fe55-4760-20e9-3b75184a8038',
//             'cache-control': 'no-cache',
//             // authorization: 'Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=',
//             'content-type': 'application/x-www-form-urlencoded'
//         },

//         form: { UserName: 'vcaantech/tablet_nonprod', Password: 'Helpdesk!' }

//     };
//     req(options, function (error, response, body) {
//         quote = body;
//         console.log(body);
//         console.log("error" + error);
//         var responseObj = JSON.parse(body);
//         console.log(responseObj);
//     });

//     return quote;
// }

// export function getToken3() {
//     var val;
//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://apptsqa.vcahospitals.com:8443/OAuthTokenHelper/home/getToken",
//         "method": "POST",
//         "headers": {
//             "content-type": "application/x-www-form-urlencoded",
//             "cache-control": "no-cache",
//             "postman-token": "d6294c92-256a-ceff-f06c-9b6ce010defe"
//         },
//         "data": {
//             "UserName": "vcaantech/tablet_nonprod",
//             "Password": "Helpdesk!"
//         }
//     }

//     $.ajax(settings).done(function (response) {
//         console.log(response);
//         val = response;
//     });
//     return val;
// }

// export function getAuthToken() {
//     var options = {
//         method: 'POST',
//         url: 'https://apptsqa.vcahospitals.com:8443/AuthServer/OAuth/Token',
//         headers:
//         { //'postman-token': 'dd5b6efc-fe55-4760-20e9-3b75184a8038',
//             'cache-control': 'no-cache',
//             authorization: 'Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=',
//             'content-type': 'application/x-www-form-urlencoded'
//         },

//         form: { grant_type: 'client_credentials' }
//     };
//     return post(options);
// }

// function post(options) {
//     var defer = protractor.promise.defer();
//     request(options, function (error, response, body) {
//         if (error || body.statusCode >= 400) {
//             defer.reject({
//                 error: error,
//                 message: body
//             });
//         } else {
//             defer.fulfill(JSON.parse(body));
//         }
//     });
//     return defer.promise;
// }

// export class getTokenAngular {
    
//     constructor(private _http: Http) { }
//     url: string = 'https://apptsqa.vcahospitals.com:8443/AuthServer/OAuth/Token';

//     TokenAngularMethod(): Observable<any[]> {
//         //let token : any = "0XeZLUzsq-qcCu-2DlMqnZ0_xVzOIUqU05LIM8MCKZvCnZM4WaCWbRuedTxeZOPMPpFYCo4v9MF-E4EGsyPo39FFdT5_kuwTj-Q3BRPwsiQMBGV0OkEo7lhpFxcs5u8s0fh2QiKQ7YqNPNKusXbY9wL6WN6JM77oEX9e7yTVpMIIPw30ggk-rljp-kt553nyhzNhbmJ4RsKZD-792QsKv6TrmwlkpIpVP7gOAq0GBuS4BL50pBki7BF2b1al7340kp2GJw";
//         let headers = new Headers(
//             {
//                 'cache-control': 'no-cache',
//                 authorization: 'Basic VmNhYW50ZWNoXFBUTS1XZWJBcHAtcWE6QFlZRnlZVDdWWkRFM3M=',
//                 'content-type': 'application/x-www-form-urlencoded'
//             });
//         let options = new RequestOptions({ headers: headers });

//         return this._http.get(this.url,options)
//         .map((res: Response) => {
//             let body = res.json();
//             return body || {}
//         });
//         //.catch(this.han){};
//     }
// }













