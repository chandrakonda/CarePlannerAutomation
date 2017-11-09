


import {SetClient} from '../data/wwapirequestfiles/create_client_model - Copy';

var path = require('path');

describe('Verify the Careplanner Scheduler Page', () => {
    
    // UI TEST CASES   ????????////////////////////////////
    
      it('Should have the title as VCA Charge Capture', () => {    
        console.log("***********Verifying Page Title***********");
      let appenvdetails: SetClient.RootObject =  require(path.join(__dirname, '..//..//data//wwapirequestfiles//create_client_body.json'));
      //let appenvdetails: SetClient.RootObject =  JSON.parse(path.join(__dirname, '..//..//data//wwapirequestfiles//create_client_body.json'));
        
       var val = JSON.stringify(appenvdetails);
       
      });

    });