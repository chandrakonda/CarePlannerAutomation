import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
import {AddingProductsModel} from '../../data/model/products_model';

const path = require('path');

export class OrderController{
    
    constructor(){
        browser.logger.info("*********** Order Controller ***********")
    }

    addOrderToVisit(){
       if (browser.productDataFile != undefined){return AddingProductsModel.submitProductToVisit(browser.productDataFile);}
       else {return AddingProductsModel.submitProductToVisit();}
    }

    getTaskSeriesByOrderId(){
        
        browser.logger.info("*********** get task series by order id ***********");
        let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//getTaskSeriesByOrderId.json'));
        //Set URL
        options.url = browser.appenvdetails.wwapiendpoint + "Orders/"+ browser.visitId + "/TaskSeries";
        
        //Set header values
        options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
        options.headers.authorization = browser.bearerToken;

        var api = new CarePlannerApiServices();
        return api.makeGetRequest(options);
    }

}