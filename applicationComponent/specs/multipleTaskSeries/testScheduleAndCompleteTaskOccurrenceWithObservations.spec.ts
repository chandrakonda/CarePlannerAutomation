import { FrameworkComponent } from '../../../frameworkComponent';
import { SpecFile, Data, TestCase, TestBase, APILibraryController, Pages, TaskSeries, Product } from  '../../../applicationcomponent'
import { browser } from 'protractor';
import { DataReader } from '../../../dataComponent/dataReaderHelper';

let productTaskList, productTaskList1, startPosition:number, endPosition:number, taskOccurrenceCount:number;
let taskUpdateStatus:string[] = ["Planned","Completed","Skipped","Canceled"];
let occurrenceDetails:TaskOccurreceDetails;

describe('add a multi series product and schedule a task for a specific series', () => {

    describe('single occurrence', async() => {
        let specFileData: SpecFile;
        let __data: Data;
        let __testCase: TestCase;
        let __dataReader : DataReader;
        beforeAll( () => {    
            specFileData = new SpecFile();
            __dataReader = new DataReader();
            __data = new Data();
            specFileData.Data = __data;
            specFileData.UserData  = __dataReader.loadJsonData('scheduleCompleteTask','multipleTaskSeries');
            FrameworkComponent.logHelper.info(specFileData.UserData);
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
            if(__testCase.ExceptionDetails != null){
                __testCase.TestResult = 'Pass';                
            } else {
                __testCase.TestResult = 'Fail';
            }
            specFileData.TestCases.push(__testCase);
        });

        it('Data set up and client pet details' , async () => {
            try {
                __testCase.TestName = 'API Calls for scheduling a task in careplanner';
                await APILibraryController.careplannerLibrary.apiTestDataSetUpWithDefaultData(specFileData);   

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });


        it('should validate the product category and list of tasks for the category', async () => {
            try {
                __testCase.TestName = "Verifying the Category count and product task list";

                //Verify the Category Count
                await expect(Pages.cpSchedulerPage.categoryCount).toEqual(4);
        
                //Verify the Task Count
                await expect(Pages.cpSchedulerPage.productTaskListCount).toEqual(7);

                getProductTaskList(await Pages.cpSchedulerPage.productTaskList);
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }            
        });
        
        it('schedule and verify the task', () => {
            try {
                __testCase.TestName = 'Schedule the task for the task series for all the product task list displayed';

                //Schedule a task from the user input data
                specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {
                    
                    await Pages.cpSchedulerPage.ScheduleTaskWithObservations(taskSeriesInfo);

                });
            } catch (error) {                
                __testCase.ExceptionDetails = error;
            }            
        });

        it('verify the task occurrence count and status', ()=> {
            try {
                __testCase.TestName = 'Verifying the occurrence info of the scheduled task for the task series for all the product task list displayed ';

                specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {

                    if(productTaskList == null){
                        FrameworkComponent.logHelper.info('Getting the product list once again');
                        getProductTaskList(await Pages.cpSchedulerPage.productTaskList);
                    }

                    let _taskIndex = productTaskList.indexOf(taskSeriesInfo.taskSeriesName);
                        
                    //Get the Row Index Details based on the Task Details
                    setPosition(_taskIndex);
    
                    //Verify the number of task occurrences created
                    await Pages.cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, taskSeriesInfo.expectedNumberOfTaskOccurrences)
                
                    //Verify the status of the created Occurrences
                    await Pages.cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, taskSeriesInfo.actualOccurrenceStatus);
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }            
        });
           
       
        it('complete the occurrence', async () => {
            try {

                __testCase.TestName = 'Edit and update the task occurrence for the task series with the given status';

                specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {
    
                    //Click on the task occurrence to bring up the edit task occurrence popup
                    await Pages.cpSchedulerPage.clickOnOccurrenceByIndex(startPosition, endPosition, taskSeriesInfo.occurrenceIndex);
                    await browser.sleep(1000);
    
                    //Edit & Update the status of the task occurrence
                    await Pages.cpTaskOccurrencePopup.updateOccurrenceDetailsWithObservations(taskUpdateStatus[1], taskSeriesInfo);
                    await browser.sleep(9000);
    
                    //Verify the task occurrence status after completing
                    await Pages.cpSchedulerPage.verifyTheStatusOfTaskOccurrenceUpdatedByIndex(startPosition, endPosition, taskSeriesInfo.occurrenceIndex,taskSeriesInfo.expectedOcurrenceStatus[taskSeriesInfo.occurrenceIndex]);
    
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }            
        });

        // it('verify the task details in tretment log', async () => {
        //     try {
        //         __testCase.TestName = "Verify task details at treatment log";

        //         Pages.cpClientAndPetDetailsPage.clickOnTreatmentLogButton();

        //         specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {
        //             let __treatmentLogPage = await Pages.cpTreatmentLogPage.isTreatmentLogPageLoaded()
        //             expect(__treatmentLogPage).toBe(true);                    
        //         });
        //     } catch (error) {
        //         __testCase.ExceptionDetails = error;
        //     }            
        // });
    });

    function setPosition(_taskIndex){
        try {
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
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }        
    }

    function getProductTaskList(__prdTaskList:any){       
        try {
            for (let index = 0; index < __prdTaskList.length; index++) {
                __prdTaskList[index] = __prdTaskList[index].split('-')[0].trim(); 
            }
            productTaskList =  __prdTaskList;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
});