import { Utilities } from './utils';
const path = require('path');

var log4js = require('log4js');

export class LogHelper{

    private logPath:any;

    constructor(){
        this.logPath = '../support/log/Execution.log';
        Utilities.createDirectory(this.logPath);
    }

    
    
    public static loggerConfiguration(){
        var pathname = path.join(__dirname,'../../support/log/ExecutionLog.log');
        log4js.configure({
            appenders: {
              out: { type: 'log4js-protractor-appender' },
              app: { type: 'file', filename: pathname }
            },
            categories: {
              default: { appenders: [ 'out', 'app' ], level: 'debug' },
            }
          });


        // log4js.configure({
        //     appenders:{
        //         'log4js-protractor-appender':{ type:'log4js-protractor-appender', filename:'../support/log/ExecutionLog.log' }
        //     },
        //     categories:{
        //         default: { appenders: ['log4js-protractor-appender'], level: 'info' },
        //     }
        // });
    }

    public static getLogger(){
        return log4js.getLogger('protractorLog4js');
    }
}