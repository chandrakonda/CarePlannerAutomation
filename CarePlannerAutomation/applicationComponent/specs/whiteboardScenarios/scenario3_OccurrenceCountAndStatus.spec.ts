import { browser } from 'protractor';
import { APILibraryController, Data, Pages, SpecFile, TestBase, TestCase, Utils } from '../../../applicationcomponent';
import { DataReader } from '../../../dataComponent/dataReaderHelper';
import { FrameworkComponent } from '../../../frameworkComponent';

describe('Test whiteboard scenarios  -->  ', () => {

    describe('Verify the number of overdue task count displayed in the whiteboard for a filtered patient -->  ', () => {
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
            specFileData.UserData = __dataReader.loadJsonData('userDataScenario3', 'whiteboard');
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
                await APILibraryController.careplannerLibrary.apiTestDataSetUpWithDefaultData(specFileData);

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

                expect(await Pages.cpSchedulerPage.IsAtSchedulerPage()).toBe(true);

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

        it('Select the technician and location details', async () => {
            try {
                let __technicianName = 'Me';
                let __locationName = 'Cat- Double Occupancy';

                await Pages.cpClientAndPetDetailsPage.selectTechnicianFromDropDown(__technicianName);
                await browser.sleep(2000);

                let __technicianNameSelected = await Pages.cpClientAndPetDetailsPage.selectedTechnicianName;
                FrameworkComponent.logHelper.info(__technicianNameSelected);
                expect(__technicianNameSelected).toBe(__technicianName);


                await Pages.cpClientAndPetDetailsPage.selectLocationFromDropDown(__locationName);
                await browser.sleep(1000);

                let __locationNameSelected = await Pages.cpClientAndPetDetailsPage.selectedLocationName;
                FrameworkComponent.logHelper.info(__locationNameSelected);
                expect(__locationNameSelected).toBe(__locationName);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Navigate to the whiteboard section and verify the filter is in off state', () => {
            try {

                Pages.cpClientAndPetDetailsPage.navigateToWhiteBoard();

                browser.sleep(5000);

                expect(Pages.cpWhiteboardPage.IsAtWhiteboardPage()).toBe(true);

                // expect(Pages.cpWhiteboardPage.getFilterStatus).toBe('OFF');


            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verfiy the filter properties cleared', async () => {
            try {

                await Pages.cpWhiteboardPage.clearFilterOptionsSelected();

                browser.sleep(2000);

                await expect(Pages.cpWhiteboardPage.getFilterStatus).toBe('OFF');

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        })

        it('Verify the filter popup get displayed on clicking filter button', () => {
            try {

                Pages.cpWhiteboardPage.clickOnFilterButton();

                browser.sleep(1000);

                expect(Pages.cpWhiteboardPage.IsFilterPopupDisplayed()).toBe(true);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        })

        it('Select the location in filter options', () => {
            try {

                Pages.cpWhiteboardPage.clickOnFilterByName('location');

                expect(Pages.cpWhiteboardPage.selectedFilterTitle).toBe('Location');

                expect(Pages.cpWhiteboardPage.IsSelectAllCheckboxSelected()).toBe(true);

                Pages.cpWhiteboardPage.unselectCheckboxSelectAll();

                expect(Pages.cpWhiteboardPage.IsSelectAllCheckboxSelected()).toBe(false);

                Pages.cpWhiteboardPage.selectFilterOptionsByGivenName('Cat- Double Occupancy');

                Pages.cpWhiteboardPage.clickOnBackButton();

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Select the technician in filter options', () => {
            try {

                Pages.cpWhiteboardPage.clickOnFilterByName('technician');

                expect(Pages.cpWhiteboardPage.selectedFilterTitle).toBe('Technician');

                expect(Pages.cpWhiteboardPage.IsSelectAllCheckboxSelected()).toBe(true);

                Pages.cpWhiteboardPage.unselectCheckboxSelectAll();

                expect(Pages.cpWhiteboardPage.IsSelectAllCheckboxSelected()).toBe(false);

                Pages.cpWhiteboardPage.selectFilterOptionsByGivenName('Me');

                Pages.cpWhiteboardPage.clickOnBackButton();

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Apply the filter options selected and verify the filter applied', () => {
            try {

                Pages.cpWhiteboardPage.applyFilterOptionSelected();

                browser.sleep(2000);

                expect(Pages.cpWhiteboardPage.getFilterStatus).toBe('ON');

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        })

        it('Verify the patient information displayed in the filtered list of whiteboard', async () => {
            try {

                let __clientLastName = specFileData.Data.Client.LastName.slice(0, 13);

                let __isNameFiltered = await Pages.cpWhiteboardPage.IsPatientInformationFilteredByName(__clientLastName);
                expect(__isNameFiltered).toBe(true);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the number of Overdue task series count displayed is matching for the patient information in whiteboard', async () => {
            try {

                Pages.cpWhiteboardPage.scrollToLeftWhiteboardGrid();

                let __patientId = specFileData.Data.Client.Patient.Id;
                let __taskOccurrenceStatusCount = await APILibraryController.careplannerLibrary.getTaskOccurrenceStatusCountByPatientId(__patientId);
                let __expectedOverDueCount = __taskOccurrenceStatusCount.TaskOverdueCount;

                let __clientLastName = specFileData.Data.Client.LastName.slice(0, 13);
                let __actualOverDueCount = await Pages.cpWhiteboardPage.getOverdueCountByclienttName(__clientLastName);

                FrameworkComponent.logHelper.info("Expected Number of Over Due Task Count : " + __expectedOverDueCount);
                FrameworkComponent.logHelper.info("Actual Number of Over Due Task Count displayed as : " + __actualOverDueCount);
                expect(__actualOverDueCount).toBe(__expectedOverDueCount);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verfiy the task occurrence count scheduled in whiteboard screen', async () => {
            try {

                await Pages.cpWhiteboardPage.scrollToLeftWhiteboardGrid();

                let __clientLastName = specFileData.Data.Client.LastName.slice(0, 13);
                let __taskSeriesInfo = specFileData.UserData.TaskSeries;
                let __taskScheduleInfo = __taskSeriesInfo.taskScheduleInfo;

                let __expectedResult = await Pages.cpSchedulerPage.calculateExpectedOccurrenceCountAndStatus(__taskScheduleInfo);
                let __clientNameindex = Pages.cpWhiteboardPage.getPatientNameIndexByClientName(__clientLastName);
                let __position = await Pages.cpWhiteboardPage.getPositionByClientName(__clientLastName);
                let __numberOfOccurrence = await Pages.cpWhiteboardPage.getNumberOfTaskOccurrenceListedByPosition(__position.StartPosition, __position.EndPosition);

                FrameworkComponent.logHelper.info("Expected number of occurrence found : " + __expectedResult.expectedOccurrenceCount);
                FrameworkComponent.logHelper.info("Actual number of occurrence found : " + __numberOfOccurrence);
                await expect(__numberOfOccurrence).toBe(__expectedResult.expectedOccurrenceCount);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the task occurrence status of the scheduled occurrence in whiteboard page', async () => {
            try {

                Pages.cpWhiteboardPage.scrollToLeftWhiteboardGrid();

                let __clientLastName = specFileData.Data.Client.LastName.slice(0, 13);
                let __taskSeriesInfo = specFileData.UserData.TaskSeries;
                let __taskScheduleInfo = __taskSeriesInfo.taskScheduleInfo;

                await Pages.cpWhiteboardPage.clickOnPatientByClientName(__clientLastName);
                await browser.sleep(2000);
                await expect(Pages.cpSchedulerPage.IsAtSchedulerPage()).toBe(true);

                let __occurrencesStatus = await Pages.cpSchedulerPage.getStatusOfTheTaskOccurrenceByTaskName(__taskSeriesInfo.taskSeriesName);
                let __expectedOccurrencesStatus = await Pages.cpWhiteboardPage.formatTaskOccurrenceStatus(__occurrencesStatus);

                await Pages.cpClientAndPetDetailsPage.navigateToWhiteBoard();
                await browser.sleep(2000);
                await expect(Pages.cpWhiteboardPage.IsAtWhiteboardPage()).toBe(true);

                
                let __position = await Pages.cpWhiteboardPage.getPositionByClientName(__clientLastName);
                let __actualOccurrenceStatus = await Pages.cpWhiteboardPage.getOccurrenceStatusByPosition(__position.StartPosition, __position.EndPosition);

                await FrameworkComponent.logHelper.info("Expected list of status : " + __expectedOccurrencesStatus);
                await FrameworkComponent.logHelper.info("Actual status displayed as : " + __actualOccurrenceStatus);
                await expect(__actualOccurrenceStatus).toEqual(__expectedOccurrencesStatus);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Navigate to scheduler page by click on the patient info filtered', () => {
            try {
                let __clientLastName = specFileData.Data.Client.LastName.slice(0, 13);

                Pages.cpWhiteboardPage.clickOnPatientByClientName(__clientLastName);

                browser.sleep(2000);

                expect(Pages.cpSchedulerPage.IsAtSchedulerPage()).toBe(true);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

        it('Verify the user can able to reset the location', async () => {
            try {
                let __locationName = 'No Location';

                await Pages.cpClientAndPetDetailsPage.selectLocationFromDropDown(__locationName);

                browser.sleep(1000);

                let __locationNameSelected = await Pages.cpClientAndPetDetailsPage.selectedLocationName;
                FrameworkComponent.logHelper.info(__locationNameSelected);
                expect(__locationNameSelected).toBe(__locationName);

            } catch (error) {
                FrameworkComponent.logHelper.error(error);
            }
        });

    });

});