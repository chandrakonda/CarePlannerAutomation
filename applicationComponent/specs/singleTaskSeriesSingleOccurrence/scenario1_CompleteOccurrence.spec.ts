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
        specFileData.UserData  = __dataReader.loadJsonData('userDataScenario1','singleTaskSeriesSingleOccurrence');        
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
            // await APILibraryController.careplannerLibrary.apiTestDataSetUpWithUserProductData(specFileData, 'singleItem', 'productList' );
            await APILibraryController.careplannerLibrary.apiTestDataSetUpWithUserProductData(specFileData);

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

            //Edit & Update the status of the task occurrence
            Pages.cpSchedulerPage.updateOccurrenceDetailsWithObservations(__taskSeriesInfo.taskSeriesName, __taskSeriesInfo.taskOccurrenceInfo);
            browser.sleep(2000);
            
        } catch (error) {
            __testCase.ExceptionDetails = error;
        }            
    });

    it('Verify the specified count and status of the task occurrences with the updated task series', async () => {
        try {
            __testCase.TestName = 'Verify the specified count and status of the task occurrences with the updated task series';

            let __taskSeriesInfo = specFileData.UserData.TaskSeries;

            //Verify the status of the created Occurrences
            let __occurrencesStatus = await Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(__taskSeriesInfo.taskSeriesName);
            FrameworkComponent.logHelper.info('Expected status of all the occurrences are : ' + __taskSeriesInfo.taskOccurrenceInfo.expectedOccurrenceStatus);
            FrameworkComponent.logHelper.info('Actual status of all the occurrences are : ' + __occurrencesStatus[__taskSeriesInfo.taskOccurrenceInfo.occurrenceIndex]);
            expect(__occurrencesStatus[__taskSeriesInfo.taskOccurrenceInfo.occurrenceIndex]).toEqual(__taskSeriesInfo.taskOccurrenceInfo.expectedOccurrenceStatus);
            
        } catch (error) {
            __testCase.ExceptionDetails = error;
        }
    });

    it('Verify the treatment log page information', () => {
        try {
            __testCase.TestName = 'Verify the treatment log page information';

           Pages.cpClientAndPetDetailsPage.clickOnTreatmentLogButton();

            browser.sleep(3000);

            let __treatmentLogPageDisplayedStatus = Pages.cpTreatmentLogPage.isTreatmentLogPageLoaded();
            
            FrameworkComponent.logHelper.info(__treatmentLogPageDisplayedStatus)

            expect(__treatmentLogPageDisplayedStatus).toBe(true);

        } catch (error) {
            __testCase.ExceptionDetails = error;
        }
    });

    it('Verify the treatment log page table headers and count', async () => {
        try {
            
            __testCase.TestName = 'Verify the treatment log page table headers and count';

            let __treatmentLogColumnHeaders = await Pages.cpTreatmentLogPage.getTreatmentLogColumnHeaders();
            let __treatmentLogColumnHeadersCount = await Pages.cpTreatmentLogPage.getTreatmentLogColumnHeadersCount();

            expect(__treatmentLogColumnHeadersCount).toBe(6);
        } catch (error) {
             __testCase.ExceptionDetails = error;
        }
    });

    it('Verify the task occurrence scheduled time & completed time of each occurrence in the treatment log page', async () => {
        try {
            __testCase.TestName = 'Verify the task occurrence scheduled time & completed time of each occurrence in the treatment log page';

            let __taskSeriesInfo = specFileData.UserData.TaskSeries;
            let __treatmentLofInfo = await Pages.cpTreatmentLogPage.getTreatmentLogInformationAsList();

            let __scheduledTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Scheduled');
            let __completedTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Completed');
            let __treatmentDetailsIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Details');

            let __scheduleTime = ('0' + __taskSeriesInfo.taskScheduleInfo.scheduleStartTime).slice(-2) + ':00';

            __treatmentLofInfo.filter(logInfo => logInfo[__treatmentDetailsIndex].includes(__taskSeriesInfo.taskSeriesName) && logInfo[__scheduledTimeIndex] === __scheduleTime).forEach(logInfo => {
                FrameworkComponent.logHelper.info('Actual : ' + __treatmentLofInfo[__scheduledTimeIndex]);
                FrameworkComponent.logHelper.info('Expected : ' + __scheduleTime);
                expect(logInfo[__scheduledTimeIndex]).toBe(__scheduleTime);
                
                FrameworkComponent.logHelper.info('Actual : ' + __treatmentLofInfo[__completedTimeIndex]);
                FrameworkComponent.logHelper.info('Expected : ' + __scheduleTime);
                expect(logInfo[__completedTimeIndex]).toBe(__scheduleTime);

            });
            
           
            
        } catch (error) {
            __testCase.ExceptionDetails = error;
        }        
    });

    it('Verify the task occurrences status of each occurrence in the treatment log page', async () => {
        try {
            __testCase.TestName = 'Verify the task occurrences status of each occurrence in the treatment log page';

            let __taskSeriesInfo = specFileData.UserData.TaskSeries;
            let __treatmentLofInfo = await Pages.cpTreatmentLogPage.getTreatmentLogInformationAsList();
            let __scheduledTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Scheduled');
            let __treatmentStatusIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Status');
            let __treatmentDetailsIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Details');

            let __scheduleTime = ('0' + __taskSeriesInfo.taskScheduleInfo.scheduleStartTime).slice(-2) + ':00';

            __treatmentLofInfo.filter(logInfo => logInfo[__treatmentDetailsIndex].includes(__taskSeriesInfo.taskSeriesName) && logInfo[__scheduledTimeIndex] === __scheduleTime).forEach(logInfo => {
                FrameworkComponent.logHelper.info('Actual : ' + __treatmentLofInfo[__treatmentStatusIndex]);
                FrameworkComponent.logHelper.info('Expected : ' + __taskSeriesInfo.taskOccurrenceInfo.occurrenceAction);
                expect(logInfo[__treatmentStatusIndex]).toBe(__taskSeriesInfo.taskOccurrenceInfo.occurrenceAction);
            });
        } catch (error) {
            __testCase.ExceptionDetails = error;
        }        
    });

    it('Verify the task occurrence observation details for each of the occurrence completed in treatment log page', async () => {
        try {
            __testCase.TestName = 'Verify the task occurrence observation details for each of the occurrence completed in treatment log page';

            let __taskSeriesInfo = specFileData.UserData.TaskSeries;
            let __treatmentLofInfo = await Pages.cpTreatmentLogPage.getTreatmentLogInformationAsList();
            let __scheduledTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Scheduled');
            let __treatmentDetailsIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Details');

            let __scheduleTime = ('0' + __taskSeriesInfo.taskScheduleInfo.scheduleStartTime).slice(-2) + ':00';
            __treatmentLofInfo.filter(logInfo => logInfo[__treatmentDetailsIndex].includes(__taskSeriesInfo.taskSeriesName) && logInfo[__scheduledTimeIndex] === __scheduleTime).forEach(logInfo => {
                __taskSeriesInfo.taskOccurrenceInfo.observationList.forEach(observationList => {
                                let __expectedObservationValues = observationList + ': '+ __taskSeriesInfo.taskOccurrenceInfo.observationValues[observationList];
                                expect(logInfo[__treatmentDetailsIndex]).toContain(__expectedObservationValues);                                
                });
            });
        } catch (error) {
            __testCase.ExceptionDetails = error;
        }
    });

    // it('Verify the observation details provided', async () => {

    //     __testCase.TestName = 'Verify the schedule information on the treatment log page';

    //     let __taskSeriesInfo = specFileData.UserData.TaskSeries;
    //     let __treatmentLofInfo = await Pages.cpTreatmentLogPage.getTreatmentLogInfo();
    //     let __treatmentDetailsIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Details');
    //     let __treatmentDetails = __treatmentLofInfo[__treatmentDetailsIndex];

    //     FrameworkComponent.logHelper.info(__treatmentDetails);

    //     let __treatmentLogDetailsBySeriesName = await Pages.cpTreatmentLogPage.getTreatmentLogByTaskSeriesName(__taskSeriesInfo.taskSeriesName);
    //     FrameworkComponent.logHelper.info(__treatmentLogDetailsBySeriesName);

    // });
});