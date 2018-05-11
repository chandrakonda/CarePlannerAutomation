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

        it('Pass Test 1', () => {
            try {
                expect(1).toBe(1);
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Pass Test 2', () => {
            try {
                expect(1).toBe(1);
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });

        it('Fail Test 1', () => {
            try {
                expect(0).toBe(1);
            } catch (error) {
                __testCase.ExceptionDetails = error;
            }
        });
    });
});