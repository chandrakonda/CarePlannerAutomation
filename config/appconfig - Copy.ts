import { browser } from 'protractor';
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
        severname: string;
        apiendpoint: string;
        applicationurl: string;
        hospitalid: number;
        authorizationurl: string;
        wwapiendpoint: string;
        cloudapiendpoint:string;
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
        runtimeenvironment : EnvironmentDetails;
    }

    // Load app config file which have environment details

    export function LoadConfigAndGetEnvironment() {
        try {
            let configValues: ReadAppConfig.AppConfig = require(browser.path.join(__dirname, '..\\..\\config\\appconfig - Copy.json'));
            let envList: ReadAppConfig.EnvironmentDetails[] = configValues.environmentcollection[configValues.environment];
            let filteredEnv : EnvironmentDetails = envList.filter(env => env.hospitalid == configValues.hospitalid)[0];
            configValues.runtimeenvironment = filteredEnv;
            return configValues;
        } catch (e) {
            throw e;
        }
    }
}

