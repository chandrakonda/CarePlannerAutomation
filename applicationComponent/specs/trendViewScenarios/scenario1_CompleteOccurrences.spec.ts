import { FrameworkComponent } from '../../../frameworkComponent';
import { SpecFile, Data, TestCase, TestBase, APILibraryController, Pages, TaskSeries, Product } from '../../../applicationcomponent'
import { browser } from 'protractor';
import { DataReader } from '../../../dataComponent/dataReaderHelper';


describe('Add a multi series product and schedule a task for all the task series', () => {

    describe('Complete a single occurrence of each task series', async () => {
        let specFileData: SpecFile;
        let __data: Data;
        let __testCase: TestCase;
        let __dataReader: DataReader;
        beforeAll(() => {
            specFileData = new SpecFile();
            __dataReader = new DataReader();
            __data = new Data();
            specFileData.Data = __data;
            specFileData.UserData = __dataReader.loadJsonData('userDataScenario1', 'multipleTaskSeries');
            specFileData.TestCases = new Array<TestCase>();
        });

        afterAll(() => {
            TestBase.GlobalData.SpecFiles.push(specFileData);
        });

        beforeEach(() => {
            __testCase = new TestCase();
        });

        afterEach(() => {
            if (__testCase.ExceptionDetails != null) {
                __testCase.TestResult = 'Fail';
            } else {
                __testCase.TestResult = 'Pass';
            }
            specFileData.TestCases.push(__testCase);
        });


        it('Data set up and client pet details', async () => {
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

        it('Verify the specified count and status of the task occurrence with the scheduled task series', () => {
            try {
                __testCase.TestName = 'Verify the specified count and status of the task occurrence with the scheduled task series';

                specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {

                    taskSeriesInfo.taskScheduleInfo.forEach(async taskScheduleInfo => {
                        let __expectedResult = await Pages.cpSchedulerPage.calculateExpectedOccurrenceCountAndStatus(taskScheduleInfo);

                        //Verify the number of task occurrences created
                        let __occurrenceCount = await Pages.cpSchedulerPage.getTheNumberOfTaskOccurrenceCreated(taskSeriesInfo.taskSeriesName);
                        FrameworkComponent.logHelper.info('Expected number of occurrence count after updating occurrence status is : ' + __expectedResult.expectedOccurrenceCount);
                        FrameworkComponent.logHelper.info('Actual number of occurrence count after updating occurrence status is : ' + __occurrenceCount);
                        expect(__occurrenceCount).toEqual(__expectedResult.expectedOccurrenceCount);

                        //Verify the status of the created Occurrences
                        let __occurrencesStatus = await Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(taskSeriesInfo.taskSeriesName);
                        FrameworkComponent.logHelper.info('Expected status of all the occurrences after updating occurrence status are : ' + __expectedResult.expectedOccurrenceStatus);
                        FrameworkComponent.logHelper.info('Actual status of all the occurrences after updating occurrence status are : ' + __occurrencesStatus);
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
                        let __occurrenceHourStatus = await Pages.cpSchedulerPage.getTaskOccurrenceStatusByHour(taskSeriesInfo.taskSeriesName, taskOccurrenceInfo.occurrenceHour);
                        FrameworkComponent.logHelper.info('Expected status of all the occurrences are : ' + taskOccurrenceInfo.expectedOccurrenceStatus);
                        FrameworkComponent.logHelper.info('Actual status of all the occurrences are : ' + __occurrenceHourStatus);
                        expect(__occurrenceHourStatus).toEqual(taskOccurrenceInfo.expectedOccurrenceStatus);
                    });

                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the treatment log page information', () => {
            try {
                __testCase.TestName = 'Verify the treatment log page information';

                Pages.cpClientAndPetDetailsPage.clickOnTreatmentLogButton();
                let __treatmentLogPageDisplayedStatus = Pages.cpTreatmentLogPage.isTreatmentLogPageLoaded();
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

                let __treatmentLofInfo = await Pages.cpTreatmentLogPage.getTreatmentLogInformationAsList().then(listValues => { return listValues.sort() });
                let __scheduledTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Scheduled');
                let __completedTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Completed');
                let __treatmentDetailsIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Details');

                specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {

                    taskSeriesInfo.taskOccurrenceInfo.forEach(async taskOccurrenceInfo => {

                        let __scheduleTime = taskOccurrenceInfo.occurrenceHour;

                        __treatmentLofInfo.filter(logInfo => logInfo[__treatmentDetailsIndex].includes(taskSeriesInfo.taskSeriesName) && logInfo[__scheduledTimeIndex] === __scheduleTime).forEach(logInfo => {
                            expect(logInfo[__scheduledTimeIndex]).toBe(__scheduleTime);
                            expect(logInfo[__completedTimeIndex]).toBe(__scheduleTime);
                        });
                    });
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the task occurrences status of each occurrence in the treatment log page', async () => {
            try {
                __testCase.TestName = 'Verify the task occurrences status of each occurrence in the treatment log page';

                let __treatmentLofInfo = await Pages.cpTreatmentLogPage.getTreatmentLogInformationAsList().then(listValues => { return listValues.sort() });
                let __scheduledTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Scheduled');
                let __treatmentStatusIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Status');
                let __treatmentDetailsIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Details');

                specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {

                    taskSeriesInfo.taskOccurrenceInfo.forEach(async taskOccurrenceInfo => {

                        let __scheduleTime = taskOccurrenceInfo.occurrenceHour;

                        __treatmentLofInfo.filter(logInfo => logInfo[__treatmentDetailsIndex].includes(taskSeriesInfo.taskSeriesName) && logInfo[__scheduledTimeIndex] === __scheduleTime).forEach(logInfo => {
                            expect(logInfo[__treatmentStatusIndex]).toBe(taskOccurrenceInfo.occurrenceAction);
                        })
                    });
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the task occurrence observation details for each of the occurrence completed in treatment log page', async () => {
            try {
                __testCase.TestName = 'Verify the task occurrence observation details for each of the occurrence completed in treatment log page';

                let __treatmentLofInfo = await Pages.cpTreatmentLogPage.getTreatmentLogInformationAsList().then(listValues => { return listValues.sort() });
                let __scheduledTimeIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Scheduled');
                let __treatmentDetailsIndex = await Pages.cpTreatmentLogPage.getTreatmentLogColumnIndex('Details');

                specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {

                    taskSeriesInfo.taskOccurrenceInfo.forEach(async taskOccurrenceInfo => {

                        let __scheduleTime = taskOccurrenceInfo.occurrenceHour;

                        __treatmentLofInfo.filter(logInfo => logInfo[__treatmentDetailsIndex].includes(taskSeriesInfo.taskSeriesName) && logInfo[__scheduledTimeIndex] === __scheduleTime).forEach(logInfo => {
                            expect(logInfo[__scheduledTimeIndex]).toBe(__scheduleTime);

                            taskOccurrenceInfo.observationList.forEach(observationList => {
                                let __expectedObservationValues = taskOccurrenceInfo.observationValues[taskOccurrenceInfo.observationList.indexOf(observationList)];
                                expect(logInfo[__treatmentDetailsIndex]).toContain(__expectedObservationValues);
                            });
                        })
                    });
                });

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the trend view page information', () => {
            try {
                __testCase.TestName = 'Verify the trend view page information';

                Pages.cpClientAndPetDetailsPage.clickOnTrendViewButton();

                browser.sleep(3000);

                let __trendViewPageDisplayedStatus = Pages.cpTrendViewPage.isTrendViewPageLoaded();

                expect(__trendViewPageDisplayedStatus).toBe(true);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        })

        it('Verify the observation list name & values', async () => {
            try {

                let __completedTaskOccurrenceList = await Pages.cpSchedulerPage.getCompletedTaskOccurrenceDetailsList(specFileData);

                specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {

                    taskSeriesInfo.taskOccurrenceInfo.forEach(async taskOccurrenceInfo => {

                        let __scheduleTime = taskOccurrenceInfo.occurrenceHour;

                        if (taskOccurrenceInfo.occurrenceAction === 'Completed') {
                            let __expectedObservationValues = taskOccurrenceInfo.observationValues;
                            let __actualObservationValues = await Pages.cpTrendViewPage.getObservationDetailsByTaskSeriesName(taskSeriesInfo.taskSeriesName, taskOccurrenceInfo.observationList, __scheduleTime);

                            for (let index = 0; index < taskOccurrenceInfo.observationList.length; index++) {

                                FrameworkComponent.logHelper.info('Verifying the observation details of the task occurrence for task series name : ' + taskSeriesInfo.taskSeriesName);
                                FrameworkComponent.logHelper.info('Observation Name : ' + taskOccurrenceInfo.observationList[index]);
                                expect(__expectedObservationValues[index]).toContain(__actualObservationValues[index]);
                            }
                        }
                    });
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        })

    });

});