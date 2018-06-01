import { AuthorizationLibrary } from "../../applicationComponent";
import { SearchLibrary } from "./searchLibrary";
import { WoofwareAPILibrary } from "./woofware3.0";



export class APILibrary {
    /**
     * static get woofware30() : WoofwareAPILibrary    */
    public static get woofware30() : WoofwareAPILibrary {
        return new WoofwareAPILibrary();
    }

    /**
     * 
     */
    public static get authorizationLibrary() : AuthorizationLibrary {
        return new AuthorizationLibrary();
    }

    /**
     * name
     */
    public static get searchLibarary() : SearchLibrary {
        return new SearchLibrary();
    }
}