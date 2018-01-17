import * as path from 'path';
import { Utilities } from '../support/utilities';
var log4js = require('log4js');

export class LogHelper {
   
    static Logger : any;

    constructor(){
        //this.logPath = '../support/log/Execution.log';
        //Utilities.createDirectory(this.logPath);
    }
    
    public static loggerConfiguration() {
        var currentDate = new Date(),
        day = currentDate.getDate(),
        month = currentDate.getMonth() + 1,
        year = currentDate.getFullYear(),
        hours = currentDate.getUTCHours(),
        min = currentDate.getUTCMinutes(),
        sec = currentDate.getUTCSeconds()
        let __fileName = "ExecutionLog"+ day + "-" + month + "-" + year + hours + min + sec;
        let __folderName = path.join(__dirname,'../../../log/'+day + "-" + month + "-" + year);
        Utilities.createDirectory(__folderName);
        
        let pathname = path.join(__folderName,__fileName+'.log');
        
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

    public static getLogger() {
        LogHelper.Logger =  log4js.getLogger("LOG");        
    }
}