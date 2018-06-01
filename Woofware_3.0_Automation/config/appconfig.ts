import { AppConfig, DatabaseConfig, EnvironmentDetails, MailConfig } from "../applicationComponent";
import { FrameworkComponent } from "../frameworkComponent";
let path = require('path');
let __configValues: AppConfig = require(path.join(__dirname, '..\\..\\..\\Woofware_3.0_Automation\\config\\appconfig.json'));

export class ReadAppConfig {

    // Load app config file which have environment details

    static loadConfigAndGetEnvironment() {
        try {            
            let envList: EnvironmentDetails[] = __configValues.environmentcollection[__configValues.environment];
            let filteredEnv: EnvironmentDetails = envList.filter(env => env.hospitalid == __configValues.hospitalid)[0];
            __configValues.runtimeenvironment = filteredEnv;
            return __configValues.runtimeenvironment;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    static loadDatabaseConfiguration() {
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

    static loadMailConfigs() {
        try {
            let __mailConfig: MailConfig = __configValues.mailConfig;
            return __mailConfig;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }  
}

