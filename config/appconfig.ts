import { FrameworkComponent } from "../frameworkComponent";
let path = require('path');
let configValues: ReadAppConfig.AppConfig = require(path.join(__dirname, '..\\..\\config\\appconfig.json'));

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



    // Load app config file which have environment details

    export function LoadConfigAndGetEnvironment() {
        try {
            // let path = require('path');
            // let configValues: ReadAppConfig.AppConfig = require(path.join(__dirname, '..\\..\\config\\appconfig.json'));
            let envList: ReadAppConfig.EnvironmentDetails[] = configValues.environmentcollection[configValues.environment];
            let filteredEnv: EnvironmentDetails = envList.filter(env => env.hospitalid == configValues.hospitalid)[0];
            configValues.runtimeenvironment = filteredEnv;
            return configValues.runtimeenvironment;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    export function LoadMailConfigs() {
        try {
            let __mailConfig: MailConfig = configValues.mailConfig;
            return __mailConfig;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}

