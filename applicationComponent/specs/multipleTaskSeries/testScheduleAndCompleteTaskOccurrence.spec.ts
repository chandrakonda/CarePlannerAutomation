import { FrameworkComponent } from '../../../frameworkComponent';
import { SpecFile, Data, TestCase, TestBase, APILibraryController, Pages, TaskSeries, Product } from  '../../../applicationcomponent'
import { browser } from 'protractor';

let productTaskList, productTaskList1, startPosition:number, endPosition:number, taskOccurrenceCount:number;
let taskUpdateStatus:string[] = ["Planned","Completed","Skipped","Canceled"];

let multipleOccurrence ={
    taskSeriesList :[{
        taskSeriesName: 'Vitals',
        occurrenceFrequency : 'recurring',
        scheduleStartTime : 9,
        scheduleEndTime : 11,
        repeatEveryHour : 1,
        scheduleInstructions : 'Test Instructions for vitals',
        expectedNumberOfTaskOccurrences : 3,
        actualOccurrenceStatus : ['Overdue', 'Overdue','Overdue'],
        occurrenceIndex : 1,
        expectedOcurrenceStatus : ['Overdue','Complete', 'Overdue'],
        taskOccurrenceNotes : 'Test notes for complete task occurrence',
        dataCollect : [
            {
                temp : '',
                respRate : '',
                heartRate : ''
            }, { 
                temp : '',
                respRate : '',
                heartRate : ''
            }, {

            }]
    },{
        taskSeriesName: 'Offer food',
        occurrenceFrequency : 'recurring',
        scheduleStartTime : 12,
        scheduleEndTime : 16,
        repeatEveryHour : 2,
        scheduleInstructions : 'Test Instructions for offer food',
        expectedNumberOfTaskOccurrences : 3,
        actualOccurrenceStatus : ['Overdue', 'Overdue','Overdue'],
        occurrenceIndex : 2,
        expectedOcurrenceStatus : ['Overdue','Overdue', 'Complete'],
        taskOccurrenceNotes : 'Test notes for complete task occurrence',
        dataCollect : [
            {
                temp : '',
                respRate : '',
                heartRate : ''
            }, { 
                temp : '',
                respRate : '',
                heartRate : ''
            }, {

            }]
    }]
}

let occurrenceDetails:TaskOccurreceDetails;

describe('add a multi series product and schedule a task for a specific series', () => {

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
                await APILibraryController.careplannerLibrary.apiTestDataSetUpWithDefaultData(specFileData);   
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

            productTaskList = getProductTaskList(await Pages.cpSchedulerPage.productTaskList); 
        });
        
        it('should successfuly schedule a task and verify the status', () => {
            try
            {                
                //Click on a task name under a category
                multipleOccurrence.taskSeriesList.forEach(taskSeries => {
                    occurrenceDetails = {
                        frequency : taskSeries.occurrenceFrequency,
                        scheduleStartTime : taskSeries.scheduleStartTime,
                        scheduleStartDate : '',
                        scheduleEndTime : taskSeries.scheduleEndTime,
                        scheduleEndDate : '',
                        repeatHours: taskSeries.repeatEveryHour,
                        taskInstructions : taskSeries.scheduleInstructions
                    } as TaskOccurreceDetails;
                    
                    __testCase.TestName = 'Schedule the task for the task series "'+ taskSeries.taskSeriesName +'"';

                    Pages.cpSchedulerPage.clickOnTaskByName(taskSeries.taskSeriesName);
                    browser.sleep(1000);                    
                    
                    //Schedule the Task Occurrence with the Occurrence Details
                    Pages.cpTaskSchedulerPopup.scheduleTaskOccurrence(occurrenceDetails);
                    browser.sleep(5000);

                    //Get the task index to set the row index
                    let _taskIndex = productTaskList.indexOf(taskSeries.taskSeriesName);
                    
                    //Get the Row Index Details based on the Task Details
                    setPosition(_taskIndex);
            
                    //Verify the number of task occurrences created
                    Pages.cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, taskSeries.expectedNumberOfTaskOccurrences)
            
                    //Verify the status of the created Occurrences
                    Pages.cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, taskSeries.actualOccurrenceStatus);
                });
            } catch (error){
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('complete the occurrence', async () => {

            for (let index = 1; index < multipleOccurrence.taskSeriesList.length; index++) {
                
                __testCase.TestName = "Edit and update the task occurrence";

                //Click on the task occurrence to bring up the edit task occurrence popup
                FrameworkComponent.logHelper.info("Click on the task occurrence by index : " + multipleOccurrence.taskSeriesList[index].occurrenceIndex);
                await Pages.cpSchedulerPage.clickOnOccurrenceByIndex(startPosition, endPosition, multipleOccurrence.taskSeriesList[index].occurrenceIndex);
                await browser.sleep(1000);
        
                //Edit & Update the status of the task occurrence
                await Pages.cpTaskOccurrencePopup.updateOccurrenceDetails(taskUpdateStatus[1], multipleOccurrence.taskSeriesList[index].taskOccurrenceNotes);
                await browser.sleep(7000);
                
                //Verify the task occurrence status after completing
                await Pages.cpSchedulerPage.verifyTheStatusOfTaskOccurrenceUpdatedByIndex(startPosition, endPosition, multipleOccurrence.taskSeriesList[index].occurrenceIndex, multipleOccurrence.taskSeriesList[index].expectedOcurrenceStatus[multipleOccurrence.taskSeriesList[index].occurrenceIndex]);
            }
           
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

    function getProductTaskList(__prdTaskList:any):any  {    
        for (let index = 0; index < __prdTaskList.length; index++) {
            __prdTaskList[index] = __prdTaskList[index].split('-')[0].trim(); 
        }
        return __prdTaskList;
    }
});