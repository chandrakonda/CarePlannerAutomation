import { browser } from 'protractor';

export namespace SetClient {

    const path = require('path');

    // Load data model 

    let clientRequest = require(path.join(__dirname, '..//..//..//data//jsonObjects//createClientDetails.json'));

    export interface ClientPhone {
        PhoneId: number;
        PhoneLabel: string;
        ClientId: number;
        PhoneNumber: string;
        IsPrimaryContact: boolean;
        HospitalId: any;
        PhoneTypeId: number;
        OptInStatusId: number;
        OptInStatusChangedDate: Date;
        IsMobileNumber: boolean;
    }

    export class Body {
        // private __timestamp: string = new Date().getTime().toString();
        ClientId: number;
        HospitalId: number;
        FirstName: string;
        LastName: string;
        IsCorporateClient: boolean;
        StatusId: number;
        ClientPhones: ClientPhone[];

        constructor() {
            this.ClientId = clientRequest.body.ClientId
            this.HospitalId = browser.appenvdetails.hospitalid;
            this.FirstName = clientRequest.body.FirstName + '-' + new Date().getTime().toString();
            this.LastName = clientRequest.body.LastName + '-' + new Date().getTime().toString();
            this.IsCorporateClient = clientRequest.body.IsCorporateClient;
            this.StatusId = clientRequest.body.StatusId;
            this.ClientPhones = clientRequest.body.ClientPhones;
            this.ClientPhones.forEach(element => {
                element.HospitalId = browser.appenvdetails.hospitalid;
            });
        }
    }

    export class RootObject {

        private method: any;
        private url: string;
        private qs: any;
        private headers: any;
        private body: Body;
        constructor(specfolder: string) {
            // Loaded data template in beginning and fill regular data
            // Load user data for given spec
                // let userdataforspec = require(path.join(__dirname, '..//..//..//data//' + specfolder + '//createclientdata.json+'));
            // create seperate data folder for each spec ex: spec1data, spec2data, spec3data
            // place all data files related to spec in that folder
            // file name will be constant for all the files.so we just need to take data from the spec folder.
            // specfolder name will be given in the specfile/we need to pass this ? 
            // All common data manipulation will be done in data model only.
            // in spec, we will create object for this RootObject and this will return a object [we can convert to json], which we can send to request.
            this.method = browser.appenvdetails.method;
            this.url = browser.appenvdetails.wwapiendpoint + 'Clients';
            this.qs = clientRequest.qs;
            this.headers = clientRequest.headers;
            this.headers["x-hospital-id"] = browser.appenvdetails.hospitalid;
            this.body = new Body()

        }

    }

}

