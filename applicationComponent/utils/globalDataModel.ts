
import { ReadAppConfig } from '../../applicationComponent';
import {DataReader} from '../../dataComponent/dataReaderHelper';
const path = require('path');

export class GlobalValues {
    ApiDefaultValues : any;
    constructor(){
        this.ApiDefaultValues = new DefaultValues();
    }
    StartTime: Date;
    GlobalAuthToken: string;
    EnvironmentDetails: ReadAppConfig.EnvironmentDetails;
    ReportFileLocation: string;
    LogFileLocation: string;
    SpecFiles: SpecFile[];
    ResultFolder : string;
    LoadedSpecFileCount : any;
    EndTime:Date
    
    //Logger : any;
}

class DefaultValues{

    PostClientsDefaultValues :any;
    PostPatientsDefaultValues : any;
    BookAppointmentValues : any;
    VisitInvoiceItemsBillOnceValues : any;

    constructor(){
        //this.PostClientsDefaultValues = require(path.join(__dirname, '../../../applicationComponent/data/defaultValues/postClients.json'));
        this.PostClientsDefaultValues = DataReader.loadAPIDefaultValues('postClients');// require(path.join(__dirname, '../../../applicationComponent/data/defaultValues/postClients.json'));
        this.PostPatientsDefaultValues = DataReader.loadAPIDefaultValues('postPatients'); //require(path.join(__dirname, '../../../applicationComponent/data/defaultValues//postPatients.json'));
        this.BookAppointmentValues = DataReader.loadAPIDefaultValues('bookAppointment'); //require(path.join(__dirname, '../../../applicationComponent/data/defaultValues/bookAppointment.json'));
        this.VisitInvoiceItemsBillOnceValues =   DataReader.loadAPIDefaultValues('visitInvoiceItems'); //require(path.join(__dirname, '../../../applicationComponent/data/defaultValues//visitInvoiceItems.json'));
    }

    ///PostClientsDefaultValues : any = this.__postclient;
    //PostPatientsDefaultValues : any = this.__postpet;
    //BookAppointmentValues : any = this.__bookappointment;
    //VisitInvoiceItemsBillOnceValues : any =  this.__billonceproduct;
    VisitInvoiceItemsBillEveryValues : any;

}

export class SpecFile {
    SpecName: string;
    SpecToken: string;
    StartTime: string;
    EndTime: string;
    TestCases: TestCase[];
    Data: Data;
    ApplicationUrl : string;
    UserId : string;
    UserData : any;
    ApiData: any;
}


export class TestCase {
    TestName: string;
    TestResult: string;
    TestDescription: string;
    ExceptionDetails : string;
    WarningInformation :string;
    StartTime: Date;
    EndTime: Date;
}

export class Data {

    Client: Client;
    //Patient: Patient;
    AppointmentId: string;
    VisitId: string;
    VisitInvoiceItemId: string;
    InvoiceItemId: string;
    TaskSeriesId: string;
    TaskOccurrenceId: string;
    UserId: string;
    ClientLastName: string;
    


}

export class Client {
    Id: any;
    FirstName: string;
    LastName: string;
    Patient: Patient;
}

export class Patient {
    Id: string;
    Name: string;
    Visit: Visit;
    Species: string;
    Age: string;
    Gender: string;
    AppointmentId : string;
    Color:string;
    Weight:string
}

export class Visit {
    VisitId: string;
    Product: Product;
    VisitInvoiceItem : VisitInvoiceItem[];
    Category : Category[];    
}

export class VisitInvoiceItem {

    visitinvoiceitemid : string;
    visitinvoiceitemname : string;
    invoiceitemid : string;

}

export class Product {
    InvoiceItemId: number;
    InvoiceItemTypeId: number;
    PLNo: number;
    SeqNo: number;
    Code: string;
    TaskSeries: TaskSeries[];
}

export class TaskSeries {
    Taskseriesname: string;
    // TaskOccurrence : TaskOccurrence [];
    Starttime: string;
    Endtime: string;
    Interval: string;
    Observations: string;
    Initialtaskoccurrencecount: number;
    Rescheduleoccurrencecount: number;
    TaskOccurrence: TaskOccurrence[];
    TaskSeriesId : string;
}

export class TaskOccurrence {

    InitialTaskOccurrenceStatus: string;
    FinalTaskOccurrenceStatus: string;
    ScheduleTime: string;
    TaskOccurrenceId : string;

}


export class Scheduletaskseries {

    scheduleStartTime: string;
    scheduleEndTime: string;
    repeatEveryHour: string;
    scheduleInstructions: string;
    expectedNumberOfTaskOccurrences: number;
    actualOccurrenceStatus: string[];
    occurrenceIndex: number;
    expectedOcurrenceStatus: string[];
    taskOccurrenceNotes: string;

}


export class Category {
    CategoryName: string;
    CategoryId:string;
    TaskSeriesList : TaskSeriesList[];
}

export class TaskSeriesList {
    TaskName: string;
    TaskSeriesId:string;
    HourlyTaskOccurrences: HourlyTaskOccurrences[]
}

export class HourlyTaskOccurrences {
    TaskOccurrenceId:string;
    Hour: string;
    Day:string;
    Date: string;
    Occurrences: string[]

}