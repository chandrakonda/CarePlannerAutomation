import { by, element } from "protractor";
import { FrameworkComponent } from "../../frameworkComponent";

export class WoofwareTopBar {
    

    //#region Page Object Eements for Woofware Topbar section

    __eleTopHeaderBar = element(by.xpath(""));
    __eleAppHomeIcon = element(by.xpath(""));
    __eleAppName = element(by.xpath(""));
    __eleAppTitle = element(by.xpath(""));

    __eleSearchIcon = element(by.xpath(""));
    __eleUserProfileIcon = element(by.xpath(""));
    __eleUserProfileDropDown = element(by.xpath(""));
    __eleLogoutButton = element(by.xpath(""));

    //#endregion


    //#region Page object methods for Woofware Topbar section

    NavigateToHomePage(){
        try {
            this.__eleAppHomeIcon.click();
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    IsTopBarDisplayed(){
        try {
            return this.__eleTopHeaderBar.isDisplayed().then((displayed) => {
                return displayed;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get appNameDisplayed() {
        try {
            return this.__eleAppName.getText().then((appName) => {
                return appName;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    get appTitleDisplayed() {
        try {
            return this.__eleAppTitle.getText().then((appTitle) => {
                return appTitle;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async Logout() {
        try {
            this.__eleUserProfileDropDown.click().then(async () => {
                let __logoutBtnVisible = await this.__eleLogoutButton.isDisplayed().then((displayed) => {
                    return displayed;
                })

                if(__logoutBtnVisible) {
                    this.__eleLogoutButton.click();
                } else {
                    throw 'Logout button not visible';
                    
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async clickOnSearchIcon() {
        try {
            if(await this.isSearchIconDisplayed) {
                this.__eleSearchIcon.click();
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    isSearchIconDisplayed() {
        try {
            return this.__eleSearchIcon.isDisplayed().then((displayed) => {
                return displayed;
            })
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
    //#endregion
}