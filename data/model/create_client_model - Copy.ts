import { browser } from 'protractor';

export namespace SetClient {
    const path = require('path');
    let clientRequest = require(path.join(__dirname, '..//..//..//data//wwapirequestfiles//create_client_body.json'));
    export class Qs {
        private ignoreDuplicateAddress: string;
        private validateAddress: string;
        private ignoreDuplicatePhone: string;
        constructor() {
            this.ignoreDuplicateAddress = clientRequest.qs.ignoreDuplicateAddress;
            this.validateAddress = clientRequest.qs.validateAddress;
            this.ignoreDuplicatePhone = clientRequest.qs.ignoreDuplicatePhone;
        }
    }

    export class Headers {
        LoadHeaders() {
            let headersjson =clientRequest.headers; 
            return headersjson;
        }

    }

    export class ClientPhone {
        PhoneId: number;
        PhoneLabel: string;
        ClientId: number;
        PhoneNumber: string;
        IsPrimaryContact: boolean;
        HospitalId : number;
        PhoneTypeId: number;
        OptInStatusId: number;
        OptInStatusChangedDate: Date;
        IsMobileNumber: boolean;
        constructor() {
            this.PhoneId = clientRequest.body.ClientPhones[0].PhoneId;
            this.PhoneLabel = clientRequest.body.ClientPhones[0].PhoneLabel;
            this.ClientId = clientRequest.body.ClientPhones[0].ClientId;
            this.PhoneNumber = clientRequest.body.ClientPhones[0].PhoneNumber;
            this.IsPrimaryContact = clientRequest.body.ClientPhones[0].IsPrimaryContact;
            this.HospitalId = browser.appenvdetails.hospitalid;
            this.PhoneTypeId = clientRequest.body.ClientPhones[0].PhoneTypeId;
            this.OptInStatusId = clientRequest.body.ClientPhones[0].OptInStatusId;
            this.OptInStatusChangedDate = clientRequest.body.ClientPhones[0].OptInStatusChangedDate;
            this.IsMobileNumber = clientRequest.body.ClientPhones[0].IsMobileNumber;
                
            }
        }

    export class Body {
       // private __timestamp: string = new Date().getTime().toString();
        ClientId: number;
        HospitalId : number;
        FirstName: string;
        LastName: string;
        IsCorporateClient: boolean;
        StatusId: number;
        ClientPhones: ClientPhone[];

        constructor() {
            this.ClientId = clientRequest.body.ClientId
            this.HospitalId = browser.appenvdetails.hospitalid;
            this.FirstName = 'Josh-' + new Date().getTime().toString();
            this.LastName = 'Chezum-' + new Date().getTime().toString();
            this.IsCorporateClient =  clientRequest.body.IsCorporateClient;
            this.StatusId =  clientRequest.body.StatusId;
            this.ClientPhones =  [new ClientPhone()];

        }

    }

    export class RootObject {

        private method: any;
        private url: string;
        private qs: Qs;
        private headers: Headers;
        private body: Body;
        constructor() {
            
            this.method = 'POST';
            this.url = browser.appenvdetails.wwapiendpoint + 'Clients';
            this.qs = new Qs();
            this.headers = new Headers().LoadHeaders();
            this.body = new Body()

        }

    }

}

