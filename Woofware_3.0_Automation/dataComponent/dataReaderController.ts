import { FrameworkComponent } from "../frameworkComponent";

const path = require('path');

export class DataReaderController {

    static loadUserData(fiileName: string, folderName?: string): any {
        try {
            let __userData: any;
            // import json file file 

            if (folderName != null) {
                __userData = require(path.join(__dirname, '..\\..\\..\\Woofware_3.0_Automation\\dataComponent\\userData\\' + folderName + '\\' + fiileName + '.json'));
            }
            else {
                __userData = require(path.join(__dirname, '..\\..\\..\\Woofware_3.0_Automation\\dataComponent\\userData\\' + fiileName + '.json'));
            }
            return __userData;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }


    static loadAPITemplates(fileName: string): any {
        try {
            let __options = require(path.join(__dirname, '..\\..\\..\\Woofware_3.0_Automation\\dataComponent\\apiTemplates\\' + fileName + '.json'));
            return __options;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }


    static loadAPIDefaultValues(fileName: string): any {
        try {
            return require(path.join(__dirname, '..\\..\\..\\Woofware_3.0_Automation\\dataComponent\\data\\defaultValues\\' + fileName + '.json'));
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
}