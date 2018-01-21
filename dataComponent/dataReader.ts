import { SpecFile, Data, TestCase, TestBase} from  '../applicationcomponent'


const path = require('path');

export class DataReader{

    // Idea is to have single data file for each spec.
    // All data related to spec will be loaded into that
    loadSpecData(specData:SpecFile, fiileName:string, folderName?: string){
        // import json file file 
        if (folderName != null){
            specData.UserData = require(path.join(__dirname, '../../applicationComponent/data/userData/'+folderName+'/'+fiileName+'.json'));
        }
        else{
            specData.UserData = require(path.join(__dirname, '../applicationComponent/data/userData/'+fiileName+'.json'));
        }
    }






}