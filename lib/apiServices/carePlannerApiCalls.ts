import { browser, protractor } from 'protractor';
import { AuthController } from "../apiControllers/authController";
import { ClientAndPatientController } from "../apiControllers/clientAndPatientController";
import { AppointmentController } from "../apiControllers/appointmentController";
import { VisitController } from "../apiControllers/visitController";
import { OrderController } from "../apiControllers/orderController";




// let visitController: VisitController = new VisitController();
// let orderController: OrderController = new OrderController();

export class CarePlannerApiCalls {



    // GetAuthToken() {
    //     let __authController = new AuthController();
    //    await __authController.getAuthToken1();
    //    await browser.logger.info(browser.apiToken);
    // }

    async CreateClientPetAddProduct() {
        try {
            // Create client
            
           // let __authController = new AuthController();
           // await __authController.getAuthToken1();
            // https://medium.com/dailyjs/asynchronous-adventures-in-javascript-async-await-bd2e62f37ffd
            let __authController = new AuthController();
        //    await __authController.getAuthToken1();
            let __clientAndPatientController = new ClientAndPatientController();
            let __appointmentController = new AppointmentController();
            let __orderController = new OrderController ();
            let __visitController: VisitController = new VisitController();
        //    await __clientAndPatientController.createClient1();

        //     await __authController.getAuthToken1()
        //    .then( ()  => {
        //        __clientAndPatientController.createClient1(browser.apiToken).then(() => {__clientAndPatientController.createPatient1(browser.apiToken);}) });

               await __authController.getAuthToken1();
               //await __clientAndPatientController.createClient1(browser.apiToken);  // create client
               browser.clientID = 304006797;
               await __clientAndPatientController.createPatient1(browser.apiToken);  // create patient
               await __appointmentController.createNewAppointment1(browser.apiToken);  // create appointment
               await __appointmentController.checkinAppointment1(browser.apiToken);  // checkin appointment
               await __appointmentController.getCheckedInPatientDetail1(browser.apiToken);  // checkin appointment
               await __orderController.addOrderToVisit1(browser.apiToken);
               await browser.sleep(10000);  /// Wait to get details
               await __visitController.getVisitDetailsByVisitId1(browser.apiToken);
               await __orderController.getTaskSeriesByOrderId1(browser.apiToken);
               await __visitController.getVisitDetailsByVisitId1(browser.apiToken);
               await __visitController.getVisitResources1(browser.apiToken);

               browser.logger.info("Creating URL and launching browser...");
                let  __url = browser.baseUrl +
                   '?hospitalId=' + browser.appenvdetails.hospitalid +
                   '&patientId=' + browser.patientID +
                   '&orderId=' + browser.visitId +
                   '&userName=chandrasekhar.konda'+ //' //+ browser.appenvdetails.username +
                   '&userId=0'+ //+ browser.userId +
                   '&accessToken=' + browser.apiToken;
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