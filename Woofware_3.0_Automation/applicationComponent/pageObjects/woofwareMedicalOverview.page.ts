import { by, element } from "protractor";
import { FrameworkComponent } from "../../frameworkComponent";

export class WoofwareMedicalOverviewPage {
    
    __elePetBanner = element(by.xpath(".//div[@class='patient-banner']"));
    __elePatientName = element(by.xpath(".//app-patient-banner/descendant::div[contains(@class,'display_name')]"));
    __eleOwnerName = element(by.xpath(".//app-patient-banner/descendant::div[contains(@class,'display-owner-name')]"));
    
    __elePatientBreedType = element(by.xpath(".//app-patient-banner/descendant::div[contains(@class,'breed-type')]/descendant::div[@class='info-content']"));
    __elePatientAge = element(by.xpath(".//app-patient-banner/descendant::div[contains(@class,'pet-age')]/descendant::div[@class='info-content']"));
    __elePatientSex = element(by.xpath(".//app-patient-banner/descendant::div[contains(@class,'pet-sex')]/descendant::div[@class='info-content']"));
    __elePatientDOB = element(by.xpath(".//app-patient-banner/descendant::div[contains(@class,'pet-dob')]/descendant::div[@class='info-content']"));
    
    __elePatientVisitedHospitalIds = element.all(by.xpath(".//app-patient-banner/descendant::div[contains(@class,'visited_hospital')]/descendant::div[contains(@class,'hospital-details')]"));
    __elePatientAllVisitedHospitalCheckbox = element(by.xpath(".//app-patient-banner/descendant::div[contains(@class,'visited_hospital')]/descendant::input[@type='checkbox']"));

    __eleRemindersGrid = element(by.xpath(".//wj-flex-grid[@id='reminders']"));
    __eleRemindersGroupList = element.all(by.xpath(".//wj-flex-grid[@id='reminders']/descendant::div[@class='wj-row']/div[@role='gridcell' and @class='wj-cell wj-group']/span"));
    __eleRemindersListWithoutGroupName = element.all(by.xpath(".//wj-flex-grid[@id='reminders']/descendant::div[@class='wj-row']/div[@role='gridcell' and contains(@class,'wj-cell') and not(contains(@class,'wj-group'))]"));


    __eleMedicalConcerns = element(by.xpath(".//app-medical-overview/descendant::div[@id='med_conc']"));
    __eleMedicalConcernStatus = element.all(by.xpath(".//app-medical-overview/descendant::div[@id='med_conc']/descendant::li/a"));
    __eleActiveTab = element(by.xpath(".//app-medical-overview/descendant::div[@id='med_conc']/descendant::li/a[span[text() = 'Active']]"));
    __eleInactiveTab = element(by.xpath(".//app-medical-overview/descendant::div[@id='med_conc']/descendant::li/a[span[text() = 'Inactive']]"));
    __eleResolvedTab = element(by.xpath(".//app-medical-overview/descendant::div[@id='med_conc']/descendant::li/a[span[text() = 'Resolved']]"));
    __eleMedicalConcernsActiveGrid = element(by.xpath(".//app-medical-overview/descendant::div[@id='med_conc']/descendant::wj-flex-grid[@id='active_med']"));
    __eleMedicalConcernsActiveStatusRecords = element.all(by.xpath(".//app-medical-overview/descendant::div[@id='med_conc']/descendant::wj-flex-grid[@id='active_med']/descendant::div[@role='gridcell']"));
    __eleMedicalConcernsInActiveGrid = element(by.xpath(".//app-medical-overview/descendant::div[@id='med_conc']/descendant::wj-flex-grid[@id='inactive_med']"));
    __eleMedicalConcernsInActiveStatusRecords = element(by.xpath(".//app-medical-overview/descendant::div[@id='med_conc']/descendant::wj-flex-grid[@id='inactive_med']/descendant::div[@role='gridcell']"));
    __eleMedicalConcernsResolvedGrid = element(by.xpath(".//app-medical-overview/descendant::div[@id='med_conc']/descendant::wj-flex-grid[@id='resolved_med']"));
    __eleMedicalConcernsResolvedStatusRecords = element(by.xpath(".//app-medical-overview/descendant::div[@id='med_conc']/descendant::wj-flex-grid[@id='resolved_med']/descendant::div[@role='gridcell']"));



    __eleMedicalHistoryGrid = element(by.xpath(".//wj-flex-grid[@id='medicalHistories']"));
    __eleMedicalHistoryRecords = element.all(by.xpath(".//wj-flex-grid[@id='medicalHistories']/descendant::div[@role='gridcell']/descendant::div[contains(@class,'history-content')]"));

    __eleRemiderPopup = element(by.xpath("//ngb-modal-window/descendant::div[@class='modal-content']"));
    

    isMedicalOverviewPageDisplayed() {
        try {
            return this.__elePetBanner.isDisplayed().then((displayedStatus) => {
                return displayedStatus;
            })         
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getPatientNameDisplayed() {
        try {
            return this.__elePatientName.getText().then((patientName) => {
                return patientName;
            })
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getClientNameDisplayed() {
        try {
            return this.__eleOwnerName.getText().then((clientName) => {
                return clientName;
            })
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

}