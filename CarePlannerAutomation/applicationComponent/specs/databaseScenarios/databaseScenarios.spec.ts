let path = require('path');
import { Data, ReadAppConfig, SpecFile, TestBase, TestCase } from "../../../applicationComponent";
import { DataReader } from "../../../dataComponent/dataReaderHelper";
import { FrameworkComponent } from "../../../frameworkComponent";
let __dbConfig:ReadAppConfig.DatabaseConfig;

describe('databsae connection', () => {
    let specFileData: SpecFile;
    let __data: Data;
    let __testCase: TestCase;
    let __dataReader: DataReader;

    beforeAll(() => {

        specFileData = new SpecFile();
        __dataReader = new DataReader();
        __data = new Data();
        specFileData.Data = __data;
        specFileData.UserData = __dataReader.loadJsonData('userDataScenario1', 'singleTaskSeriesSingleOccurrence');
        specFileData.TestCases = new Array<TestCase>();

        __dbConfig = ReadAppConfig.loadDatabaseConfiguration();
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

    it('create db connection', async () => {
        try {
            
            FrameworkComponent.logHelper.info("Creating the DB connection");            
            
            let __resultSet = await FrameworkComponent.databaseHelper.query(__dbConfig, "select * from SparkyConfig");

            FrameworkComponent.logHelper.info("Result Set Information " +  __resultSet[0]);

        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    })
})