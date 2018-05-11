import { by, element } from "protractor";
import { FrameworkComponent } from "../../frameworkComponent";

export class CareplannerWhiteboardPage {

    eleWhiteboard = element(by.xpath(".//div[@id='whiteboard']/wj-flex-grid"));
    eleFilterButton = element(by.xpath(".//button[@id='btnPopup']"));
    eleFilterState = element(by.xpath(".//button[@id='btnPopup']/span"))
    eleFilterPopup = element(by.xpath(".//wj-popup[@id='fillterpopup']"))
    eleCloseIconFilterPopup = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[@class='icon closeButton']"));
    eleApplyButton = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::button[text()='Apply']"));
    eleClearFilters = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::button[text()='Clear all filters']"));

    eleFiltersVisitType = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[@class='listitem']/div[text()='Visit type']"));
    eleFiltersLocation = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[@class='listitem']/div[text()='Location']"));
    eleFiltersResources = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[@class='listitem']/div[text()='Resources']"));
    eleFiltersDepartment = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[@class='listitem']/div[text()='Department']"));
    eleFiltersTechnician = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[@class='listitem']/div[text()='Technician']"));

    eleSortByPatientRadioButton = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[contains(@class,'switch-toggle')]/label[text()='Patient']"));
    eleSortByClientRadioButton = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[contains(@class,'switch-toggle')]/label[text()='Client']"));

    eleShowCriticalPatientCheckbox = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[contains(@class,'checkbox')]/input[following-sibling::label[text()='Show critical patients first']]"))
    eleShowCriticalPatientCheckboxLabel = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[contains(@class,'checkbox')]/label[text()='Show critical patients first']"));

    eleFilterTitleText = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[contains(@class,'title')]"));
    eleFilterBackButton = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::div[contains(@class,'back_btn')]/span[text()='Back']"));

    eleSelectAllCheckbox = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::input[@id='selectall'][following-sibling::label[@for='selectall']]"));
    eleSelectAllCheckboxText = element(by.xpath(".//wj-popup[@id='fillterpopup']/descendant::label[@for='selectall'][preceding-sibling::input[@id='selectall']]"));

    elePatientInformationsListed = element.all(by.xpath("//*[@id='whiteboard']/wj-flex-grid/descendant::div[@wj-part='cells']/descendant::div[contains(@class,'patient_item')]/descendant::li[@class='client_name']/div"));

    IsAtWhiteboardPage() {
        try {
            return this.eleWhiteboard.isDisplayed().then((displayed) => {
                return displayed;
            })
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnFilterButton() {
        try {
            this.eleFilterButton.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    IsFilterPopupDisplayed() {
        try {
            return this.eleFilterPopup.isDisplayed().then((displayed) => {
                if (displayed) {
                    FrameworkComponent.logHelper.info("Filter Popup displayed")
                } else {
                    FrameworkComponent.logHelper.info("Filter Popup doesn't displayed")
                }
                return displayed;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    closeFilterPopup() {
        try {
            this.eleCloseIconFilterPopup.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clearFilterOptionsSelected() {
        try {
            this.eleFilterPopup.isDisplayed().then((displayed) => {
                if (displayed) {
                    this.eleClearFilters.click();
                    this.eleApplyButton.click();
                } else {
                    this.clickOnFilterButton();
                    this.eleClearFilters.click();
                    this.eleApplyButton.click();
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    applyFilterOptionSelected() {
        try {
            this.eleApplyButton.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnFilterByName(filterName: string) {
        try {
            switch (filterName.toLowerCase()) {
                case 'visit type':
                    this.eleFiltersVisitType.click();
                    break;
                case 'location':
                    this.eleFiltersLocation.click();
                    break;
                case 'resources':
                    this.eleFiltersResources.click();
                    break;
                case 'department':
                    this.eleFiltersDepartment.click();
                    break;
                case 'technician':
                    this.eleFiltersTechnician.click();
                    break;
                default:
                    break;
            }

        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    sortFilterByPatient() {
        try {
            this.eleSortByPatientRadioButton.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    sortFilterByClient() {
        try {
            this.eleSortByClientRadioButton.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    IsShowCriticalPatientsCheckBoxSelected() {
        try {
            return this.eleShowCriticalPatientCheckbox.isSelected().then((value) => {
                if (value) {
                    FrameworkComponent.logHelper.info("Show Critical Patients First checkbox is selected");
                } else {
                    FrameworkComponent.logHelper.info("Show Critical Patients First checkbox doesn't selected");
                }
                return value;
            })
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    selectShowCriticalPatientCheckbox() {
        try {
            if (!this.IsShowCriticalPatientsCheckBoxSelected()) {
                this.eleShowCriticalPatientCheckboxLabel.click();
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    selectFilterOptionsByGivenName(optionNameToSelect) {
        try {
            let __xpath = ".//wj-popup[@id='fillterpopup']/descendant::wj-flex-grid/descendant::div[@wj-part='cells']/descendant::input[following-sibling::label[contains(text(),'" + optionNameToSelect + "')]]";

            let __filterOptionElement = element(by.xpath(__xpath));

            __filterOptionElement.getWebElement().click();

        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnBackButton() {
        try {
            this.eleFilterBackButton.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get selectedFilterTitle() {
        try {
            return this.eleFilterTitleText.getText().then((titleText) => {
                FrameworkComponent.logHelper.info("Seletced Filter Title displayed as : " + titleText);
                return titleText;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    IsSelectAllCheckboxSelected() {
        try {
            return this.eleSelectAllCheckbox.isSelected().then((selectedValue) => {
                if (selectedValue) {
                    FrameworkComponent.logHelper.info("Select All checkbox has been selected");
                } else {
                    FrameworkComponent.logHelper.info("Select All checkbox doesn't selected");
                }
                return selectedValue;
            })
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    unselectCheckboxSelectAll() {
        try {
            if (this.IsSelectAllCheckboxSelected()) {
                this.eleSelectAllCheckboxText.click();
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    selectCheckboxSelectAll() {
        try {
            if (!this.IsSelectAllCheckboxSelected()) {
                this.eleSelectAllCheckboxText.click();
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get getFilterStatus() {
        try {
            return this.eleFilterState.getText().then((textValue) => {
                if (textValue.toLowerCase() === 'off') {
                    return "OFF";
                } else if (textValue.toLowerCase() === 'on') {
                    return "ON";
                } else {
                    return '';
                }
            })
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getPatientInformationListedByClientName(clientName) {
        try {
            let __xpath = "//*[@id='whiteboard']/wj-flex-grid/descendant::div[@wj-part='cells']/descendant::div[contains(@class,'patient_item')]/descendant::li[@class='client_name']";
            return element.all(by.xpath(__xpath)).getText().then((text) => {
                if (text.length >= 1) {
                    for (let index = 0; index < text.length; index++) {
                        if (text[index] === clientName) {
                            return text[index];
                        }
                    }
                } else {
                    return '';
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    IsPatientInformationFilteredByName(clientPatientName) {
        try {
            return this.elePatientInformationsListed.getText().then((displayeName) => {
                let __returnValue = false;
                if (displayeName.length >= 1) {
                    for (let index = 0; index < displayeName.length; index++) {
                        if (displayeName[index] === clientPatientName) {
                            __returnValue = true;
                        }
                    }
                } else {
                    __returnValue = false;
                }
                return __returnValue;
            })
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getOverdueCountByclienttName(clientName) {
        try {
            let __xpath = ".//*[@id='whiteboard']/wj-flex-grid/descendant::div[@wj-part='cells']/descendant::div[contains(@class,'patient_item')]/descendant::li[@class='client_name']/span[contains(@class,'ui circular red')]/div[parent::span[preceding-sibling::div/span[text()='" + clientName + "']]]";
            return element(by.xpath(__xpath)).getText().then((overdueTaskCount) => {
                if (overdueTaskCount.length === 1) {
                    return +overdueTaskCount;
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getNotScheduledCountByClientName(clientName) {
        try {
            let __xpath = ".//*[@id='whiteboard']/wj-flex-grid/descendant::div[@wj-part='cells']/descendant::div[contains(@class,'patient_item')][descendant::li[@class='client_name']/descendant::span[text()='" + clientName + "']]/descendant::div[@id='whiteboard']/descendant::div[@class='count']";

            return element(by.xpath(__xpath)).getText().then((notScheduledCount) => {
                return +notScheduledCount;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}