import { browser } from 'protractor';
import { APILibraryController, Data, Pages, SpecFile, TestBase, TestCase } from '../../../applicationcomponent';
import { DataReader } from '../../../dataComponent/dataReaderHelper';
import { FrameworkComponent } from '../../../frameworkComponent';


describe('Test multiple task occurrence in single task series  -->  ', () => {

    describe('Verify cancel action on each task series  -->  ', () => {
        let specFileData: SpecFile;
        let __data: Data;
        let __testCase: TestCase;
        let __dataReader: DataReader;
        beforeAll(() => {
            specFileData = new SpecFile();
            __dataReader = new DataReader();
            __data = new Data();
            specFileData.Data = __data;
            specFileData.UserData = __dataReader.loadJsonData('userDataScenario3', 'singleTaskMultipleOccurrence');
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

                //Data setup using API call
                //API call to create a data setup for client, patient & order the product to an appointment
                // await APILibraryController.careplannerLibrary.apiTestDataSetUpWithUserProductData(specFileData, 'singleItem', 'productList' );
                await APILibraryController.careplannerLibrary.apiTestDataSetUpWithUserProductData(specFileData);

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

                //Get the actual & full name of the task series from aggreagted data
                specFileData.UserData.TaskSeries.taskSeriesName = __taskCategoryList.taskList.filter(task => task.TaskName.substring(0, specFileData.UserData.TaskSeries.taskSeriesName.length) === specFileData.UserData.TaskSeries.taskSeriesName)[0].TaskName;
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Schedule number of task occurrences for a each task series specified from the user data', async () => {
            try {
                __testCase.TestName = 'Schedule number of task occurrences for a each task series specified from the user data';

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;

                //Schedule a task from the user input data
                await Pages.cpSchedulerPage.ScheduleTaskWithObservations(__taskSeriesInfo.taskSeriesName, __taskSeriesInfo.taskScheduleInfo);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the expected number of task occurrences scheduled for each task series specified from the user data', async () => {
            try {
                __testCase.TestName = 'Verify the expected number of task occurrences scheduled for each task series specified from the user data';

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;
                let __taskScheduleInfo = __taskSeriesInfo.taskScheduleInfo;
                let __expectedResult = await Pages.cpSchedulerPage.calculateExpectedOccurrenceCountAndStatus(__taskScheduleInfo);

                //Verify the number of task occurrences created
                let __occurrenceCount = await Pages.cpSchedulerPage.getTheNumberOfTaskOccurrenceCreated(__taskSeriesInfo.taskSeriesName);
                FrameworkComponent.logHelper.info('Expected number of occurrence count after updating occurrence status is : ' + __expectedResult.expectedOccurrenceCount);
                FrameworkComponent.logHelper.info('Actual number of occurrence count after updating occurrence status is : ' + __occurrenceCount);
                expect(__occurrenceCount).toEqual(__expectedResult.expectedOccurrenceCount);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Verify the expected task occurrence status for each task occurrences specified from the user data', async () => {
            try {
                __testCase.TestName = 'Verify the expected task occurrence status for each task occurrences specified from the user data';

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;
                let __taskScheduleInfo = __taskSeriesInfo.taskScheduleInfo;
                let __expectedResult = await Pages.cpSchedulerPage.calculateExpectedOccurrenceCountAndStatus(__taskScheduleInfo);

                //Verify the status of the created Occurrences
                let __occurrencesStatus = await Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(__taskSeriesInfo.taskSeriesName);
                FrameworkComponent.logHelper.info('Expected status of all the occurrences after updating occurrence status are : ' + __expectedResult.expectedOccurrenceStatus);
                FrameworkComponent.logHelper.info('Actual status of all the occurrences after updating occurrence status are : ' + __occurrencesStatus);
                expect(__occurrencesStatus).toEqual(__expectedResult.expectedOccurrenceStatus);

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Update the task occurrence action details for each task occurrences specified from the user data', () => {
            try {

                __testCase.TestName = 'Update the task occurrence action details for each task occurrences specified from the user data';

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

        it('Verify the expected task occurrence status for each task occurrences updated', async () => {
            try {
                __testCase.TestName = 'Verify the specified count and status of the task occurrences with the updated task series';

                let __taskSeriesInfo = specFileData.UserData.TaskSeries;

                let __occurrenceScheduledTime = await Pages.cpSchedulerPage.getOccurrenceHoursToSchedule(__taskSeriesInfo.taskScheduleInfo);
                let __expectedOccurrenceCount = Number(__occurrenceScheduledTime.length) - Number(__taskSeriesInfo.taskOccurrenceInfo.length);
                let __occurrencesStatus = await Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(__taskSeriesInfo.taskSeriesName);

                expect(__occurrencesStatus.length).toBe(__expectedOccurrenceCount);


                // __taskSeriesInfo.taskOccurrenceInfo.forEach(async taskOccurrenceInfo => {
                //     //Verify the status of the created Occurrences
                //     let __occurrenceHourStatus = await Pages.cpSchedulerPage.getTaskOccurrenceStatusByHour(__taskSeriesInfo.taskSeriesName, taskOccurrenceInfo.occurrenceHour);
                //     FrameworkComponent.logHelper.info('Expected status of all the occurrences are : ' + taskOccurrenceInfo.expectedOccurrenceStatus);
                //     FrameworkComponent.logHelper.info('Actual status of all the occurrences are : ' + __occurrenceHourStatus);
                //     expect(__occurrenceHourStatus).toEqual(taskOccurrenceInfo.expectedOccurrenceStatus);
                // });

            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

    });

});