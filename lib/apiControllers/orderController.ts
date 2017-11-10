import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';

const path = require('path');

export class OrderController{
    
    constructor(){}

    addOrderToVisit(){
        console.log("*************** Adding Product to Order **************");
        let options = require(path.join(__dirname, '..//..//..//data//jsonObjects//addOrderToVisit.json'));

        //Set URL
        options.url = browser.appenvdetails.wwapiendpoint + "Visits/"+ browser.visitId + "/VisitInvoiceItems";

        //Set header values
        options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
        options.headers.authorization = browser.bearerToken;

        // let newOptions = options
        // options.body = null;

        // if(newOptions.body.length >1){
        //     console.log(newOptions.body[1]);
        //     options = options.body[1];
        //     console.log(options.body);
        // };
        


        // var product = [{
        //         "InvoiceItemId": 75705,
        //         "InvoiceItemTypeId": 1,
        //         "PLNo": 53,
        //         "SeqNo": 1,
        //         "Code": "53.1"              
        //     }];

        // options.body = {body:JSON.stringify(product)};
        
        var api = new CarePlannerApiServices();
        return api.putRequest(options);
    }

}