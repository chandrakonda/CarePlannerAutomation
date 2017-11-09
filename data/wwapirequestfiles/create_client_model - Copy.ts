import { browser } from 'protractor';

export namespace SetClient  {
    
        export class Qs {
            ignoreDuplicateAddress: string;
            validateAddress: string;
            ignoreDuplicatePhone: string;
        }
    
        export class Headers {
            "cache-control": string;
            "content-type": string;
            applicationname: string;
            username: string;
            "x-hospital-id": string;
            authorization: string;
        }
    
        export class ClientPhone {
            PhoneId: number;
            PhoneLabel: string;
            ClientId: number;
            PhoneNumber: string;
            IsPrimaryContact: boolean;
            HospitalId = browser.appenvdetails.hospitalId;
            PhoneTypeId: number;
            OptInStatusId: number;
            OptInStatusChangedDate: Date;
            IsMobileNumber: boolean;
        }
    
        export class Body {
            private __timestamp : string;
            constructor()
            {
                this.__timestamp = "new Date().getTime().toString()";
            }
            private __val : string
            ClientId: number;
            HospitalId = browser.appenvdetails.hospitalId;
            __firstName: string;
            __lastName: string;
            IsCorporateClient: boolean;
            StatusId: number;
            ClientPhones: ClientPhone[];

            // public set FirstName (value: string){
            //    console.log(value +'-'+ this.__timestamp);
            //     this.__firstName = value +'-'+ this.__timestamp;
            // }

            // public get FirstName (){
            //     return this.__firstName;
            // }

            // public set LastName (value: string){

            //     this.__lastName = value +'-'+ this.__timestamp;
            // }

            // public get LastName (){
            //     return this.__lastName;
            // }
         


        }
    
        export class RootObject {
            method: string;
            url: string;
            qs: Qs;
            headers: Headers;
            body: Body;
            json: boolean;
        }
    
    }
    
    