import { browser } from "protractor";
import { APILibraries } from "../../applicationComponent";
import { FrameworkComponent } from "../../frameworkComponent";


export class WoofwareAPILibrary {

    async getAuthToken() {
        try {
            await browser.sleep(10000);
            await APILibraries.authorizationLibrary.getAuthToken();            
        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    }

    async searchClientByClientName(clientName) {
        try {
            await browser.sleep(10000);
            let __returnValue = await APILibraries.clientLibrary.searchClientByClientName(clientName);
            return __returnValue;
        } catch (error) {
            FrameworkComponent.logHelper.info(error);
            throw error;
        }
    }

    /**
     * API workflow for creating a client and patient
     */


    /**
     * API workflow for creating a client, patient and book appointment
     */


    /**
     * API workflow for creating a client, patient, book apointment and add a product to the order
     */


    /**
     * API workflow for creating a client, patient, checkin a patient
     */


    /**
     * API workflow for creating a client, patient check-in and check-out a patient
     */

}