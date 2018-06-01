import { TestBase } from '../../applicationComponent';
import { DataReader } from '../../dataComponent/dataReaderHelper';
import { FrameworkComponent } from '../../frameworkComponent';
const path = require('path');

export class CheckedInPatientLibrary {

    constructor() {
        FrameworkComponent.logHelper.info("*********** CheckedIn Patients Controller ***********")
    }

    async getTaskOccurrenceStatusCountByPatientId(patientId) {
        try {
            FrameworkComponent.logHelper.info("*********** Get Task Occurrence Status Count Details By CheckedIn Patient   ***********");

            let __options = await this.getTaskOccurrenceStatusCountByCheckedInPatientOptions(patientId);
            FrameworkComponent.logHelper.info(__options);

            let __response = await FrameworkComponent.apiServiceHelper.makeApiCall(__options).then((response) => {
                return FrameworkComponent.apiServiceHelper.parseResultOfMakePostRequest(response).then((responseValue) => {
                    let __patient = responseValue[0].Patient;
                    return { TaskOverdueCount: __patient.TaskOverdueCount, TaskDueCount: __patient.TaskDueCount, TaskNotScheduledCount: __patient.TaskNotScheduledCount }
                });
            });
            return __response;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }


    getTaskOccurrenceStatusCountByCheckedInPatientOptions(patientId) {
        try {
            FrameworkComponent.logHelper.info('*********** Gettting Transaction Status Count By CheckedIn Patient  ***********');

            let __options = DataReader.loadAPITemplates("getCheckedInPatientDetails"); // require(path.join(__dirname, '../../../../applicationComponent/data/apiTemplates/getOrders.json'));

            let __date = new Date().getMonth().toString() + '-' + new Date().getDate().toString() + '-' + new Date().getFullYear();

            //Set URL
            __options.url = TestBase.GlobalData.EnvironmentDetails.wwapiendpoint + 'CheckedInPatients/' + __date + '/TaskOccurrenceStatusCount';

            //Set header values
            __options.headers['x-hospital-id'] = TestBase.GlobalData.EnvironmentDetails.hospitalid;
            __options.headers.authorization = TestBase.GlobalData.GlobalAuthToken;

            //Query String
            __options.qs.date = __date;
            __options.qs.patientId = patientId;
            return __options;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

}