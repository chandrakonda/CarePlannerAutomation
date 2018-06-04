import { by, element } from "protractor";
import { FrameworkComponent } from "../../frameworkComponent";

export class WoofwareHomePage {

    //#region Page Object Eements for Woofware Topbar section

    __eleSearchBanner = element(by.xpath(".//app-search/descendant::div[contains(@class,'search-banner')]"));
    __eleSearchLabel = element(by.xpath(".//app-search/descendant::div[text() = 'Search' and contains(@class,'search-text')]"));
    __eleSearchTextBox = element(by.xpath(".//app-search/descendant::input[@id='search']"));

    __eleSearchResultRegion = element(by.xpath(".//app-results/descendant::div[contains(@class,'result-scroll')]"));
    __eleSearchResultItems = element.all(by.xpath(".//app-results/descendant::div[contains(@class,'result-scroll')]/descendant::div[contains(@class,'search-suggestion-box')]"));
    __eleNoContentMessage = element(by.xpath(".//app-results/descendant::div[contains(@class,'no-content')]"))

    __elePetDetailsFromSearchResults = element.all(by.xpath(".//app-results/descendant::div[contains(@class,'result-scroll')]/descendant::div[contains(@class,'search-suggestion-box')]/div[contains(@class,'pet-owner')]"));


    __eleSearchCloseIcon = element(by.xpath(".//app-search/descendant::button[@class='close']"));
    __eleSearchOptionsTabs = element.all(by.xpath(".//app-search/descendant::div[contains(@class,'search-buttons')]/descendant::a"));
    __eleSearchOptionClientTab = element(by.xpath(".//app-search/descendant::div[contains(@class,'search-buttons')]/descendant::a[text()='Client']"));
    __eleSearchOptionPatientTab = element(by.xpath(".//app-search/descendant::div[contains(@class,'search-buttons')]/descendant::a[text()='Patient']"));
    __eleSearchOptionPhoneTab = element(by.xpath(".//app-search/descendant::div[contains(@class,'search-buttons')]/descendant::a[text()='Phone']"));
    __eleSearchOptionEmailTab = element(by.xpath(".//app-search/descendant::div[contains(@class,'search-buttons')]/descendant::a[text()='Email']"));
    __eleSearchOptionChartTab = element(by.xpath(".//app-search/descendant::div[contains(@class,'search-buttons')]/descendant::a[text()='Chart']"));


    //#endregion

    IsAtHomePage() {
        try {
            return this.__eleSearchBanner.isDisplayed().then((displayed) => {
                FrameworkComponent.logHelper.info("Search Banner is displayed in the home page");
                return displayed;
            })
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    EnterSearchText(searchText) {
        try {
            this.__eleSearchTextBox.sendKeys(searchText);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async ClearSearchTextEntered() {
        try {
            let __searchText = await this.__eleSearchTextBox.getText().then((searchText) => {
                return searchText;
            });

            await this.__eleSearchCloseIcon.isElementPresent((displayed) => {
                if (displayed) {
                    this.__eleSearchCloseIcon.click();
                } else if (__searchText != null) {
                    this.__eleSearchTextBox.sendKeys('');
                } else {
                    //DO nothing
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    selectSearchType(searchType: string) {
        try {
            switch (searchType.toLowerCase()) {
                case 'client':
                    this.__eleSearchOptionClientTab.click();
                    break;
                case 'patient':
                    this.__eleSearchOptionPatientTab.click();
                    break;
                case 'phone':
                    this.__eleSearchOptionPhoneTab.click();
                    break;
                case 'email':
                    this.__eleSearchOptionEmailTab.click();
                    break;
                case 'chart':
                    this.__eleSearchOptionChartTab.click();
                    break;
                default:
                    break;
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getSearhResultsCount() {
        try {
            return this.__elePetDetailsFromSearchResults.count().then((searchResultCount) => {
                return searchResultCount;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getClientNamesFromSearchResults() {
        try {
            let __searchResults = await this.__elePetDetailsFromSearchResults.getWebElements();

            let __clientNameList = new Array;

            __searchResults.forEach(async clientList => {

                let __clientName = await clientList.findElement(by.xpath(("/descendant::span[contains(@class, 'pet-owner-text-box')]"))).getText().then((clientName) => {
                    return clientName;
                });
                __clientNameList.push(__clientName);
            });

            return __clientNameList;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getPatientNamesFromSearchResultsUsingClientName(clientName) {
        try {
            let __searchResults = await this.__elePetDetailsFromSearchResults.getWebElements();

            let __xpath = ".//app-results/descendant::div[contains(@class,'pet-details-margin')][preceding-sibling::div[contains(@class,'pet-owner')]/descendant::span[contains(@class,'pet-owner-text-box') and text()='" + clientName + "']]/descendant::span[contains(@class,'pet-text-box')]";

            let __patientList = element.all(by.xpath(__xpath)).getText().then((patienList) => {
                return patienList;
            });

            return __patientList;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async isPatientNameExitUnderClientName(clientName, patientName) {
        try {

            let __xpath = ".//app-results/descendant::div[contains(@class,'pet-details-margin')][preceding-sibling::div[contains(@class,'pet-owner')]/descendant::span[contains(@class,'pet-owner-text-box') and text()='" + clientName + "']]/descendant::span[contains(@class,'pet-text-box')]";

            let __patientList = await  element.all(by.xpath(__xpath)).getWebElements();

            let __patientExist = false;

            for (let index = 0; index < __patientList.length; index++) {            
                let __petName = await __patientList[index].getText().then((name) => {return name});
                if(__petName === patientName) {
                   __patientExist = true;
                   break;
                }                
            }
            
            return __patientExist;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async clickOnPatientNameFromSearchResults(clientName, patientName) {
        try {

            let __xpath = ".//app-results/descendant::div[contains(@class,'pet-details-margin')][preceding-sibling::div[contains(@class,'pet-owner')]/descendant::span[contains(@class,'pet-owner-text-box') and text()='" + clientName + "']]/descendant::span[contains(@class,'pet-text-box')]";

            let __patientList = await  element.all(by.xpath(__xpath)).getWebElements();

            for (let index = 0; index < __patientList.length; index++) {            
                let __petName = await __patientList[index].getText().then((name) => {return name});
                if(__petName === patientName) {
                    __patientList[index].click();
                    // browser.sleep(2000);
                    break;
                }                
            }

            
            //     patientList.forEach(patient => {
            //         patient.getText().then((petName) => {
            //             if (petName === patientName) {
            //                 patient.click();
            //                 browser.sleep(2000);
            //             }
            //         });
            //     })            
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

}