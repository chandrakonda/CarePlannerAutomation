import { browser, by, element } from "protractor";
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

    eleNumberOfHoursDisplayed = element.all(by.xpath(".//wj-flex-grid/descendant::div[@wj-part='chcells']/descendant::div[contains(@class,'wj-cell wj-header') and not(contains(@class,'wj-frozen')) and not(contains(@style,'display: none;'))]"));

    IsAtWhiteboardPage() {
        try {
            return this.eleWhiteboard.isDisplayed().then((displayed) => {
                return displayed;
            });
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

            element(by.xpath(__xpath)).getWebElement().click();

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

    IsPatientInformationFilteredByName(clientName) {
        try {

            let __xpath = ".//wj-flex-grid/descendant::div[@wj-part='cells']/descendant::div[contains(@class,'wj-frozen')]/descendant::li[@class='client_name']/descendant::div/span[contains(text(),'" + clientName + "')]";

            return element(by.xpath(__xpath)).isDisplayed().then((displayedStatus) => {
                return displayedStatus;
            });
                       
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getOverdueCountByclienttName(clientName) {
        try {
            let __xpath = ".//*[@id='whiteboard']/wj-flex-grid/descendant::div[@wj-part='cells']/descendant::div[contains(@class,'patient_item')]/descendant::li[@class='client_name']/span[contains(@class,'ui circular red')]/div[parent::span[preceding-sibling::div/span[text()='" + clientName + "']]]";

            return element(by.xpath(__xpath)).isPresent().then((displayStatus) => {
                if (displayStatus) {
                    return element(by.xpath(__xpath)).getText().then((overdueTaskCount) => {
                        if (overdueTaskCount.length === 1) {
                            return +overdueTaskCount;
                        }
                    });
                } else {
                    return 0;
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

            return element(by.xpath(__xpath)).isPresent().then((displayStatus) => {
                if (displayStatus) {
                    return element(by.xpath(__xpath)).getText().then((notScheduledCount) => {
                        return +notScheduledCount;
                    });
                } else {
                    return 0;
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getPatientNameIndexByClientName(clientName) {
        try {
            let __xpath = ".//wj-flex-grid/descendant::div[@wj-part='cells']/descendant::div[contains(@class,'wj-frozen')]/descendant::li[@class='client_name']/descendant::div/span";

            return element.all(by.xpath(__xpath)).getText().then((listItems) => {
                FrameworkComponent.logHelper.info(listItems);
                return listItems.indexOf(clientName);
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getPositionByClientName(clientName) {
        try {
            let __sPos, __ePos, __avaHour;

            let __clientNameIndex = await this.getPatientNameIndexByClientName(clientName);

            //get total hours displayed in the ui
            let __totalHoursDisplayed = await this.eleNumberOfHoursDisplayed.count().then((count) => { return count; });

            if (__clientNameIndex == 0) {
                __sPos = 1;
                __ePos = __totalHoursDisplayed;
            } else if (__clientNameIndex >= 1) {
                __sPos = __clientNameIndex * __totalHoursDisplayed + 1;
                __ePos = __clientNameIndex * __totalHoursDisplayed + __totalHoursDisplayed;
            } else {
                __sPos = 0;
                __ePos = 0;
            }
            return { StartPosition: __sPos, EndPosition: __ePos };
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getNumberOfTaskOccurrenceListedByPosition(startPosition, endPosition) {
        try {
            let __xpath = ".//wj-flex-grid/descendant::div[@wj-part='cells']/descendant::div[contains(@class,'wj-cell') and not(contains(@class,'wj-frozen'))][position() >= " + startPosition + " and not(position() > " + endPosition + ")]/descendant::ul[contains(@class,'occurence')]";

            return element.all(by.xpath(__xpath)).count().then((taskOccurrenceCount) => {
                return taskOccurrenceCount
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getOccurrenceStatusByPosition(startPosition, endPosition) {
        try {
            let __xpath = ".//wj-flex-grid/descendant::div[@wj-part='cells']/descendant::div[contains(@class,'wj-cell') and not(contains(@class,'wj-frozen'))][position() >= " + startPosition + " and not(position() > " + endPosition + ")]/descendant::ul[@class='occurence1']/li";

            return element.all(by.xpath(__xpath)).getAttribute('class').then((listItems) => {
                let __returnValues = new Array;
                for (let index = 0; index < listItems.length; index++) {
                    switch (listItems[index].split(' ')[0].trim().toLowerCase()) {
                        case 'wb_overdue':
                            __returnValues[index] = 'Overdue';
                            break;
                        case 'wb_skipped':
                            __returnValues[index] = 'Skipped';
                            break;
                        case 'wb_completed':
                            __returnValues[index] = 'Completed';
                            break;
                        case 'wb_planned':
                            __returnValues[index] = 'Planned';
                            break;
                        case 'wb_duenow':
                            __returnValues[index] = 'Duenow';
                            break;
                        default:
                            __returnValues[index] = '';
                            break;
                    }
                }
                return __returnValues;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    scrollToLeftWhiteboardGrid() {
        try {
            browser.executeScript("$('#whiteboard > wj-flex-grid > div:nth-child(1) > div:nth-child(2)').scrollLeft($('#whiteboard > wj-flex-grid > div:nth-child(1) > div:nth-child(2)').scrollLeft + 20)");
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    clickOnPatientByClientName(clientName) {
        try {
            let __xpath = ".//wj-flex-grid/descendant::div[@wj-part='cells']/descendant::div[contains(@class,'wj-frozen')]/descendant::li[@class='client_name']/descendant::div/span[text()='" + clientName + "']";

            element(by.xpath(__xpath)).getWebElement().click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    formatTaskOccurrenceStatus(stausList) {
        try {
            let __returnStatusList = new Array;
            stausList.forEach(statusName => {
                switch (statusName.toLowerCase()) {
                    case 'complete':
                        __returnStatusList.push("Completed")
                        break;                
                    default:
                        __returnStatusList.push(statusName);
                        break;
                }
            });
            return __returnStatusList;      
        } catch (error) {
            
        }
    }

}