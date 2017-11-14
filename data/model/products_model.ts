
import { browser } from 'protractor';
import { CarePlannerApiServices } from '../../lib/apiServices/carePlannerApiServices';
export namespace AddingProductsModel {
    const path = require('path');
    // Products data model 
    let __productToBeAddedJson = require(path.join(__dirname, '..//..//..//data//jsonObjects//productsToAdd.json'));

    interface ProductCollection {
        InvoiceItemId: number;
        InvoiceItemTypeId: number;
        PLNo: number;
        SeqNo: number;
        Code: string;
    }

    class RootObject {

        products: ProductCollection[];

        constructor() {
            this.products = __productToBeAddedJson.products;
        }

    }

    // Loop products to form request to add products 
    export function submitProductToVisit(){
        let response1 = [];
        let options = require(path.join(__dirname, '..//..//..//data//jsonApiTemplates//addOrderToVisit.json'));
        let rootObject = new RootObject();
        browser.visitId = browser.visitId;
        rootObject.products.forEach(product => {
            browser.logger.log("*************** Adding Product to Order **************");
            //Set URL
            options.url = browser.appenvdetails.wwapiendpoint + "Visits/" + browser.visitId + "/VisitInvoiceItems";
            //Set header values
            options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
            options.headers.authorization = browser.bearerToken;
            options.body = product
            browser.logger.info("************product options **********")
            browser.logger.info(options)
            browser.logger.info("************product options **********")
             let apiServices = new CarePlannerApiServices();
            response1.push(apiServices.makePutRequest(options));
        });

        return response1;
    }
    // foreach product, we need to have form request and send

}

