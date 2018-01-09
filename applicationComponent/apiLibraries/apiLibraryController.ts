import { CarePlannerLibrary } from "../../applicationComponent";

export class APILibraryController {

    public static get careplannerLibrary() : CarePlannerLibrary {
        return new CarePlannerLibrary();
    }
}