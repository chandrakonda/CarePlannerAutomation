import { FrameworkComponent } from '../../../frameworkComponent';
import { SpecFile, Data, TestCase, TestBase, APILibraryController, Pages, TaskSeries, Product } from  '../../../applicationcomponent'
import { browser } from 'protractor';
import { DataReader } from '../../../dataComponent/dataReaderHelper';

let productTaskList, productTaskList1, taskOccurrenceCount:number;
// let taskUpdateStatus:string[] = ["Planned","Completed","Skipped","Canceled"];
let occurrenceDetails:TaskOccurreceDetails;

describe('Add a multi series product and schedule a task for all the task series', () => {

    describe('Complete a single occurrence of each task series', async() => {
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
            taskOccurrenceCount = 0;
            productTaskList = '';
            browser.Taskseriesname = '';
        });

        beforeEach(()=> {
            __testCase = new TestCase();          
        });

        afterEach(()=> {
            if(__testCase.ExceptionDetails != null){
                __testCase.TestResult = 'Fail';                
            } else {
                __testCase.TestResult = 'Pass';
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


        it('Verifying the category count and product task list', async () => {
            try {
                __testCase.TestName = "Verifying the category count and product task list";

                //Verify the Category Count
                await expect(Pages.cpSchedulerPage.categoryCount).toEqual(4);
        
                //Verify the Task Count
                await expect(Pages.cpSchedulerPage.productTaskListCount).toEqual(7);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }            
        });
        
        it('Schedule a specified number of tasks for a each task series', () => {
            try {
                __testCase.TestName = 'Schedule a specified number of tasks for a each task series';

                //Schedule a task from the user input data
                specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {
                    browser.sleep(2000);
                    await Pages.cpSchedulerPage.ScheduleTaskWithObservations(taskSeriesInfo);
                });
            } catch (error) {                
                __testCase.ExceptionDetails = error;
            }            
        });

        it('Verify the specified count and status of the task occurrence with the scheduled task series', ()=> {
            try {
                __testCase.TestName = 'Verify the specified count and status of the task occurrence with the scheduled task series';

                specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {

                    //Verify the number of task occurrences created
                    let __occurrenceCount = Pages.cpSchedulerPage.getTheNumberOfTaskOccurrenceCreated(taskSeriesInfo.taskSeriesName);
                    expect(__occurrenceCount).toEqual(taskSeriesInfo.expectedNumberOfTaskOccurrences);
                
                    //Verify the status of the created Occurrences
                    let __occurrencesStatus = Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(taskSeriesInfo.taskSeriesName);
                    expect(__occurrencesStatus).toEqual(taskSeriesInfo.actualOccurrenceStatus);
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }            
        });
           
       
        it('Edit and update the task occurrence to the specified task occurrence status with observation details', async () => {
            try {

                __testCase.TestName = 'Edit and update the task occurrence to the specified task occurrence status with observation details';

                specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {
                    //Edit & Update the status of the task occurrence
                    Pages.cpSchedulerPage.updateOccurrenceDetailsWithObservations(taskSeriesInfo);
                    browser.sleep(2000);
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }            
        });

        it('Verify the specified count and status of the task occurrences with the updated task series', () => {
            try {
                __testCase.TestName = 'Verify the specified count and status of the task occurrences with the updated task series';

                specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {
                    //Verify the number of task occurrences updated
                    let __occurrenceCount = Pages.cpSchedulerPage.getTheNumberOfTaskOccurrenceCreated(taskSeriesInfo.taskSeriesName);
                    expect(__occurrenceCount).toEqual(taskSeriesInfo.expectedNumberOfTaskOccurrences);
                
                    //Verify the status of the updated Occurrences
                    let __occurrencesStatus = Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(taskSeriesInfo.taskSeriesName);
                    expect(__occurrencesStatus).toEqual(taskSeriesInfo.expectedOcurrenceStatus);
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
});