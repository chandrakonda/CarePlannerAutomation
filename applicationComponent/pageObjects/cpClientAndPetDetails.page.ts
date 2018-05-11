import { ExpectedConditions, browser, by, element } from "protractor";
import { FrameworkComponent } from '../../frameworkComponent';

export class CareplannerClientAndPetDetailsPage {

    eleclientName = element(by.xpath(".//div[@class='petname']/following-sibling::span"));
    elepetName = element(by.xpath(".//div[@class='petname']"));
    eleprimarydrName = element(by.xpath(".//label[text()='PRIMARY']/following-sibling::span"));
    eledrshift = element(by.xpath(".//label[text()='DAY/SHIFT']/following-sibling::span"));

    eleWellness = element(by.xpath(".//li[@class='client_wellness cellinfo wellness']/span[@class='txt']"));
    eleAlert = element(by.xpath(".//li[@class='client_wellness cellinfo vcaAlert']/span[@class='txt']"));

    eleSpecies = element(by.xpath(".//div[@class='species']"));
    elePetGender = element(by.xpath(".//div[@class='bBox two']/div/div"));
    eleAge = element(by.xpath(".//div[@class='bBox one']/div/div"));
    eleWeight = element(by.xpath(".//div[@class='col-md-3 bBox']/div/div"));
    eleRecorded = element(by.xpath(".//div[@class='col-md-4 bBox']/div/div"));

    //eleTechnicianDropdown = element(by.xpath(".//div[normalize-space(text())='Choose technician']/following-sibling::div"));
    eleTechnicianValue = element(by.xpath(".//label[text()='TECHNICIAN']/following-sibling::div//i/following-sibling::div[contains(@class,'ng-tns')]"));
    //eleSelectLocationDropdown = element(by.xpath(".//div[normalize-space(text())='Select a location']/following-sibling::div"));
    eleLocationDropdownValue = element(by.xpath(".//div[@class='block navigation']/div[1]//i[@class='dropdown icon']/following-sibling::div[contains(@class,'ng-tns')]"));
    //eleSelectCageDropdown = element(by.xpath(".//div[normalize-space(text())='Select a cage']/following-sibling::div"));
    eleCageDropdownValue = element(by.xpath(".//div[@class='block navigation']/div[2]//i[@class='dropdown icon']/following-sibling::div[contains(@class,'ng-tns')]"));

    eleAddTaskButton = element(by.xpath(".//button[@id='addtask']"));
    eleCareNotesButton = element(by.xpath(".//button[@id='carenotes']"));
    eleEnterCareNotes = element(by.xpath(".//textarea[@placeholder='Add care note here.']"));
    eleAddCareNoteButton = element(by.xpath(".//button[text()='Add care note']"));

    eleSchedulerButton = element(by.xpath("//ul[@id='treatment_content']/li[contains(@class,'schedule-btn')]"));
    eleTreatmentLogButton = element(by.xpath("//ul[@id='treatment_content']/li[contains(@class,'log-btn')]"));
    eleTrendViewButton = element(by.xpath("//ul[@id='treatment_content']/li[contains(@class,'trend-btn')]"));

    eleWhiteBoradNavigation = element(by.xpath(".//div[@class='pet-banner']/descendant::div[@class='displaytablecell']/a"));

    eleTechnicianDropDown = element(by.xpath(".//div[@class='vPatientName']/descendant::li[contains(@class,'dayDoctor')]/descendant::lsu-dropdown"));
    eleTechnicianDropDownText = element(by.xpath(".//div[@class='vPatientName']/descendant::li[contains(@class,'dayDoctor')]/descendant::lsu-dropdown/descendant::div[contains(@class,'text')]"));
    eleTechnicianDropDownList = element.all(by.xpath(".//div[@class='vPatientName']/descendant::li[contains(@class,'dayDoctor')]/descendant::lsu-dropdown/descendant::div[contains(@class,'item')]"));

    eleLocationDropDown = element(by.xpath(".//div[@class='locationBox']/descendant::lsu-dropdown[preceding-sibling::div[contains(text(),'Location')]]"));
    eleLocationDropDownText = element(by.xpath(".//div[@class='locationBox']/descendant::lsu-dropdown[preceding-sibling::div[contains(text(),'Location')]]/descendant::div[contains(@class,'text')]"));
    eleLocationDropDownList = element.all(by.xpath(""));

    eleCageDropDown = element(by.xpath(".//div[@class='locationBox']/descendant::lsu-dropdown[preceding-sibling::div[contains(text(),'Cage')]]"));
    eleCageDropDownText = element(by.xpath(".//div[@class='locationBox']/descendant::lsu-dropdown[preceding-sibling::div[contains(text(),'Cage')]]/descendant::div[contains(@class,'text')]"));
    eleCageDropDownList = element.all(by.xpath(""));

    get pageTitle(): any {
        try {
            return browser.getTitle().then((title) => {
                FrameworkComponent.logHelper.info("Page title is " + title);
                return title;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get clientName(): any {
        try {
            return this.eleclientName.getText().then(function (clientname) {
                FrameworkComponent.logHelper.info("client name is " + clientname);
                return clientname;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get petName(): any {
        try {
            return this.elepetName.getText().then(function (petname) {
                FrameworkComponent.logHelper.info("pet name is " + petname);
                return petname;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get petGender(): any {
        try {
            return this.elePetGender.getText().then(function (gender) {
                return gender.toLowerCase();
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get speciesName(): any {
        try {
            return this.eleSpecies.getText().then(function (species1) {
                FrameworkComponent.logHelper.info("species name is " + species1);
                return species1;
            })
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get primaryDrName(): string {
        let doctorName: any;
        try {
            browser.wait(ExpectedConditions.presenceOf(this.eleprimarydrName), 5000)
                .then(() => {
                    doctorName = this.eleprimarydrName.getText();
                });
            return doctorName;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get drShift(): any {
        try {
            return this.eledrshift.getText().then(function (drshift) {
                FrameworkComponent.logHelper.info("Dr shift is " + drshift);
                return drshift;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get petWellness(): any {
        try {
            return this.eleWellness.getText().then(function (welness) {
                FrameworkComponent.logHelper.info("Wellness is " + welness);
                return welness;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get petAlert(): any {
        try {
            return this.eleAlert.getText().then(function (alertText) {
                FrameworkComponent.logHelper.info("Alert text is " + alertText);
                return alertText;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get petAge(): any {
        try {
            return this.eleAge.getText().then(function (petAge) {
                FrameworkComponent.logHelper.info("Pet age is " + petAge);
                return petAge;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get petWeight(): any {
        try {
            return this.eleWeight.getText().then(function (petWeight) {
                FrameworkComponent.logHelper.info("Pet age is " + petWeight);
                return petWeight;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnSchedulerButton() {
        try {
            this.eleSchedulerButton.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnTreatmentLogButton() {
        try {
            this.eleTreatmentLogButton.click();
            browser.sleep(3000);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnTrendViewButton() {
        try {
            this.eleTrendViewButton.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    navigateToWhiteBoard() {
        try {
            this.eleWhiteBoradNavigation.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnTechnicianDropDown() {
        try {
            this.eleTechnicianDropDown.getWebElement().click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async selectTechnicianFromDropDown(technicianName) {
        try {
            let dropDownListValuesXpath = ".//div[@class='vPatientName']/descendant::li[contains(@class,'dayDoctor')]/descendant::lsu-dropdown/descendant::div[contains(@class,'item') and contains(text(),'" + technicianName + "')]";
            await this.clickOnTechnicianDropDown();
            browser.sleep(2000);
            await element(by.xpath(dropDownListValuesXpath)).click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get selectedTechnicianName() {
        try {
            return this.eleTechnicianDropDownText.getText().then((technicianName) => {
                FrameworkComponent.logHelper.info('Technician Name selected as : ' + technicianName);
                return technicianName;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnLocationDropDown() {
        try {
            this.eleLocationDropDown.getWebElement().click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async selectLocationFromDropDown(locationName) {
        try {
            let dropDownListValuesXpath = ".//div[@class='locationBox']/descendant::lsu-dropdown[preceding-sibling::div[contains(text(),'Location')]]/descendant::div[contains(@class,'item') and contains(text(),'" + locationName + "')]";
            await this.clickOnLocationDropDown();
            browser.sleep(3000);
            await element(by.xpath(dropDownListValuesXpath)).click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get selectedLocationName() {
        try {
            return this.eleLocationDropDownText.getText().then((locationName) => {
                FrameworkComponent.logHelper.info('Location Name selected as : ' + locationName);
                return locationName;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}    