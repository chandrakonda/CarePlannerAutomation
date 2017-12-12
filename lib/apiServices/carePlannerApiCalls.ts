import { browser, protractor } from 'protractor';
import { AuthController } from "../apiControllers/authController";
import { ClientAndPatientController } from "../apiControllers/clientAndPatientController";
import { AppointmentController } from "../apiControllers/appointmentController";
import { VisitController } from "../apiControllers/visitController";
import { OrderController } from "../apiControllers/orderController";


export class CarePlannerApiCalls {

    static apiTokenValue: string;

    // GetAuthToken() {
    //     try {
    //         let __authController = new AuthController();
    //         __authController.getAuthToken1();
    //         browser.logger.info(AuthController.authTokenValue);
           
    //     } catch (e) {
    //         throw e;
    //     }
    // }

    async CreateClientPetAddProduct() {
        try {
            let __clientAndPatientController = new ClientAndPatientController();
            let __appointmentController = new AppointmentController();
            let __orderController = new OrderController();
            let __visitController: VisitController = new VisitController();
            //    await __clientAndPatientController.createClient1();

            //     await __authController.getAuthToken1()
            //    .then( ()  => {
            //        __clientAndPatientController.createClient1(browser.apiToken).then(() => {__clientAndPatientController.createPatient1(browser.apiToken);}) });

            // await __authController.getAuthToken1();
            //await __clientAndPatientController.createClient1(browser.apiToken);  // create client
          //  browser.apiToken = AuthController.authTokenValue;
            browser.clientID = 304006797;
            browser.logger.info(AuthController.authTokenValue);
            await __clientAndPatientController.createPatient1(AuthController.authTokenValue);  // create patient
            await __appointmentController.createNewAppointment1(AuthController.authTokenValue);  // create appointment
            await __appointmentController.checkinAppointment1(AuthController.authTokenValue);  // checkin appointment
            await __appointmentController.getCheckedInPatientDetail1(AuthController.authTokenValue);  // checkin appointment
            await __orderController.addOrderToVisit1(AuthController.authTokenValue);
            await browser.sleep(10000);  /// Wait to get details
            await __visitController.getVisitDetailsByVisitId1(AuthController.authTokenValue);
            await __orderController.getTaskSeriesByOrderId1(AuthController.authTokenValue);
            await __visitController.getVisitDetailsByVisitId1(AuthController.authTokenValue);
            await __visitController.getVisitResources1(AuthController.authTokenValue);

            browser.logger.info("Creating URL and launching browser...");
            let __url = browser.baseUrl +
                '?hospitalId=' + browser.appenvdetails.hospitalid +
                '&patientId=' + browser.patientID +
                '&orderId=' + browser.visitId +
                '&userName='+ browser.appenvdetails.username +
                '&userId=' + browser.userId +  // chandrasekhar.konda .. need to implement
                '&accessToken=' + AuthController.authTokenValue;
            browser.logger.info('URL: ', __url);
            browser.get(__url);
            browser.sleep(5000);

        } catch (e) {
            browser.logger.error(e);
        }
    }

    AddMultipleProducts() {



    }




}