import { FrameworkComponent } from '../../../frameworkComponent';
import { SpecFile, Data, TestCase, TestBase, APILibraryController, Pages, TaskSeries, Product } from '../../../applicationcomponent'
import { browser } from 'protractor';
import { DataReader } from '../../../dataComponent/dataReaderHelper';


describe('Test multiple task occurrence in multiple task series  -->  ', () => {

    describe('Verify complete action on each task series  -->  ', () => {
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
            var myReporter = {                

                specDone: function (result) {
                    __testCase.TestName = result.description;
                    __testCase.TestResult = result.status;
                    __testCase.ExceptionDetails = result.failedExpectations.length ? result.failedExpectations[0].message : '';
                    __testCase.StartTime = result.started;
                    __testCase.EndTime = result.stopped;
                },
            };

            jasmine.getEnv().addReporter(myReporter);
            specFileData.TestCases.push(__testCase);
        });


        it('Verify the careplanner application launching by setting up the informations of client, pet and visit informations', async () => {
            try {
                __testCase.TestName = 'Verify the careplanner application launching by setting up the informations of client, pet and visit informations';

                // FrameworkComponent.logHelper.info(jasmine.getEnv().currentSpec.description);

                //Data setup using API call
                await APILibraryController.careplannerLibrary.apiTestDataSetUpWithDefaultData(specFileData);

                //Getting aggregated data to the specFileData
                await APILibraryController.careplannerLibrary.apiGetAggregatedDataByOrderId(specFileData);

                browser.sleep(5000);

                //Verify the page Title
                let __pageTitle = await browser.getTitle().then((title) => { return title });
                await expect(__pageTitle).toEqual('VCA Charge Capture');

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the client & pet informations displayed in the careplanner banner', async () => {
            try {
                __testCase.TestName = "Verify the client & pet informations displayed in the careplanner banner";

                // let _clientLastName = specFileData.Data.Client.LastName.length >= 12 ? specFileData.Data.Client.LastName.slice(0, 12) + '…' : specFileData.Data.Client.LastName;
                // let _patientName = specFileData.Data.Client.Patient.Name.length >= 12 ? specFileData.Data.Client.Patient.Name.slice(0, 12) + '…' : specFileData.Data.Client.Patient.Name;
                let _clientLastName = specFileData.Data.Client.LastName.slice(0, 12);
                let _patientName = specFileData.Data.Client.Patient.Name.slice(0, 12);
                let speciesName = specFileData.Data.Client.Patient.Species;

                //Verify the Client Last Name
                await expect(Pages.cpClientAndPetDetailsPage.clientName).toContain(_clientLastName);

                //Veify the Patient Name 
                await expect(Pages.cpClientAndPetDetailsPage.petName).toContain(_patientName);

                //Veify the Species Name
                await expect(Pages.cpClientAndPetDetailsPage.speciesName).toContain(speciesName);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the product category and task list displayed in the careplanner scheduler page', async () => {
            try {
                __testCase.TestName = "Verify the product category and task list displayed in the careplanner scheduler page";

                let __taskCategoryList = await APILibraryController.careplannerLibrary.getCategoryListFromAggregatedDataByOrderId(specFileData);

                //Verify the Category Count
                await expect(Pages.cpSchedulerPage.categoryCount).toEqual(__taskCategoryList.categoryList.length);

                //Verify the Task Count
                await expect(Pages.cpSchedulerPage.productTaskListCount).toEqual(__taskCategoryList.taskList.length);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Schedule number of task occurrences for a each task series specified from the user data', () => {
            try {
                __testCase.TestName = 'Schedule number of task occurrences for a each task series specified from the user data';

                specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {

                    taskSeriesInfo.taskScheduleInfo.forEach(taskScheduleInfo => {

                        //Schedule a list of task occurrences for the given task series
                        Pages.cpSchedulerPage.ScheduleTaskWithObservations(taskSeriesInfo.taskSeriesName, taskScheduleInfo);

                    });
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the expected number of task occurrences scheduled for each task series specified from the user data', () => {
            try {
                __testCase.TestName = 'Verify the expected number of task occurrences scheduled for each task series specified from the user data';

                specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {

                    taskSeriesInfo.taskScheduleInfo.forEach(async taskScheduleInfo => {

                        //Get the task occurrence count and status
                        let __expectedResult = await Pages.cpSchedulerPage.calculateExpectedOccurrenceCountAndStatus(taskScheduleInfo);

                        //Verify the number of task occurrences created
                        let __occurrenceCount = await Pages.cpSchedulerPage.getTheNumberOfTaskOccurrenceCreated(taskSeriesInfo.taskSeriesName);
                        FrameworkComponent.logHelper.info('Expected number of occurrence count after updating occurrence status is : ' + __expectedResult.expectedOccurrenceCount);
                        FrameworkComponent.logHelper.info('Actual number of occurrence count after updating occurrence status is : ' + __occurrenceCount);
                        expect(__occurrenceCount).toEqual(__expectedResult.expectedOccurrenceCount);

                    });
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the expected task occurrence status for each task occurrences specified from the user data', () => {
            try {
                __testCase.TestName = 'Verify the expected task occurrence status for each task occurrences specified from the user data';

                specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {

                    taskSeriesInfo.taskScheduleInfo.forEach(async taskScheduleInfo => {

                        //Get the task occurrence count and status
                        let __expectedResult = await Pages.cpSchedulerPage.calculateExpectedOccurrenceCountAndStatus(taskScheduleInfo);

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

        it('Update the task occurrence action details for each task occurrences specified from the user data', () => {
            try {

                __testCase.TestName = 'Update the task occurrence action details for each task occurrences specified from the user data';

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

        it('Verify the expected task occurrence status for each task occurrences updated', () => {
            try {
                __testCase.TestName = 'Verify the expected task occurrence status for each task occurrences updated';

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

        it('Navigate to treatment log page and verify the page information displayed in treatment log page', () => {
            try {
                __testCase.TestName = 'Navigate to treatment log page and verify the page information displayed in treatment log page';

                Pages.cpClientAndPetDetailsPage.clickOnTreatmentLogButton();
                let __treatmentLogPageDisplayedStatus = Pages.cpTreatmentLogPage.isTreatmentLogPageLoaded();
                expect(__treatmentLogPageDisplayedStatus).toBe(true);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the treatment log table information (headers & column count)', async () => {
            try {
                __testCase.TestName = 'Verify the treatment log table information (headers & column count)';

                let __treatmentLogColumnHeaders = await Pages.cpTreatmentLogPage.getTreatmentLogColumnHeaders();
                let __treatmentLogColumnHeadersCount = await Pages.cpTreatmentLogPage.getTreatmentLogColumnHeadersCount();
                expect(__treatmentLogColumnHeadersCount).toBe(6);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the scheduled time & completed time of each task occurrences updated in treatment log page', async () => {
            try {
                __testCase.TestName = 'Verify the scheduled time & completed time of each task occurrences updated in treatment log page';

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

        it('Verify the task occurrence status of each task occurrences updated in treatment log page', async () => {
            try {
                __testCase.TestName = 'Verify the task occurrence status of each task occurrences updated in treatment log page';

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

        it('Verify the task occurrence observation details of each task occurrences updated in the treatment log page', async () => {
            try {
                __testCase.TestName = 'Verify the task occurrence observation details of each task occurrences updated in the treatment log page';

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

        it('Navigate to trend view page and verify information displayed in trendview page', () => {
            try {
                __testCase.TestName = 'Navigate to trend view page and verify information displayed in trendview page';

                Pages.cpClientAndPetDetailsPage.clickOnTrendViewButton();
                browser.sleep(3000);
                let __trendViewPageDisplayedStatus = Pages.cpTrendViewPage.isTrendViewPageLoaded();

                expect(__trendViewPageDisplayedStatus).toBe(true);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the observation list & values of each task occurrences in the trend view page', async () => {
            try {
                __testCase.TestName = 'Verify the observation list & values of each task occurrences in the trend view page';

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
                                FrameworkComponent.logHelper.info('Expected Observation Value : ' + __expectedObservationValues[index]);
                                FrameworkComponent.logHelper.info('Actual Observation Value : ' + __actualObservationValues[index]);
                                expect(__expectedObservationValues[index]).toContain(__actualObservationValues[index]);
                            }
                        }
                    });
                });
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

    });

});