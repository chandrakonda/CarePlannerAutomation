import { $, browser, element, by, By, ExpectedConditions } from "protractor";

export class TrendViewPage {
    //Page objects
    treatmentLogButton = element(by.xpath("//div[@class='nav-icon']//button[@popuptext='Treatment Log']"));

    statusCell = element(by.xpath(""));

    //Page methods

}



//*[@id='wijgridObject']/descendant::div[contains(@class,'wj-cell wj-alt') and not(contains(@class,'wj-frozen'))][position()="3"]

//div[@class='timeline-grid']//div[@class='wj-cell wj-alt'][position()=3]       row 1
//div[@class='timeline-grid']//div[@class='wj-cell'][position()=3]              row 2