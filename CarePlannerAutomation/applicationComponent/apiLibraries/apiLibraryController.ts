import { CarePlannerLibrary } from "./careplannerLibrary";

export class APILibraryController {

    public static get careplannerLibrary(): CarePlannerLibrary {
        return new CarePlannerLibrary();
    }
}