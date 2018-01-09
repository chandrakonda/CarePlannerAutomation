import { LogHelper } from '../../../frameworkComponent';
import { GlobalValues, SpecFile, AuthorizationLibrary, ClientAndPatientLibrary, AppointmentLibrary, OrderLibrary, VisitLibrary, TestBase} from '../../../applicationComponent';
import { browser } from 'protractor';

let __authLib:AuthorizationLibrary, __clientAndPatientLib:ClientAndPatientLibrary, __appointmentLib:AppointmentLibrary, __orderLib:OrderLibrary, __visitLib:VisitLibrary;

export class CarePlannerLibrary{
    
    
    async getAuthToken() {
        try {
            await browser.sleep(10000);
            __authLib = new AuthorizationLibrary();
            await __authLib.getAuthToken();
        } catch (error) {
            LogHelper.Logger.info(error);
            throw error;
        }
    }

    async createClientPetAddProduct(specData:SpecFile) {
        try {
            await browser.sleep(10000);
            LogHelper.Logger.info(TestBase.GlobalData.GlobalAuthToken);

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

            LogHelper.Logger.info("Creating URL and launching browser...");
            let __url = TestBase.GlobalData.EnvironmentDetails.applicationurl +
                '?hospitalId=' + TestBase.GlobalData.EnvironmentDetails.hospitalid +
                '&patientId=' + specData.Data.Client.Patient.Id +
                '&orderId=' + specData.Data.Client.Patient.Visit.VisitId +
                '&userName='+ TestBase.GlobalData.EnvironmentDetails.username +
                '&userId=' + specData.UserId +  // chandrasekhar.konda .. need to implement
                '&accessToken=' + AuthorizationLibrary.authTokenValue
            LogHelper.Logger.info('URL: ', __url);
            browser.get(__url);
            browser.sleep(5000);

        } catch (error) {
            LogHelper.Logger.info(error);
            throw error;
        }
    }

    // static async createClientPet(specData: SpecFile) {
    //     try {
    //         await browser.sleep(10000);
    //         LogHelper.Logger.info(AuthorizationLibrary.authTokenValue);
    //         __clientAndPatientController = new ClientAndPatientLibrary();
    //         await __clientAndPatientController.createClient(AuthorizationLibrary.authTokenValue,specData);  // create client
    //         // await __clientAndPatientController.createPatient(AuthController.authTokenValue,specData);  // create patient            

    //     } catch (error) {
    //         LogHelper.Logger.info(error);
    //         throw error;
    //     }
    // }

    // static async createClientPetAddProduct1(specData : SpecFile) {
    //     try {
    //         await browser.sleep(10000);
    //         LogHelper.Logger.info("token value  "+ AuthorizationLibrary.authTokenValue);

    //         let __clientAndPatientController = new ClientAndPatientLibrary();
    //         // let __appointmentController = new AppointmentController();
    //         // let __orderController = new OrderController();
    //         // let __visitController: VisitController = new VisitController();
            
    //         await __clientAndPatientController.createClient(AuthorizationLibrary.authTokenValue,specData);  // create client
    //         await __clientAndPatientController.createPatient(AuthorizationLibrary.authTokenValue,specData);  // create patient

    //     } catch (error) {
    //         LogHelper.Logger.info(error);
    //         throw error;

    //     }
    // }
}
