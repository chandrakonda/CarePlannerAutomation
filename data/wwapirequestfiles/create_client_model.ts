declare module namespace {
    
        interface Qs {
            ignoreDuplicateAddress: string;
            validateAddress: string;
            ignoreDuplicatePhone: string;
        }
    
        interface Headers {
            "cache-control": string;
            "content-type": string;
            applicationname: string;
            username: string;
            "xhospital-id": string;
            authorization: string;
        }
    
        interface ClientPhone {
            PhoneId: number;
            PhoneLabel: string;
            ClientId: number;
            PhoneNumber: string;
            IsPrimaryContact: boolean;
            HospitalId: number;
            PhoneTypeId: number;
            OptInStatusId: number;
            OptInStatusChangedDate: Date;
            IsMobileNumber: boolean;
        }
    
        interface Body {
            ClientId: number;
            HospitalId: number;
            FirstName: string;
            LastName: string;
            IsCorporateClient: boolean;
            StatusId: number;
            ClientPhones: ClientPhone[];

        }
    
        export interface RootObject {
            method: string;
            url: string;
            qs: Qs;
            headers: Headers;
            body: Body;
            json: boolean;
        }
    
    }
    
    