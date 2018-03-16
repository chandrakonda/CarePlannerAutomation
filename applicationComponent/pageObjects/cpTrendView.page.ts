import { FrameworkComponent } from '../../frameworkComponent';
import { $, browser, element, by, By, ExpectedConditions, protractor } from "protractor";

export class TrendViewPage {

    eleTrendViewGrid = element(by.id('observation'));
    eleCategoryList = element.all(by.xpath("//*[@id='observation']/descendant::div[contains(@class,'trendHeader0')]"));
    eleTaskSeriesList = element.all(by.xpath("//*[@id='observation']/descendant::div[contains(@class,'trendHeader1')]"));
    eleObservationNameList = element.all(by.xpath("//*[@id='observation']/descendant::div[contains(@class,'trendHeader2')]"));
    eleObservationTimeList = element.all(by.xpath("//*[@id='observation']/descendant::div[contains(@class,'wj-frozen wj-frozen-col') and not(contains(@class,'wj-group'))]/div"));
    eleObservationValueList = element.all(by.xpath("//*[@id='observation']/descendant::div[contains(@class,'wj-cell') and contains(@class,'v-center') and not(contains(@class,'wj-group'))]"));



    
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

    getCategoryListedOnTrendView() : any {
        try {
            
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getObservationValuesAsList() {
        try {
            let __listValue = this.eleObservationValueList.then((value) => {
                return value;
            })
            return __listValue;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getObservationColumnCount() {
        try {
            let __columnCount = this.eleObservationNameList.count().then((value) => {
                return value;
            })
            return __columnCount;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getObservationTimeList() {
        try {
            let __observationTimes = this.eleObservationTimeList.getText().then((value) => {
                return value;
            })
            return __observationTimes;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    getObservationColumnNames() {
        try {
            let __observationTimes = this.eleObservationNameList.getText().then((value) => {
                return value;
            })
            return __observationTimes;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async getObservationDetailsByTaskSeriesName(taskSeriesName, observationList, occurrenceTime) {

        try {
            let __returnValues = new Array;
            let __observationNames: any = await this.getObservationColumnNames();
            let __observationValues: any[] = await this.getObservationRecords();
            let __observationTimeList  = await this.getObservationTimeList();
            let __occurrenceIndex = __observationTimeList.indexOf(occurrenceTime);

            for (let i = 0; i < __observationNames.length; i++) {
                for (let j = 0; j < observationList.length; j++) {
                    if (__observationNames[i].match(observationList[j])) {
                        // __returnValues.push(observationList[j] + ': ' + __observationValues[__occurrenceIndex][j]);
                        __returnValues.push(__observationValues[__occurrenceIndex][j]);
                        break;
                    }
                }
            }

            FrameworkComponent.logHelper.info(__returnValues);       
            return __returnValues;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }

    }

    async getObservationDetailsFromTrenViewPage(specFileData, taskSeriesName) {

        try {

            let __observationNames:any = await this.getObservationColumnNames();
            let __observationColumnCount = __observationNames.length;
            let __observationValues:any[]  = await this.getObservationRecords();
            let __returnValues = new Array;

            specFileData.UserData.TaskSeries.forEach(taskSeriesInfo => {
                
                if(taskSeriesInfo.taskSeriesName === taskSeriesName){
                
                    taskSeriesInfo.taskScheduleInfo.forEach(taskScheduleInfo => {

                        let __observation = new Array;

                        for (let i = 0; i < __observationNames.length; i++) {
                            
                            for (let j = 0; j < taskScheduleInfo.observationList.length; j++) {
                                
                                if(__observationNames[i].match(taskScheduleInfo.observationList[j])) {
                                    __observation.push(taskScheduleInfo.observationList[j]);
                                    break;
                                }
                                
                            }
                        }
                        // __observationNames.forEach(obser => {
                        //     taskScheduleInfo.observationList.forEach(value => {
                        //         if(obser.match(value)){
                        //             __observation.push(value);
                        //         }
                        //     })
                        // });
                        __observationNames = __observation;
                    });

                    for (let index = 0; index < __observationValues.length; index++) {
                        let __individualValue = new Array;
                        
                        __observationNames.forEach(obser=> {
                            __individualValue.push( obser + ' : ' + __observationValues[index][__observationNames.indexOf(obser)]);                       
                        });                        
                        __returnValues[index] = __individualValue;
                    }
                }
            });
           
            FrameworkComponent.logHelper.info(__returnValues);
            return __returnValues;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }

    }

    async getObservationRecords() {
        try {
            let __observationNames = await this.getObservationColumnNames();
            let __observationColumnCount = __observationNames.length;
            let __observationValues:any   = await this.eleObservationValueList.getText().then((value) => {
                return value;
            });
            let __observationList:any[] = new Array;
                
            while (__observationValues.length > 0) {
                __observationList.push(__observationValues.splice(0,__observationColumnCount))
            }            
            return __observationList;

        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}