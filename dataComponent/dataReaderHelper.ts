import { SpecFile, Data, TestCase, TestBase } from '../applicationcomponent'
import { FrameworkComponent } from '../frameworkComponent/helper/frameworkHelper';

// there can be multiple files for each json for API
// there can be run time data
// there can be scheduler data

const path = require('path');

export class DataReader {

    // Idea is to have single data file for each spec.
    // All data related to spec will be loaded into that
    // loadSchedulerSpecData(specData: SpecFile, fiileName: string, folderName?: string) {
    //     // import json file file 
    //     try {
    //         specData.UserData = this.loadJsonData(fiileName, folderName);            
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    loadJsonData(fiileName: string, folderName?: string): any {
        let __userData: any;
        // import json file file 
        try {
            if (folderName != null) {
                __userData = require(path.join(__dirname, '../../applicationComponent/data/userData/' + folderName + '/' + fiileName + '.json'));
            }
            else {
                __userData = require(path.join(__dirname, '../../applicationComponent/data/userData/' + fiileName + '.json'));
            }
        }
        catch (error) {
            throw error;
        }
        return __userData;
    }



    static loadAPITemplates(fileName: string): any {
        try {
            let __options = require(path.join(__dirname, '../../applicationComponent/data/apiTemplates/' + fileName + '.json'));
            return __options;
        } catch (error) {
            throw error;
        }
    }


    static loadAPIDefaultValues(fileName: string): any {
        try {
            return require(path.join(__dirname, '../../applicationComponent/data/defaultValues/' + fileName + '.json'));
        } catch (error) {
            throw error;
        }
    }







}
    
    // static loadAPIUserData(fiileName: string, folderName?: string): any {
    //     try {
    //         // Load specific data 
    //         let __datareader = new DataReader();
    //         return __datareader.loadJsonData(fiileName, folderName);

    //     } catch (error) {
    //         throw error;
    //     }
    // }