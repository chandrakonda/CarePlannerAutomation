import { FrameworkComponent } from '../../../frameworkComponent';
import { SpecFile, Data, TestCase, TestBase, APILibraryController, Pages, TaskSeries, Product } from  '../../../applicationcomponent'
import { browser } from 'protractor';

let productTaskList, productTaskList1, startPosition:number, endPosition:number, taskOccurrenceCount:number;
let taskUpdateStatus:string[] = ["Planned","Completed","Skipped","Canceled"];
let singleOccurrence = {
    taskNameToSchedule : 'Vitals_clonetest01',
    scheduleStartTime : 9,
    scheduleEndTime : 0,
    repeatEveryHour : 0,
    scheduleInstructions : 'Test Instructions for the Single Occurrence',
    expectedNumberOfTaskOccurrences : 1,
    actualOccurrenceStatus : ['Overdue'],
    occurrenceIndex : 0,
    expectedOcurrenceStatus : ['Complete'],
    taskOccurrenceNotes : 'Test notes for complete task occurrence'
}

//New User input data Plan to implement the multiple task series 
let single ={
    taskSeriesList :[{
        taskSeriesName: 'Vitals',
        scheduleStartTime : 9,
        scheduleEndTime : 0,
        repeatEveryHour : 0,
        scheduleInstructions : 'Test Instructions for the Single Occurrence',
        expectedNumberOfTaskOccurrences : 1,
        actualOccurrenceStatus : ['Overdue'],
        occurrenceIndex : 0,
        expectedOcurrenceStatus : ['Complete'],
        taskOccurrenceNotes : 'Test notes for complete task occurrence',
        dataCollect : [{
            temp : '',
            respRate : '',
            heartRate : '',            
        }, {
            temp : '',
            respRate : '',
            heartRate : '',            
        }]
    },
    {
        taskSeriesName: 'Vitals',
        scheduleStartTime : 9,
        scheduleEndTime : 0,
        repeatEveryHour : 0,
        scheduleInstructions : 'Test Instructions for the Single Occurrence',
        expectedNumberOfTaskOccurrences : 1,
        actualOccurrenceStatus : ['Overdue'],
        occurrenceIndex : 0,
        expectedOcurrenceStatus : ['Complete'],
        taskOccurrenceNotes : 'Test notes for complete task occurrence',
        dataCollect : [{
            temp : '',
            respRate : '',
            heartRate : '',            
        }, {
            temp : '',
            respRate : '',
            heartRate : '',            
        }]
    }
]
}

let occurrenceDetails:TaskOccurreceDetails;

describe('add a multi series product and schedule a task for a specific series', async () => {

    describe('single occurrence', async() => {
        let specFileData: SpecFile;
        let __data: Data;
        let __testCase: TestCase;
        beforeAll( () => {    
            specFileData = new SpecFile();
            __data = new Data();
            specFileData.Data = __data;
            specFileData.TestCases = new Array<TestCase>();            
        });

        afterAll( () => {
            TestBase.GlobalData.SpecFiles.push(specFileData);
            startPosition = 0;
            endPosition = 0;
            taskOccurrenceCount = 0;
            productTaskList = '';
            browser.Taskseriesname = '';
        });

        beforeEach(()=> {
            __testCase = new TestCase();          
        });

        afterEach(()=> {
            FrameworkComponent.logHelper.info("TestCase Data " + __testCase.TestName);
            specFileData.TestCases.push(__testCase);
        });

        it('Data set up and client pet details' , async () => {
            try {
                __testCase.TestName = 'API Calls for scheduling a task in careplanner';
                await APILibraryController.careplannerLibrary.createClientPetAddProduct(specFileData);   
                FrameworkComponent.logHelper.info("TestCase Data " + __testCase.TestName);
            } catch (error) {
                __testCase.TestResult = 'Fail';
                __testCase.ExceptionDetails = error;
            }
        });

        it('should display the client & pet details matched', async () => {
            __testCase.TestName = "Verify the Client and Patient Details from UI";

            let _clientLastName = specFileData.Data.Client.LastName.length >= 12 ? specFileData.Data.Client.LastName.slice(0,12) + '…' : specFileData.Data.Client.LastName;
            let _patientName = specFileData.Data.Client.Patient.Name.length >=12 ? specFileData.Data.Client.Patient.Name.slice(0,12) + '…' : specFileData.Data.Client.Patient.Name;            
            let speciesName = specFileData.Data.Client.Patient.Species;
            //let speciesName = 'Canine';

            //Verify the page Title
            let pageTitle = await Pages.cpClientAndPetDetailsPage.pageTitle;
            await expect(pageTitle).toEqual('VCA Charge Capture');
            
            //Verify the Client Last Name
            await expect(Pages.cpClientAndPetDetailsPage.clientName).toEqual(_clientLastName);
        
            //Veify the Patient Name 
            await expect(Pages.cpClientAndPetDetailsPage.petName).toEqual(_patientName);
    
            //Veify the Species Name
            await expect(Pages.cpClientAndPetDetailsPage.speciesName).toContain(speciesName);
        });

        it('should validate the product category and list of tasks for the category', async () => {
            
            __testCase.TestName = "Verifying the Category count and product task list";

            //Verify the Category Count
            await expect(Pages.cpSchedulerPage.categoryCount).toEqual(4);
    
            //Verify the Task Count
            await expect(Pages.cpSchedulerPage.productTaskListCount).toEqual(7);

            
        });
        
        it('should successfuly click on a task name toschedule for single occurrence', async () => {
            
            __testCase.TestName = "Schedule the task for the product task series";

            //Click on a task name under a category
            productTaskList = await Pages.cpSchedulerPage.productTaskList; 
            
            getProductTaskList(productTaskList);

            FrameworkComponent.logHelper.info('Product Task List : ' + productTaskList);    
            
            await Pages.cpSchedulerPage.clickOnTaskByName(singleOccurrence.taskNameToSchedule);
            await browser.sleep(1000);
            
            

            occurrenceDetails = {
                frequency : "once",
                scheduleStartTime : singleOccurrence.scheduleStartTime,
                scheduleStartDate : '',
                scheduleEndTime : singleOccurrence.scheduleEndTime,
                scheduleEndDate : '',
                repeatHours: singleOccurrence.repeatEveryHour,
                taskInstructions : singleOccurrence.scheduleInstructions
            } as TaskOccurreceDetails;
    
            //Schedule the Task Occurrence with the Occurrence Details
            await Pages.cpTaskSchedulerPopup.scheduleTaskOccurrence(occurrenceDetails);
            await browser.sleep(5000);
        });

        it('should match with the expected occurrence status', async () => {
    
            __testCase.TestName =  "Verify the Occurrence created and scheduled";

            //Get the task index to set the row index
            let _taskIndex = productTaskList.indexOf(singleOccurrence.taskNameToSchedule);

            
           // let __occurrenceStatus = Pages.cpSchedulerPage.getOccurrenceStatusByCurrentTime(singleOccurrence.scheduleStartTime);
            
            //Get the Row Index Details based on the Task Details
            setPosition(_taskIndex);
    
            //Verify the number of task occurrences created
            await Pages.cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, singleOccurrence.expectedNumberOfTaskOccurrences)
    
            //Verify the status of the created Occurrences
           // await Pages.cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, __occurrenceStatus);

        });
    });

    function setPosition(_taskIndex){
        
        //Get the order index of the task name from the product list independent of category
        //Set the Start & End Position for the task series (row range) per task
        if(_taskIndex == 0){ 
            startPosition = 1 ;
            endPosition = 24;
        } else if(_taskIndex >= 1){
            startPosition =  _taskIndex * 24 + 1;
            endPosition = startPosition + 23; 
        } else {
            //fail test as product list not identified
        }
    }

    function getProductTaskList(__prdTaskList:string[]) {
        
        for (let index = 0; index < __prdTaskList.length; index++) {
            __prdTaskList[index] = __prdTaskList[index].split('-')[0].trim(); 
        }
        productTaskList = __prdTaskList;
    }
});