import { CareplannerSchedulerPage, CareplannerClientAndPetDetailsPage, CareplannerTaskSchedulerPopup,
    CareplannerTaskOcurrencePopup } from '../../applicationComponent';


export class Pages{
    
    public static  get cpClientAndPetDetailsPage() : CareplannerClientAndPetDetailsPage {
        return new CareplannerClientAndPetDetailsPage();
    }

    public static get cpSchedulerPage() : CareplannerSchedulerPage{
        return new CareplannerSchedulerPage();
    }

    public static get cpTaskOccurrencePopup(): CareplannerTaskOcurrencePopup {
        return new CareplannerTaskOcurrencePopup();
    }

    public static get cpTaskSchedulerPopup(): CareplannerTaskSchedulerPopup {
        return new CareplannerTaskSchedulerPopup();
    }

        

}

// export { CareplannerSchedulerPage } from './careplanner/cpScheduler.page';
// export { CareplannerClientAndPetDetailsPage } from './careplanner/cpClientAndPetDetails.page'

