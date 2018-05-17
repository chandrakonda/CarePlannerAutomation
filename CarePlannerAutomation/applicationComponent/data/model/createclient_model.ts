// import { browser } from 'protractor';
// import { TestBase } from '../../../applicationComponent';

// export namespace SetClient {

//     const path = require('path');

//     // Load data model 


//     let apiTemplateValues = require(path.join(__dirname, '..//..//..//data//apiTemplates//postClients.json'));

//     export interface ClientPhone {
//         PhoneId: number;
//         PhoneLabel: string;
//         ClientId: number;
//         PhoneNumber: string;
//         IsPrimaryContact: boolean;
//         HospitalId: any;
//         PhoneTypeId: number;
//         OptInStatusId: number;
//         OptInStatusChangedDate: Date;
//         IsMobileNumber: boolean;
//     }

//     export class Body {
//         // private __timestamp: string = new Date().getTime().toString();
//         ClientId: number;
//         HospitalId: number;
//         FirstName: string;
//         LastName: string;
//         IsCorporateClient: boolean;
//         StatusId: number;
//         ClientPhones: ClientPhone[];

//         constructor(defaultClientValues : any) {
//             // this.ClientId = defaultClientValues.body.ClientId
//             // this.HospitalId = browser.appenvdetails.hospitalid;
//             // this.FirstName = defaultClientValues.body.FirstName + '-' + new Date().getTime().toString();
//             // this.LastName = defaultClientValues.body.LastName + '-' + new Date().getTime().toString();
//             // this.IsCorporateClient = defaultClientValues.body.IsCorporateClient;
//             // this.StatusId = defaultClientValues.body.StatusId;
//             // this.ClientPhones = defaultClientValues.body.ClientPhones;
//             // this.ClientPhones.forEach(element => {
//             //     element.HospitalId = browser.appenvdetails.hospitalid;
//             // });
//             this.ClientId = defaultClientValues.ClientId
//             this.HospitalId = TestBase.GlobalData.EnvironmentDetails.hospitalid;
//             this.FirstName = defaultClientValues.FirstName + '-' + new Date().getTime().toString();
//             this.LastName = defaultClientValues.LastName + '-' + new Date().getTime().toString();
//             this.IsCorporateClient = defaultClientValues.IsCorporateClient;
//             this.StatusId = defaultClientValues.StatusId;
//             this.ClientPhones = defaultClientValues.ClientPhones;
//             this.ClientPhones.forEach(element => {
//                 element.HospitalId = TestBase.GlobalData.EnvironmentDetails.hospitalid;
//             });
//         }
//     }

//     export class RootObject {

//         private method: any;
//         private url: string;
//         private qs: any;
//         private headers: any;
//         private body: Body;
//         constructor(specfolder: string) {
//             let defaultClientValues = require(path.join(__dirname, '..//..//..//data//defaultValues//postClientsDetails.json'));
//             this.method = browser.appenvdetails.method;
//             this.url = browser.appenvdetails.wwapiendpoint + 'Clients';
//             this.qs = apiTemplateValues.qs;
//             this.headers = apiTemplateValues.headers;
//             this.headers["x-hospital-id"] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
//             this.body = new Body(defaultClientValues)

//         }

//     }

// }

