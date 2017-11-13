import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';
import {AddingProductsModel} from '../../data/model/products_model';

const path = require('path');

export class OrderController{
    
    constructor(){
        browser.logger.info("*********** Order Controller ***********")
    }

    addOrderToVisit(){
       // browser.logger.info("*********** Adding Product to Order ***********");
       // let options = require(path.join(__dirname, '..//..//..//data//jsonObjects//addOrderToVisit.json'));
       return AddingProductsModel.submitProductToVisit();
        //Set URL
       // options.url = browser.appenvdetails.wwapiendpoint + "Visits/"+ browser.visitId + "/VisitInvoiceItems";

        //Set header values
       // options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
       // options.headers.authorization = browser.bearerToken;

      //  var api = new CarePlannerApiServices();
      //  return api.makePutRequest(options);
    }

    getTaskSeriesByOrderId(){
        browser.logger.info("*********** get task series by order id ***********");
        let options = require(path.join(__dirname, '..//..//..//data//jsonObjects//generalGetMethod.json'));

        //Set URL
        options.url = browser.appenvdetails.wwapiendpoint + "Orders/"+ browser.visitId + "/TaskSeries";
        
        //Set header values
        options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
        options.headers.authorization = browser.bearerToken;

        var api = new CarePlannerApiServices();
        return api.makeGetRequest(options);
    }

}