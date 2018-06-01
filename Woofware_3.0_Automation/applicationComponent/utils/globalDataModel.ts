export class GlobalValues {

    StartTime : Date;
    EndTime : Date;
    GlobalAuthToken : string;
    ResultFolderLocation : string;
    ReportFileLocation : string;
    LogFileLocation : string;
    SpecFiles : SpecFile[];
    EnvironmentConfigDetails : EnvironmentDetails;
    DatabaseConfigDetails : DatabaseConfig;
    MailConfigDetails : any[];    
    LoadedSpecFileCount : any
}

export class SpecFile {
    SpecName : string;
    SpecToken : string;
    SpecStartTime : Date;
    SpecEndTime : Date;
    TestCases : TestCase[];
    SpecFileData : SpecFileData;
    ApplicationURL : string;
    UserData : any;


}

export class TestCase {
    TestName: string;
    TestResult: string;
    TestDescription: string;
    ExceptionDetails: string[];
    WarningInformation: string;
    StartTime: Date;
    EndTime: Date;
}

export class SpecFileData {

}

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

export class Environmentcollection {
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