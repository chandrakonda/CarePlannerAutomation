import { browser } from 'protractor';
import { APILibraryController, Data, Pages, SpecFile, TestBase, TestCase } from '../../../applicationcomponent';
import { DataReader } from '../../../dataComponent/dataReaderHelper';
import { FrameworkComponent } from '../../../frameworkComponent';


describe('Test whiteboard scenarios  -->  ', () => {

    describe('Verify the non-scheduled task series count displayed in the whiteboard for a filtered patient  -->  ', () => {
        let specFileData: SpecFile;
        let __data: Data;
        let __testCase: TestCase;
        let __dataReader: DataReader;
        beforeAll(() => {
            specFileData = new SpecFile();
            __dataReader = new DataReader();
            __data = new Data();
            specFileData.Data = __data;
            specFileData.UserData = __dataReader.loadJsonData('userDataScenario1', 'whiteboard');
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

                //Data setup using API call
                await APILibraryController.careplannerLibrary.apiTestDataSetUpWithDefaultData(specFileData);

                //Getting aggregated data to the specFileData
                await APILibraryController.careplannerLibrary.apiGetAggregatedDataByOrderId(specFileData);

                browser.sleep(5000);

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

        it('Verify the number of non scheduled  task series count displayed is matching for the patient information in whiteboard', async () => {
            try {

                Pages.cpWhiteboardPage.scrollToLeftWhiteboardGrid();

                let __patientId = specFileData.Data.Client.Patient.Id;
                let __taskOccurrenceStatusCount = await APILibraryController.careplannerLibrary.getTaskOccurrenceStatusCountByPatientId(__patientId);
                let __expectedNonScheduledTaskCount = __taskOccurrenceStatusCount.TaskNotScheduledCount;

                let __clientLastName = specFileData.Data.Client.LastName.slice(0, 13);
                let __actualNonScheduledTaskCount = await Pages.cpWhiteboardPage.getNotScheduledCountByClientName(__clientLastName);

                FrameworkComponent.logHelper.info("Expected Non Scheduled Task Series Count : " + __expectedNonScheduledTaskCount);
                FrameworkComponent.logHelper.info("Actual Non Scheduled Task Series Count displayed as : " + __actualNonScheduledTaskCount);

                expect(__actualNonScheduledTaskCount).toBe(__expectedNonScheduledTaskCount);

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