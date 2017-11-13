
import { browser } from 'protractor';
import { CarePlannerApiServices } from '../../lib/apiServices/carePlannerApiServices';
export namespace AddingProducts {
    const path = require('path');
    // Products data model 
    let __poroductToBeAddedJson = require(path.join(__dirname, '..//..//..//data//jsonObjects//productsToAdd.json'));

    interface ProductCollection {
        InvoiceItemId: number;
        InvoiceItemTypeId: number;
        PLNo: number;
        SeqNo: number;
        Code: string;
    }

    export class RootObject {

        products: ProductCollection[];

        constructor() {
            this.products = __poroductToBeAddedJson.products;
        }

    }

    // Loop products to form request to add products 
    export function submitProductToVisit(){
        let response = [];
        let options = require(path.join(__dirname, '..//..//..//data//jsonObjects//addOrderToVisit.json'));
        let rootObject = new RootObject();
        browser.visitId = "472962909";
        rootObject.products.forEach(product => {
            console.log("*************** Adding Product to Order **************");
            //Set URL
            options.url = browser.appenvdetails.wwapiendpoint + "Visits/" + browser.visitId + "/VisitInvoiceItems";
            //Set header values
            options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
            options.headers.authorization = "bearer 2MKMq-DMGOIQKJJZuidrg6gvz17SrFWA1yW53jXVlRPNsKbBcoc69U84ZZ415UuFGWlHUDPcz7p2tXcdeqkX3UCwaQjcsy2y_mKz993iJnCHNPfi28duECoV3YCNaqwaj9g1VEgYKewBJMPCRhWoU9cZTyjqb9S-LY3z0lFfQa083p5twZpCy0vF4nQopudpqGVvYzntoe6iQAq-QSxuPAgBGKljbGPZ3TCy_iZnYK5d8mxttQSLfVv3rzq8iIWGoHBksw";
            options.form = product
            console.log(options);
             let apiServices = new CarePlannerApiServices();
            response.concat(apiServices.putRequest(options));
        });

        return response;
    }
    // foreach product, we need to have form request and send

}

