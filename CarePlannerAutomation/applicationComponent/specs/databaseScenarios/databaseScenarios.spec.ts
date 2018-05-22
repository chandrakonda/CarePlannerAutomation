let path = require('path');
import { Data, ReadAppConfig, SpecFile, TestBase, TestCase } from "../../../applicationComponent";
import { DataReader } from "../../../dataComponent/dataReaderHelper";
import { FrameworkComponent } from "../../../frameworkComponent";
let __dbConfig: ReadAppConfig.DatabaseConfig;

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

    it('Verify the Database version deployed', async () => {
        try {

            FrameworkComponent.logHelper.info("Creating the DB connection & get Sparky Config Values");

            let __resultTable = await FrameworkComponent.databaseHelper.executeQueryWithConfigDetails(__dbConfig, "select * from SparkyConfig");

            FrameworkComponent.logHelper.info("Get the row values from the result data table");
            let __resultRows = __resultTable.rows;

            FrameworkComponent.logHelper.info("Get the column index of the Config Key");
            let __columnIndexOfKey = __resultTable.columns.findIndex(clm => clm.name === 'Config_Key');
            let __columnIndexOfValue = __resultTable.columns.findIndex(clm => clm.name === 'Config_Value');

            FrameworkComponent.logHelper.info('Filtering the query result with column name and row index')

            let __result = __resultTable.rows.filter(rows => rows[__columnIndexOfKey] === 'DatabaseVersion')[0][__columnIndexOfValue];

            FrameworkComponent.logHelper.info('Datbase version identified as : ' + __result);

            expect(__result).toBe('2.134.18130.4');
            
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    })

    it('Verify the number of records from the stored procedure result', async () => {
        try {
            FrameworkComponent.logHelper.info("Creating the DB connection");

            let __inputParameters:any[] = ['User', 'HospitalId'];
            let __parameterValues:any[] = ['','153'];
            let __spResultTable = await FrameworkComponent.databaseHelper.executeStoredProcedureWithInputParameters(__dbConfig, "GetLabResultsQueue", __inputParameters, __parameterValues);
            

            let __columnNames = new Array;
            
            __spResultTable.columns.forEach(columnObject => {
                __columnNames.push(columnObject.name);
            });

            FrameworkComponent.logHelper.info("Column Names : " + __columnNames);
            FrameworkComponent.logHelper.info("Row Records : " + __spResultTable.rows);

            let __expectedResultCount = 91;
            let __actualResultCount = __spResultTable.rows.length;
            
            FrameworkComponent.logHelper.info("Expected Row Count of SP Result : " + __expectedResultCount);
            FrameworkComponent.logHelper.info("Actual Row Count of SP Result : " + __actualResultCount);

            expect(__actualResultCount).toBe(91);

        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    });

    
})