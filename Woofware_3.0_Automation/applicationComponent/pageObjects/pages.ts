import { WoofwareHomePage, WoofwareMedicalOverviewPage, WoofwareTopBar } from "../../applicationComponent";

export class Pages {

    public static get WoofwareTopBar():WoofwareTopBar {
        return new WoofwareTopBar();
    }

    public static get WoofwareHomePage() : WoofwareHomePage {
        return new WoofwareHomePage();
    }

    public static get WoofwareMedicalOverviewPage() : WoofwareMedicalOverviewPage {
        return new WoofwareMedicalOverviewPage();
    }
}