import { AuthorizationLibrary } from "../../applicationComponent";
import { ClientLibrary } from "./clientLibrary";
import { WoofwareAPILibrary } from "./woofware3.0";



export class APILibraries {
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
    public static get clientLibrary() : ClientLibrary {
        return new ClientLibrary();
    }
}