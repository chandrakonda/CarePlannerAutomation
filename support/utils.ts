import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

export class Utilities{

// Check for given path and creates new folder

    public static createDirectory(dir: string) {
        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
    }
}



// class TestCase{
//     TestName : string;
//     TestResult: string;
//     TestDescription : string;
// }

// class SpecFile{
//     SpecName: string ;
//     SpecToken : string;
//     StartTime: string;
//     EndTime : string;
//     TestCases : TestCase[];
//     Data:Data;

// }

// class Data {

//     Client : Client;
//     Patient : Patient;
//     AppointmentId: string;
//     VisitId: string;
//     VisitInvoiceItemId :string;
//     InvoiceItemId : string;
//     TaskSeriesId : string;
//     TaskOccurrenceId: string;
//     UserId : string;
//     ClientLastName : string;
// }

// class Client{
//     Id : any;
//     FirstName : string;
//     LastName : string;
//     Patient : Patient[];

// }

// class Patient {
//     Id : string;
//     Name :string;
//     Visit :Visit;
//     Species : string;
//     Age : string;
//     Sex : string;
// }

// class Visit{
//     VisitId : string;
//     Product : Product;
// }

// class TaskSeries {
//     Taskseriesname : string;
//    // TaskOccurrence : TaskOccurrence [];
//     Starttime : string;
//     Endtime : string;
//     Interval :string;
//     Observations : string; 
//     Initialtaskoccurrencecount : number; 
//     Rescheduleoccurrencecount : number;
// }

// class Scheduletaskseries{

//     scheduleStartTime : string;
//     scheduleEndTime : string;
//     repeatEveryHour : string;
//     scheduleInstructions : string;
//     expectedNumberOfTaskOccurrences : number;
//     actualOccurrenceStatus : string [];
//     occurrenceIndex : number;
//     expectedOcurrenceStatus : string [];
//     taskOccurrenceNotes : string;

// }

// class Product {
//     InvoiceItemId: number;
//     InvoiceItemTypeId: number;
//     PLNo: number;
//     SeqNo: number;
//     Code: string;
// }

// export class GlobalValues {
//     StartTime:string;
//     GlobalAuthToken : string;
//     EnvironmentDetails : ReadAppConfig.EnvironmentDetails;
//     ReportFileLocation: string;
//     LogFileLocation: string;
//     SpecFiles : SpecFile[];
//     //Logger : any;
// }