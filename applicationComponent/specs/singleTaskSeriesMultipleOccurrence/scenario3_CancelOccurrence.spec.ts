import { FrameworkComponent } from '../../../frameworkComponent';
import { SpecFile, Data, TestCase, TestBase, APILibraryController, Pages, TaskSeries, Product } from  '../../../applicationcomponent'
import { browser } from 'protractor';
import { DataReader } from '../../../dataComponent/dataReaderHelper';


describe('schedule task occurrence and perform a action from user input', async () => {
    
    let specFileData: SpecFile;
    let __data: Data;
    let __testCase: TestCase;
    let __dataReader : DataReader;    

    beforeAll( () => {    
        specFileData = new SpecFile();
        __dataReader = new DataReader();
        __data = new Data();
        specFileData.Data = __data;
        specFileData.UserData  = __dataReader.loadJsonData('userDataScenario3','singleTaskMultipleOccurrence');        
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

    it('Data Preparation', async () => {
        try {
            __testCase.TestName = 'Create Client, Patient, Appointment and add product to it ';

            //API call to create a data setup for client, patient & order the product to an appointment
            await APILibraryController.careplannerLibrary.apiTestDataSetUpWithUserProductData(specFileData, 'singleItem', 'productList' );

            //Get the aggregated data (category & task series details of the product) for the visit created 
            await APILibraryController.careplannerLibrary.apiGetAggregatedDataByOrderId(specFileData);
            
        } catch (error) {
            __testCase.ExceptionDetails = error;
        }
    });

    it('Verifying the category count and product task list', async () => {
        try {
            __testCase.TestName = "Verifying the category count and product task list";

            let __taskCategoryList = await APILibraryController.careplannerLibrary.getCategoryListFromAggregatedDataByOrderId(specFileData);
            FrameworkComponent.logHelper.info("List of categories observed from the aggregated data : " + __taskCategoryList.categoryList);
            FrameworkComponent.logHelper.info("List of task series observed from the aggregated data : " + __taskCategoryList.taskList);

            //Verify the Category Count
            await expect(Pages.cpSchedulerPage.categoryCount).toEqual(__taskCategoryList.categoryList.length);
            
            //Verify the Task Count
            await expect(Pages.cpSchedulerPage.productTaskListCount).toEqual(__taskCategoryList.taskList.length);

            //Get the actual & full name of the task series from aggreagted data
            specFileData.UserData.TaskSeries.taskSeriesName = __taskCategoryList.taskList.filter(task=> task.substring(0, specFileData.UserData.TaskSeries.taskSeriesName.length) === specFileData.UserData.TaskSeries.taskSeriesName)[0];

        } catch (error) {
            __testCase.ExceptionDetails = error;
        }            
    });

    it('Schedule a specified number of tasks for a each task series', async () => {
        try {
            __testCase.TestName = 'Schedule a specified number of tasks for a each task series';
            
            let __taskSeriesInfo = specFileData.UserData.TaskSeries;            

            //Schedule a task from the user input data
            await Pages.cpSchedulerPage.ScheduleTaskWithObservations(__taskSeriesInfo.taskSeriesName, __taskSeriesInfo.taskScheduleInfo);

        } catch (error) {                
            __testCase.ExceptionDetails = error;
        }            
    });

    it('Verify the specified count and status of the task occurrence with the scheduled task series', async ()=> {
        try {
            __testCase.TestName = 'Verify the specified count and status of the task occurrence with the scheduled task series';

            let __taskSeriesInfo = specFileData.UserData.TaskSeries;
            let __taskScheduleInfo = __taskSeriesInfo.taskScheduleInfo;
            let __expectedResult = await Pages.cpSchedulerPage.calculateExpectedOccurrenceCountAndStatus(__taskScheduleInfo);
        
            //Verify the number of task occurrences created
            let __occurrenceCount = await Pages.cpSchedulerPage.getTheNumberOfTaskOccurrenceCreated(__taskSeriesInfo.taskSeriesName);
            FrameworkComponent.logHelper.info('Expected number of occurrence count after updating occurrence status is : ' + __expectedResult.expectedOccurrenceCount);
            FrameworkComponent.logHelper.info('Actual number of occurrence count after updating occurrence status is : ' + __occurrenceCount);
            expect(__occurrenceCount).toEqual(__expectedResult.expectedOccurrenceCount);
        
            //Verify the status of the created Occurrences
            let __occurrencesStatus = await Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(__taskSeriesInfo.taskSeriesName);
            FrameworkComponent.logHelper.info('Expected status of all the occurrences after updating occurrence status are : ' + __expectedResult.expectedOccurrenceStatus);
            FrameworkComponent.logHelper.info('Actual status of all the occurrences after updating occurrence status are : ' + __occurrencesStatus );
            expect(__occurrencesStatus).toEqual(__expectedResult.expectedOccurrenceStatus);
                
        } catch (error) {
            __testCase.ExceptionDetails = error;
        }            
    });
        
    it('Edit and update the task occurrence to the specified task occurrence status with observation details', () => {
        try {

            __testCase.TestName = 'Edit and update the task occurrence to the specified task occurrence status with observation details';

            let __taskSeriesInfo = specFileData.UserData.TaskSeries;

            __taskSeriesInfo.taskOccurrenceInfo.forEach(taskOccurrenceInfo => {
                //Edit & Update the status of the task occurrence
                Pages.cpSchedulerPage.updateOccurrenceDetailsWithObservations(__taskSeriesInfo.taskSeriesName, taskOccurrenceInfo);
                browser.sleep(2000);
            });
            
        } catch (error) {
            __testCase.ExceptionDetails = error;
        }            
    });

    it('Verify the specified count and status of the task occurrences with the updated task series', async () => {
        try {
            __testCase.TestName = 'Verify the specified count and status of the task occurrences with the updated task series';

            let __taskSeriesInfo = specFileData.UserData.TaskSeries;

            let __occurrenceScheduledTime = await Pages.cpSchedulerPage.getOccurrenceHoursToSchedule(__taskSeriesInfo.taskScheduleInfo);
            let __expectedOccurrenceCount = Number(__occurrenceScheduledTime.length) - Number(__taskSeriesInfo.taskOccurrenceInfo.length);
            let __occurrencesStatus = await Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(__taskSeriesInfo.taskSeriesName);

            expect(__occurrencesStatus.length).toBe(__expectedOccurrenceCount);

        } catch (error) {
            __testCase.ExceptionDetails = error;
        }
    });
});