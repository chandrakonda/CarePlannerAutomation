import { WoofwareHomePage, WoofwareTopBar } from "../../applicationComponent";

export class Pages {

    public static get WoofwareTopBar():WoofwareTopBar {
        return new WoofwareTopBar();
    }

    public static get WoofwareHomePage() : WoofwareHomePage {
        return new WoofwareHomePage();
    }
}