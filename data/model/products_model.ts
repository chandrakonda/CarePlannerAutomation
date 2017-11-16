
import { browser } from 'protractor';
import { CarePlannerApiServices } from '../../lib/apiServices/carePlannerApiServices';
export namespace AddingProductsModel {
    const path = require('path');


    interface ProductCollection {
        InvoiceItemId: number;
        InvoiceItemTypeId: number;
        PLNo: number;
        SeqNo: number;
        Code: string;
    }

    class RootObject {
        products: ProductCollection[];
        constructor(productFileName?: string) {
            // If user gives any file name from which he wants to load data, then we will use it. Or else we will load default values
            if (productFileName != null) {
                let __productToBeAdded = require(path.join(__dirname, '..//..//..//data//userData//' + productFileName + '.json'));
                this.products = __productToBeAdded.products;
            }
            else {
                let __productToBeAdded = require(path.join(__dirname, '..//..//..//data//defaultValues//visitInvoiceItems.json'));
                
                this.products = __productToBeAdded.products;
            }
        }
    }

    // Loop products to form request to add products 
    export function submitProductToVisit(productFileName?: string, productCollection?: any) {
        let response1 = [];
        let rootObject: RootObject;
        let options = require(path.join(__dirname, '..//..//..//data//apiTemplates//putVisitInvoiceItems.json'));
        rootObject = new RootObject();
        // if (productFileName == null) { rootObject = new RootObject(); }
        // else { rootObject = new RootObject(productFileName); }

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

