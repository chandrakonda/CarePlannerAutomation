import { by, element } from "protractor";
import { FrameworkComponent } from '../../frameworkComponent';

export class TreatmentLogPage {

    eleTretmentLogGrid = element(by.id('timelinegrid'))
    eleColumnHeaders = element.all(by.xpath("//*[@id='timelinegrid']/descendant::div[@wj-part='chcells']/div[contains(@class,'wj-cell wj-header')]"));
    eleDateGroupHeader = element.all(by.xpath("//*[@id='timelinegrid']/descendant::div[@wj-part='cells']/div[contains(@class,'wj-group')]"));
    eleTableRowData = element.all(by.xpath("//*[@id='timelinegrid']/descendant::div[@wj-part='cells']/div[contains(@class,'wj-cell') and not(contains(@class, 'wj-group'))]"));
    eleDetailsList = element.all(by.xpath("//*[@id='timelinegrid']/descendant::div[@wj-part='cells']/div[contains(@class,'wj-cell') and not(contains(@class, 'wj-group'))]/descendant::div[contains(@class,'gridwrap')]"));

    isTreatmentLogPageLoaded() {
        try {
            return this.eleTretmentLogGrid.isDisplayed().then((status) => {
                if (status == true) {
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

    getTreatmentLogColumnHeadersCount() {
        try {
            return this.eleColumnHeaders.count().then((columnCount) => {
                return columnCount;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getTreatmentLogColumnHeaders() {
        try {
            let columnHeaders = this.eleColumnHeaders.getText().then((headerValues) => {
                return headerValues;
            });
            return columnHeaders;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getTreatmentLogColumnIndex(columnName: string) {
        try {
            let columnNameIndex = this.eleColumnHeaders.getText().then((headerValues) => {
                return headerValues.indexOf(columnName);
            });
            return columnNameIndex;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getTreatmentLogInfo() {
        try {
            let __rowData = this.eleTableRowData.getText().then((rowData) => {
                return rowData;
            });
            return __rowData;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getTreatmentLogInformationAsList() {
        try {
            let __columnCount = await this.getTreatmentLogColumnHeadersCount();
            let __listData = new Array;
            let __rowData: any = await this.eleTableRowData.getText().then((rowData) => {
                return rowData;
            });

            while (__rowData.length > 0) {
                __listData.push(__rowData.splice(0, __columnCount))
            }

            return __listData;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getTreatmentLogDetailsList(): any {
        try {
            let __observationDetails = this.eleDetailsList.getText().then((detailsList) => {
                return detailsList;
            })
            return __observationDetails;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getTreatmentLogByTaskSeriesName(taskSeriesName) {
        try {
            let __detailsList = new Array<string>();

            let __treatmentLogDetails = await this.getTreatmentLogDetailsList();

            __treatmentLogDetails.forEach(list => {
                if (list.startsWith(taskSeriesName) || list.includes(taskSeriesName)) {
                    __detailsList.push(list);
                }
            });

            return __detailsList;

        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }


    // async getTreatmentLogInfoByTaskName(taskName:string){
    //     try {
    //         let __rowData = this.eleTableRowData.getText().then((rowData) => {
    //             return rowData;
    //         });
    //         return __rowData;
    //     } catch (error) {
    //         FrameworkComponent.logHelper.error(error);
    //         throw error;
    //     }
    // }

    // async getTreatmentStatusInfoByTaskName(taskName:string){
    //     try {

    //     } catch (error) {
    //         FrameworkComponent.logHelper.error(error);
    //         throw error;
    //     }
    // }

    // async getTreatmentCompletedTimeByTaskName(taskName:string){
    //     try {

    //     } catch (error) {
    //         FrameworkComponent.logHelper.error(error);
    //         throw error;
    //     }
    // }

    // async getTreatmentCompletedDateByTaskName(taskName:string){
    //     try {

    //     } catch (error) {
    //         FrameworkComponent.logHelper.error(error);
    //         throw error;
    //     }
    // }

    // async getTreatmentObservationDetailsByTaskName(taskName:string){
    //     try {

    //     } catch (error) {
    //         FrameworkComponent.logHelper.error(error);
    //         throw error;
    //     }
    // }
}