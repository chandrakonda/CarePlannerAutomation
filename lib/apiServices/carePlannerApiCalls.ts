import { browser, protractor } from 'protractor';
import { AuthController } from "../apiControllers/authController";
import { ClientAndPatientController } from "../apiControllers/clientAndPatientController";
import { AppointmentController } from "../apiControllers/appointmentController";
import { VisitController } from "../apiControllers/visitController";
import { OrderController } from "../apiControllers/orderController";
// Framework logger
import { LogHelper } from '../../support/logHelper';
import { SpecFile, GlobalValues } from '../../support/globalDataModel';
import { TestBase } from '../../testbase/TestBase';
export class CarePlannerApiCalls {

    //static apiTokenValue: string;

    // GetAuthToken() {
    //     try {
    //         let __authController = new AuthController();
    //         __authController.getAuthToken1();
    //         browser.logger.info(AuthController.authTokenValue);
           
    //     } catch (e) {
    //         throw e;
    //     }
    // }

    async CreateClientPetAddProduct(specData : SpecFile) {
        try {
            await browser.sleep(10000);
            LogHelper.Logger.info(AuthController.authTokenValue);

            let __clientAndPatientController = new ClientAndPatientController();
            let __appointmentController = new AppointmentController();
            let __orderController = new OrderController();
            let __visitController: VisitController = new VisitController();
            
            await __clientAndPatientController.createClient(AuthController.authTokenValue,specData);  // create client
            await __clientAndPatientController.createPatient(AuthController.authTokenValue,specData);  // create patient
            await __appointmentController.createNewAppointment(AuthController.authTokenValue,specData);  // create appointment
            await __appointmentController.checkinAppointment(AuthController.authTokenValue,specData);  // checkin appointment
            await __appointmentController.getCheckedInPatientDetail(AuthController.authTokenValue,specData);  // checkin appointment
            await __orderController.addOrderToVisit(AuthController.authTokenValue,specData);
            await browser.sleep(10000);  /// Wait to get details
            await __visitController.getVisitDetailsByVisitId(AuthController.authTokenValue,specData);
            await __orderController.getTaskSeriesByOrderId(AuthController.authTokenValue,specData);
          //  await __visitController.getVisitDetailsByVisitId(AuthController.authTokenValue,specData);
            await __visitController.getVisitResources(AuthController.authTokenValue,specData);

            LogHelper.Logger.info("Creating URL and launching browser...");
            let __url = browser.baseUrl +
                '?hospitalId=' + browser.appenvdetails.hospitalid +
                '&patientId=' + browser.patientID +
                '&orderId=' + browser.visitId +
                '&userName='+ browser.appenvdetails.username +
                '&userId=' + browser.userId +  // chandrasekhar.konda .. need to implement
                '&accessToken=' + AuthController.tokenValue;
                LogHelper.Logger.info('URL: ', __url);
            browser.get(__url);
            browser.sleep(5000);

        } catch (e) {
            LogHelper.Logger.error(e);
        }
    }


    async CreateClientPetAddProduct1(specData : SpecFile) {
        try {
            await browser.sleep(10000);
            LogHelper.Logger.info("token value  "+AuthController.authTokenValue);

            let __clientAndPatientController = new ClientAndPatientController();
            let __appointmentController = new AppointmentController();
            let __orderController = new OrderController();
            let __visitController: VisitController = new VisitController();
            
            await __clientAndPatientController.createClient(AuthController.authTokenValue,specData);  // create client
            await __clientAndPatientController.createPatient(AuthController.authTokenValue,specData);  // create patient

           
        } catch (e) {
            LogHelper.Logger.error(e);
        }
    }

    AddMultipleProducts() {



    }


    BuildURLLauchApplication(specData : SpecFile){
        LogHelper.Logger.info("Creating URL and launching browser...");
        let __url = browser.baseUrl +
            '?hospitalId=' + TestBase.GlobalData.EnvironmentDetails.hospitalid +
            '&patientId=' + specData.Data.Client.Patient.Id +  //browser.patientID +
            '&orderId=' + specData.Data.Client.Patient.Id +
            '&userName='+ TestBase.GlobalData.EnvironmentDetails.username+
            '&userId=' + specData.UserId +  // chandrasekhar.konda .. need to implement
            '&accessToken=' + AuthController.tokenValue;
            LogHelper.Logger.info('URL: ', __url);
        browser.get(__url);
        browser.sleep(5000);

    }


}