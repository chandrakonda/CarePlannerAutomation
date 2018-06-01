import { FrameworkComponent } from "../frameworkComponent";
let path = require('path');
let __configValues: ReadAppConfig.AppConfig = require(path.join(__dirname, '..\\..\\..\\CarePlanner_Automation\\config\\appconfig.json'));


export namespace ReadAppConfig {

    class Qa {
        envdetails: EnvironmentDetails;
    }

    class UAT {
        envdetails: EnvironmentDetails;
    }

    class Staging {
        envdetails: EnvironmentDetails;
    }

    class PROD {
        envdetails: EnvironmentDetails;
    }

    export class EnvironmentDetails {
        servername: string;
        apiendpoint: string;
        applicationurl: string;
        hospitalid: number;
        authorizationurl: string;
        wwapiendpoint: string;
        cloudapiendpoint: string;
        username: string;
    }

    class Environmentcollection {
        Qa: Qa[];
        UAT: UAT[];
        Staging: Staging[];
        PRODUAT: PROD[];
    }


    export class AppConfig {
        applicationurl: string;
        environment: string;
        server: string;
        apiendpoint: string;
        environmentcollection: Environmentcollection;
        hospitalid: number;
        runtimeenvironment: EnvironmentDetails;
        emailTestReports: boolean;
        mailConfig: MailConfig;
        databaseConfig: DatabaseConfig;        
    }

    export class MailConfig {
        service: string;
        host: string;
        port: number;
        username: string;
        password: string;
        fromMail: string;
        mailList: string;
    }

    export class DatabaseConfig {        
        serverName: string;
        databaseName: string
        userName: string;
        password: string;
        portNumber: string;
        requestTimeout: number;
        connectionTimeout: number;
    }


    // Load app config file which have environment details

    export function loadConfigAndGetEnvironment() {
        try {
            // let path = require('path');
            // let __configValues: ReadAppConfig.AppConfig = require(path.join(__dirname, '..\\..\\config\\appconfig.json'));
            let envList: ReadAppConfig.EnvironmentDetails[] = __configValues.environmentcollection[__configValues.environment];
            let filteredEnv: EnvironmentDetails = envList.filter(env => env.hospitalid == __configValues.hospitalid)[0];
            __configValues.runtimeenvironment = filteredEnv;
            return __configValues.runtimeenvironment;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    export function loadDatabaseConfiguration() {
        try {
            let envList = __configValues.databaseConfig[__configValues.environment];
            let filteredEnv: DatabaseConfig = envList.filter(env => env.hospitalid == __configValues.hospitalid)[0];
            __configValues.databaseConfig = filteredEnv;
            return __configValues.databaseConfig;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    export function loadMailConfigs() {
        try {
            let __mailConfig: MailConfig = __configValues.mailConfig;
            return __mailConfig;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }  
}

