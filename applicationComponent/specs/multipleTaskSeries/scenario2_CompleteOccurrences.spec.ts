import { FrameworkComponent } from '../../../frameworkComponent';
import { SpecFile, Data, TestCase, TestBase, APILibraryController, Pages, TaskSeries, Product } from  '../../../applicationcomponent'
import { browser } from 'protractor';
import { DataReader } from '../../../dataComponent/dataReaderHelper';


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
            specFileData.UserData  = __dataReader.loadJsonData('userDataScenario2','multipleTaskSeries');
            FrameworkComponent.logHelper.info(specFileData.UserData);
            specFileData.TestCases = new Array<TestCase>();
            
        });

        afterAll( () => {
            TestBase.GlobalData.SpecFiles.push(specFileData);            
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

                await APILibraryController.careplannerLibrary.apiGetAggregatedDataByOrderId(specFileData);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verifying the category count and product task list', async () => {
            try {
                __testCase.TestName = "Verifying the category count and product task list";

                let __taskCategoryList = await APILibraryController.careplannerLibrary.getCategoryListFromAggregatedDataByOrderId(specFileData);
                
                //Verify the Category Count
                await expect(Pages.cpSchedulerPage.categoryCount).toEqual(__taskCategoryList.categoryList.length);
                
                //Verify the Task Count
                await expect(Pages.cpSchedulerPage.productTaskListCount).toEqual(__taskCategoryList.taskList.length);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }            
        });

        it('Schedule a specified number of tasks for a each task series', () => {
            try {
                __testCase.TestName = 'Schedule a specified number of tasks for a each task series';

                //Schedule a task from the user input data
                specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {

                    taskSeriesInfo.taskScheduleInfo.forEach(taskScheduleInfo => {

                        Pages.cpSchedulerPage.ScheduleTaskWithObservations(taskSeriesInfo.taskSeriesName, taskScheduleInfo);    

                    });                    
                });
            } catch (error) {                
                __testCase.ExceptionDetails = error;
            }            
        });

        it('Verify the specified count and status of the task occurrence with the scheduled task series', ()=> {
            try {
                __testCase.TestName = 'Verify the specified count and status of the task occurrence with the scheduled task series';

                specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {

                    taskSeriesInfo.taskScheduleInfo.forEach(async taskScheduleInfo => {
                        let __expectedResult = Pages.cpSchedulerPage.calculateExpectedOccurrenceCountAndStatus(taskScheduleInfo);
                    
                        //Verify the number of task occurrences created
                        let __occurrenceCount = await Pages.cpSchedulerPage.getTheNumberOfTaskOccurrenceCreated(taskSeriesInfo.taskSeriesName);
                        FrameworkComponent.logHelper.info('Expected number of occurrence count after updating occurrence status is : ' + __expectedResult.expectedOccurrenceCount);
                        FrameworkComponent.logHelper.info('Actual number of occurrence count after updating occurrence status is : ' + __occurrenceCount);
                        expect(__occurrenceCount).toEqual(__expectedResult.expectedOccurrenceCount);
                    
                        //Verify the status of the created Occurrences
                        let __occurrencesStatus = await Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(taskSeriesInfo.taskSeriesName);
                        FrameworkComponent.logHelper.info('Expected status of all the occurrences after updating occurrence status are : ' + __expectedResult.expectedOccurrenceStatus);
                        FrameworkComponent.logHelper.info('Actual status of all the occurrences after updating occurrence status are : ' + __occurrencesStatus );
                        expect(__occurrencesStatus).toEqual(__expectedResult.expectedOccurrenceStatus);
                    });
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }            
        });

        it('Edit and update the task occurrence to the specified task occurrence status with observation details', () => {
            try {

                __testCase.TestName = 'Edit and update the task occurrence to the specified task occurrence status with observation details';

                specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {
                    
                    taskSeriesInfo.taskOccurrenceInfo.forEach(taskOccurrenceInfo => {
                        //Edit & Update the status of the task occurrence
                        Pages.cpSchedulerPage.updateOccurrenceDetailsWithObservations(taskSeriesInfo.taskSeriesName, taskOccurrenceInfo);
                        browser.sleep(2000);
                    });
                  
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }            
        });

        it('Verify the specified count and status of the task occurrences with the updated task series', () => {
            try {
                __testCase.TestName = 'Verify the specified count and status of the task occurrences with the updated task series';

                specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {

                    taskSeriesInfo.taskOccurrenceInfo.forEach(async taskOccurrenceInfo => {

                        //Verify the status of the created Occurrences
                        let __occurrencesStatus = await Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(taskSeriesInfo.taskSeriesName);
                        FrameworkComponent.logHelper.info('Expected status of all the occurrences are : ' + taskOccurrenceInfo.expectedOccurrenceStatus);
                        FrameworkComponent.logHelper.info('Actual status of all the occurrences are : ' + __occurrencesStatus[taskOccurrenceInfo.occurrenceIndex]);
                        expect(__occurrencesStatus[taskOccurrenceInfo.occurrenceIndex]).toEqual(taskOccurrenceInfo.expectedOccurrenceStatus);
                    });
                   
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });
    });

});