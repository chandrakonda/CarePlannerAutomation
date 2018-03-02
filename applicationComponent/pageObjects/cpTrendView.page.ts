import { FrameworkComponent } from '../../frameworkComponent';
import { $, browser, element, by, By, ExpectedConditions, protractor } from "protractor";

export class TrendViewPage {

    eleTrendViewGrid = element(by.id('observation'));
    
    isTrendViewPageLoaded(): any {
        try {
            return this.eleTrendViewGrid.isDisplayed().then((status) => {
                if(status == true){
                    return true;
                } else {
                    return false;
                }
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    
}