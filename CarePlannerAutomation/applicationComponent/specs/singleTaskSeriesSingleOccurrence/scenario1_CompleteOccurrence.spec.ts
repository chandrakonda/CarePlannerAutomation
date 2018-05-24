import { browser } from 'protractor';
import { APILibraryController, Data, Pages, SpecFile, TestBase, TestCase, Utils } from '../../../applicationcomponent';
import { DataReader } from '../../../dataComponent/dataReaderHelper';
import { FrameworkComponent } from '../../../frameworkComponent';

describe('Test single task occurrence in single task series  -->  ', () => {

    describe('Verify complete action on each task series  -->  ', () => {
        let specFileData: SpecFile;
        let __data: Data;
        let __testCase: TestCase;
        let __dataReader: DataReader;
        let __utils: Utils;

        beforeAll(() => {
            specFileData = new SpecFile();
            __dataReader = new DataReader();
            __data = new Data();
            specFileData.Data = __data;
            specFileData.UserData = __dataReader.loadJsonData('userDataScenario1', 'singleTaskSeriesSingleOccurrence');
            specFileData.TestCases = new Array<TestCase>();
        });

        afterAll(() => {
           

            TestBase.GlobalData.SpecFiles.push(specFileData);
        });

        beforeEach(() => {
            __testCase = new TestCase();
            __utils = new Utils();
        });

        afterEach(() => {

            var myReporter = {
                specDone: (result) => {                 
                    __testCase = __utils.updateResultInformation(__testCase, result, specFileData);
                },
            };
            
            jasmine.getEnv().addReporter(myReporter);
            specFileData.TestCases.push(__testCase);
        });


        it('Verify the careplanner application launching by setting up the informations of client, pet and visit informations', async () => {
            try {

                //Data setup using API call
                //API call to create a data setup for client, patient & order the product to an appointment
                // await APILibraryController.careplannerLibrary.apiTestDataSetUpWithUserProductData(specFileData, 'singleItem', 'productList' );
                await APILibraryController.careplannerLibrary.apiTestDataSetUpWithUserProductData(specFileData);

                //Getting aggregated data to the specFileData
                await APILibraryController.careplannerLibrary.apiGetAggregatedDataByOrderId(specFileData);

                browser.sleep(5000);

                let __clientChartNumber = await FrameworkComponent.databaseHelper.executeQueryWithConfigDetails(TestBase.GlobalData.DBConfigDetails, "select ChartNumber from client where clientId = '" + specFileData.Data.Client.Id + "'");
                specFileData.Data.Client.ClientChartNumber = __clientChartNumber.rows[0][0];

                let __patinetChartNumber = await FrameworkComponent.databaseHelper.executeQueryWithConfigDetails(TestBase.GlobalData.DBConfigDetails, "select PatientChartNumber from patient where patientId = '" + specFileData.Data.Client.Patient.Id + "'");
                specFileData.Data.Client.Patient.PatientChartNumber = __patinetChartNumber.rows[0][0];

                //Verify the page Title
                let __pageTitle = await browser.getTitle().then((title) => { return title });
                await expect(__pageTitle).toEqual('VCA Charge Capture');

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the client & pet informations displayed in the careplanner banner', async () => {
            try {

                let __clientLastName = specFileData.Data.Client.LastName.slice(0, 13);
                let __patientName = specFileData.Data.Client.Patient.Name.slice(0, 13);
                let __speciesName = specFileData.Data.Client.Patient.Species;

                //Verify the Client Last Name
                await expect(Pages.cpClientAndPetDetailsPage.clientName).toContain(__clientLastName);

                //Veify the Patient Name 
                await expect(Pages.cpClientAndPetDetailsPage.petName).toContain(__patientName);

                //Veify the Species Name
                await expect(Pages.cpClientAndPetDetailsPage.speciesName).toContain(__speciesName);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the product category and task list displayed in the careplanner scheduler page', async () => {
            try {

                let __taskCategoryList = await APILibraryController.careplannerLibrary.getCategoryListFromAggregatedDataByOrderId(specFileData);

                //Verify the Category Count
                await expect(Pages.cpSchedulerPage.categoryCount).toEqual(__taskCategoryList.categoryList.length);

                //Verify the Task Count
                await expect(Pages.cpSchedulerPage.productTaskListCount).toEqual(__taskCategoryList.taskList.length);

                //Get the actual & full name of the task series from aggreagted data
                specFileData.UserData.TaskSeries.taskSeriesName = __taskCategoryList.taskList.filter(task => task.TaskName.substring(0, specFileData.UserData.TaskSeries.taskSeriesName.length) === specFileData.UserData.TaskSeries.taskSeriesName)[0].TaskName;
            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Schedule number of task occurrences for a each task series specified from the user data', async () => {
            try {

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;

                await Pages.cpSchedulerPage.scrollToLeftSchedulerGrid();

                //Schedule a task from the user input data
                await Pages.cpSchedulerPage.ScheduleTaskWithObservations(__taskSeriesInfo.taskSeriesName, __taskSeriesInfo.taskScheduleInfo);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the expected number of task occurrences scheduled for each task series specified from the user data', async () => {
            try {

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;
                let __taskScheduleInfo = __taskSeriesInfo.taskScheduleInfo;
                let __expectedResult = await Pages.cpSchedulerPage.calculateExpectedOccurrenceCountAndStatus(__taskScheduleInfo);

                //Verify the number of task occurrences created
                let __occurrenceCount = await Pages.cpSchedulerPage.getTheNumberOfTaskOccurrenceCreated(__taskSeriesInfo.taskSeriesName);
                FrameworkComponent.logHelper.info('Expected number of occurrence count after updating occurrence status is : ' + __expectedResult.expectedOccurrenceCount);
                FrameworkComponent.logHelper.info('Actual number of occurrence count after updating occurrence status is : ' + __occurrenceCount);
                expect(__occurrenceCount).toEqual(__expectedResult.expectedOccurrenceCount);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the expected task occurrence status for each task occurrences specified from the user data', async () => {
            try {

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;
                let __taskScheduleInfo = __taskSeriesInfo.taskScheduleInfo;
                let __expectedResult = await Pages.cpSchedulerPage.calculateExpectedOccurrenceCountAndStatus(__taskScheduleInfo);

                //Verify the status of the created Occurrences
                let __occurrencesStatus = await Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(__taskSeriesInfo.taskSeriesName);
                FrameworkComponent.logHelper.info('Expected status of all the occurrences after updating occurrence status are : ' + __expectedResult.expectedOccurrenceStatus);
                FrameworkComponent.logHelper.info('Actual status of all the occurrences after updating occurrence status are : ' + __occurrencesStatus);
                expect(__occurrencesStatus).toEqual(__expectedResult.expectedOccurrenceStatus);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Update the task occurrence action details for each task occurrences specified from the user data', () => {
            try {

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;

                //Edit & Update the status of the task occurrence
                Pages.cpSchedulerPage.updateOccurrenceDetailsWithObservations(__taskSeriesInfo.taskSeriesName, __taskSeriesInfo.taskOccurrenceInfo);
                browser.sleep(2000);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the expected task occurrence status for each task occurrences updated', async () => {
            try {

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;

                //Verify the status of the created Occurrences
                let __occurrenceHourStatus = await Pages.cpSchedulerPage.getTaskOccurrenceStatusByHour(__taskSeriesInfo.taskSeriesName, __taskSeriesInfo.taskOccurrenceInfo.occurrenceHour);
                FrameworkComponent.logHelper.info('Expected status of all the occurrences are : ' + __taskSeriesInfo.taskOccurrenceInfo.expectedOccurrenceStatus);
                FrameworkComponent.logHelper.info('Actual status of all the occurrences are : ' + __occurrenceHourStatus);
                expect(__occurrenceHourStatus).toEqual(__taskSeriesInfo.taskOccurrenceInfo.expectedOccurrenceStatus);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Navigate to treatment log page and verify the page information displayed in treatment log page', () => {
            try {

                Pages.cpClientAndPetDetailsPage.clickOnTreatmentLogButton();
                browser.sleep(3000);
                let __treatmentLogPageDisplayedStatus = Pages.cpTreatmentLogPage.isTreatmentLogPageLoaded();
                expect(__treatmentLogPageDisplayedStatus).toBe(true);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the treatment log table information (headers & column count)', async () => {
            try {

                let __treatmentLogColumnHeaders = await Pages.cpTreatmentLogPage.getTreatmentLogColumnHeaders();
                let __treatmentLogColumnHeadersCount = await Pages.cpTreatmentLogPage.getTreatmentLogColumnHeadersCount();
                expect(__treatmentLogColumnHeadersCount).toBe(6);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the scheduled time & completed time of each task occurrences updated in treatment log page', async () => {
            try {

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;
                let __treatmentLofInfo = await Pages.cpTreatmentLogPage.getTreatmentLogInformationAsList();

                let __scheduledTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Scheduled');
                let __completedTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Completed');
                let __treatmentDetailsIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Details');

                let __scheduleTime = __taskSeriesInfo.taskOccurrenceInfo.occurrenceHour;

                __treatmentLofInfo.filter(logInfo => logInfo[__treatmentDetailsIndex].includes(__taskSeriesInfo.taskSeriesName) && logInfo[__scheduledTimeIndex] === __scheduleTime).forEach(logInfo => {
                    expect(logInfo[__scheduledTimeIndex]).toBe(__scheduleTime);
                    expect(logInfo[__completedTimeIndex]).toBe(__scheduleTime);
                });

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the task occurrence status of each task occurrences updated in treatment log page', async () => {
            try {

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;
                let __treatmentLofInfo = await Pages.cpTreatmentLogPage.getTreatmentLogInformationAsList();
                let __scheduledTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Scheduled');
                let __treatmentStatusIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Status');
                let __treatmentDetailsIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Details');

                let __scheduleTime = __taskSeriesInfo.taskOccurrenceInfo.occurrenceHour;

                __treatmentLofInfo.filter(logInfo => logInfo[__treatmentDetailsIndex].includes(__taskSeriesInfo.taskSeriesName) && logInfo[__scheduledTimeIndex] === __scheduleTime).forEach(logInfo => {
                    expect(logInfo[__treatmentStatusIndex]).toBe(__taskSeriesInfo.taskOccurrenceInfo.occurrenceAction);
                });

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the task occurrence observation details of each task occurrences updated in the treatment log page', async () => {
            try {

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;
                let __treatmentLofInfo = await Pages.cpTreatmentLogPage.getTreatmentLogInformationAsList();
                let __scheduledTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Scheduled');
                let __treatmentDetailsIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Details');

                let __occurrenceScheduledTime = await Pages.cpSchedulerPage.getOccurrenceHoursToSchedule(__taskSeriesInfo.taskScheduleInfo);

                if (__taskSeriesInfo.taskScheduleInfo.observationList.length > 0) {

                    let __scheduleTime = ('0' + __occurrenceScheduledTime[__taskSeriesInfo.taskOccurrenceInfo.occurrenceHour]).slice(-2) + ':00';

                    __treatmentLofInfo.filter(logInfo => logInfo[__treatmentDetailsIndex].includes(__taskSeriesInfo.taskSeriesName) && logInfo[__scheduledTimeIndex] === __scheduleTime).forEach(logInfo => {
                        __taskSeriesInfo.taskOccurrenceInfo.observationList.forEach(observationList => {
                            let __expectedObservationValues = observationList + ': ' + __taskSeriesInfo.taskOccurrenceInfo.observationValues[observationList];
                            expect(logInfo[__treatmentDetailsIndex]).toContain(__expectedObservationValues);
                        });
                    });
                } else {
                    expect(__taskSeriesInfo.taskScheduleInfo.observationList.length).toBe(1);
                }

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Navigate to trend view page and verify information displayed in trendview page', () => {
            try {

                Pages.cpClientAndPetDetailsPage.clickOnTrendViewButton();
                browser.sleep(3000);
                let __trendViewPageDisplayedStatus = Pages.cpTrendViewPage.isTrendViewPageActive();

                expect(__trendViewPageDisplayedStatus).toBe(true);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the observation list & values of each task occurrences in the trend view page', async () => {
            try {

                let __completedTaskOccurrenceList = await Pages.cpSchedulerPage.getCompletedTaskOccurrenceDetailsList(specFileData);

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;

                if (__taskSeriesInfo.taskScheduleInfo.observationList.length > 0) {

                    let __scheduleTime = __taskSeriesInfo.taskOccurrenceInfo.occurrenceHour;

                    if (__taskSeriesInfo.taskOccurrenceInfo.occurrenceAction === 'Completed') {
                        let __expectedObservationValues = __taskSeriesInfo.taskOccurrenceInfo.observationValues;
                        let __actualObservationValues = await Pages.cpTrendViewPage.getObservationDetailsByTaskSeriesName(__taskSeriesInfo.taskSeriesInfo.taskSeriesName, __taskSeriesInfo.taskOccurrenceInfo.observationList, __scheduleTime);

                        for (let index = 0; index < __taskSeriesInfo.taskOccurrenceInfo.observationList.length; index++) {

                            FrameworkComponent.logHelper.info('Verifying the observation details of the task occurrence for task series name : ' + __taskSeriesInfo.taskSeriesInfo.taskSeriesName);
                            FrameworkComponent.logHelper.info('Observation Name : ' + __taskSeriesInfo.taskOccurrenceInfo.observationList[index]);
                            FrameworkComponent.logHelper.info('Expected Observation Value : ' + __expectedObservationValues[index]);
                            FrameworkComponent.logHelper.info('Actual Observation Value : ' + __actualObservationValues[index]);
                            expect(__expectedObservationValues[index]).toContain(__actualObservationValues[index]);
                        }
                    }
                } else {
                    expect(__taskSeriesInfo.taskScheduleInfo.observationList.length).toBe(0);
                }
            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });
    });
});
