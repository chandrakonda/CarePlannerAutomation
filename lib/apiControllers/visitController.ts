import { browser, protractor } from 'protractor';
import { CarePlannerApiServices } from '../apiServices/carePlannerApiServices';

export class VisitController{

    

    getVisitResources(){
        console.log('\n*********** Getting User details ***********');
        var options = {
            method: 'GET',
            url: '',
            headers:
            {
                'cache-control': 'no-cache',
                applicationname: 'Retriever',
                username: 'vcaantech\\tablet_nonprod',
                'x-hospital-id': '153',
                authorization: '',
                accept: 'application/json, text/json'
            }
        };

        //Set URL
        options.url = browser.appenvdetails.wwapiendpoint + 'VisitResources';

        //Set header values
        options.headers['x-hospital-id'] = browser.appenvdetails.hospitalid;
        options.headers.authorization = browser.bearerToken;

        var api = new CarePlannerApiServices();
        return api.postRequest(options);


    }
}