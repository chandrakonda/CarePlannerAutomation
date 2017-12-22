import { Utilities } from './utils';

import * as mkdirp from 'mkdirp';
var log4js = require('log4js');
const path = require('path');

export class LogHelper{

   
    static Logger : any;

    constructor(){
        //this.logPath = '../support/log/Execution.log';
        //Utilities.createDirectory(this.logPath);
    }
    
    public static loggerConfiguration(){
        var currentDate = new Date(),
        day = currentDate.getDate(),
        month = currentDate.getMonth() + 1,
        year = currentDate.getFullYear(),
        hours = currentDate.getUTCHours(),
        min = currentDate.getUTCMinutes(),
        sec = currentDate.getUTCSeconds()
        let __fileName = "ExecutionLog"+ day + "-" + month + "-" + year + hours + min + sec;
        let __folderName = path.join(__dirname,'../../log/'+day + "-" + month + "-" + year);
        Utilities.createDirectory(__folderName);
        var pathname = path.join(__folderName,__fileName+'.log');
        
        log4js.configure({
            appenders: {
              out: { type: 'log4js-protractor-appender' },
              app: { type: 'file', filename: pathname }
            },
            categories: {
              default: { appenders: [ 'out', 'app' ], level: 'debug' },
            }
          });


    }

    public static getLogger(){
        //return log4js.getLogger('protractorLog4js');
        LogHelper.Logger=  log4js.getLogger("LOG");
    }
}
