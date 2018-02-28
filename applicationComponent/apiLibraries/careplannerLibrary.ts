import { FrameworkComponent } from '../../frameworkComponent';
import { GlobalValues, SpecFile, AuthorizationLibrary, ClientAndPatientLibrary, AppointmentLibrary, OrderLibrary, VisitLibrary, TestBase} from '../../applicationComponent';
import { browser, ProtractorBy } from 'protractor';
import { protractor } from 'protractor/built/ptor';

let __authLib:AuthorizationLibrary, __clientAndPatientLib:ClientAndPatientLibrary, __appointmentLib:AppointmentLibrary, __orderLib:OrderLibrary, __visitLib:VisitLibrary;

export class CarePlannerLibrary{
    

    async getAuthToken() {
        try {
            await browser.sleep(10000);
            __authLib = new AuthorizationLibrary();
            await __authLib.getAuthToken();
        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    }
    
    async apiTestDataSetUpWithDefaultData(specData:SpecFile) {
        try {
            await browser.sleep(10000);
            FrameworkComponent.logHelper.info(TestBase.GlobalData.GlobalAuthToken);

            __clientAndPatientLib = new ClientAndPatientLibrary();
            __appointmentLib = new AppointmentLibrary();  
            __orderLib = new OrderLibrary();          
            __visitLib = new VisitLibrary();
            
            await __clientAndPatientLib.createClient(specData);  // create client
            await __clientAndPatientLib.createPatient(specData);  // create patient
            await __appointmentLib.createNewAppointment(specData);  // create appointment
            await __appointmentLib.checkinAppointment(specData);  // checkin appointment
            await __appointmentLib.getCheckedInPatientDetail(specData);  // checkin appointment
            await __orderLib.addOrderToVisit(specData);
            await browser.sleep(10000);  /// Wait to get details
            await __visitLib.getVisitDetailsByVisitId(specData);
            await __orderLib.getTaskSeriesByOrderId(specData);
            await __visitLib.getVisitDetailsByVisitId(specData);
            await __visitLib.getVisitResources(specData);

            FrameworkComponent.logHelper.info("Creating URL and launching browser...");
            let __url = TestBase.GlobalData.EnvironmentDetails.applicationurl +
                '?hospitalId=' + TestBase.GlobalData.EnvironmentDetails.hospitalid +
                '&patientId=' + specData.Data.Client.Patient.Id +
                '&orderId=' + specData.Data.Client.Patient.Visit.VisitId +
                '&userName='+ TestBase.GlobalData.EnvironmentDetails.username +
                '&userId=' + specData.UserId +  // chandrasekhar.konda .. need to implement
                '&accessToken=' + AuthorizationLibrary.authTokenValue
            FrameworkComponent.logHelper.info('URL: ', __url);
            browser.get(__url);           
            browser.sleep(5000);

        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    }

    async apiTestDataSetUpWithUserProductData(specData:SpecFile, productFileName?:string, productFolderName?:string) {
        try {
            await browser.sleep(10000);
            FrameworkComponent.logHelper.info(TestBase.GlobalData.GlobalAuthToken);

            __clientAndPatientLib = new ClientAndPatientLibrary();
            __appointmentLib = new AppointmentLibrary();  
            __orderLib = new OrderLibrary();          
            __visitLib = new VisitLibrary();
            
            await __clientAndPatientLib.createClient(specData);  // create client
            await __clientAndPatientLib.createPatient(specData);  // create patient
            await __appointmentLib.createNewAppointment(specData);  // create appointment
            await __appointmentLib.checkinAppointment(specData);  // checkin appointment
            await __appointmentLib.getCheckedInPatientDetail(specData);  // checkin appointment
            await __orderLib.addOrderToVisit(specData, productFileName, productFolderName);
            await browser.sleep(10000);  /// Wait to get details
            await __visitLib.getVisitDetailsByVisitId(specData);
            await __orderLib.getTaskSeriesByOrderId(specData);
            await __visitLib.getVisitDetailsByVisitId(specData);
            await __visitLib.getVisitResources(specData);

            FrameworkComponent.logHelper.info("Creating URL and launching browser...");
            let __url = TestBase.GlobalData.EnvironmentDetails.applicationurl +
                '?hospitalId=' + TestBase.GlobalData.EnvironmentDetails.hospitalid +
                '&patientId=' + specData.Data.Client.Patient.Id +
                '&orderId=' + specData.Data.Client.Patient.Visit.VisitId +
                '&userName='+ TestBase.GlobalData.EnvironmentDetails.username +
                '&userId=' + specData.UserId +  // chandrasekhar.konda .. need to implement
                '&accessToken=' + AuthorizationLibrary.authTokenValue
            FrameworkComponent.logHelper.info('URL: ', __url);
            browser.get(__url);
            browser.sleep(5000);

        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    }

    async apiGetAggregatedDataByOrderId(specData:SpecFile){
        try {
            __orderLib = new OrderLibrary();
            __orderLib.getAggregatedDataByOrderId(specData);

        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    }

    async getCategoryListFromAggregatedDataByOrderId(specData:SpecFile){
        try {            
            let __categoryList = new Array;
            let __taskList = new Array;

            specData.Data.Client.Patient.Visit.Category.forEach(category => {
                __categoryList.push(category.CategoryName);
                category.TaskSeriesList.forEach(taskName => {
                    __taskList.push(taskName);
                })
            });
            return {categoryList : __categoryList, taskList:__taskList};
        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    }
   
}
