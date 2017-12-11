import { browser, element, by, ExpectedConditions, protractor } from 'protractor';
import { CarePlannerPetDetails } from '../pages/carePlanner/cpPetdetails.page';
import { CarePlannerApiCalls } from '../lib/apiServices/carePlannerApiCalls';

var sql = require('mssql');
let cpSchedulerPage, cpPetDetailsPage;

describe('Verify the Patient Header has accurate Patient and Visit information', () => {
  //  var flow = protractor.promise.controlFlow();
    beforeAll(() => {
        cpPetDetailsPage = new CarePlannerPetDetails();

        });        



 // end BeforeAll

    it('Data set up and client pet details' , async () => {
        let __apiCalls = new CarePlannerApiCalls();
        await __apiCalls.CreateClientPetAddProduct();

    });

    /// Test cases 
    it('Should have the title as VCA Charge Capture', () => {    
        browser.logger.info("***********Verifying Page Title***********");
        expect(cpPetDetailsPage.pageTitle).toEqual('VCA Charge Capture'); 
    });

    it('Should have the Pet Name as Lilly ', async () =>{
        await expect(cpPetDetailsPage.petName).toEqual('Lilly');
    });
    
    it('Should have the Client Name as Chandra ', async () => {
        await expect(cpPetDetailsPage.clientName).toEqual('Chandra');
    });
    
    it('Should have the Species Name as Canine ', async () => {
        await expect(cpPetDetailsPage.speciesName).toEqual('Canine');
    });   

    it('New client should exist in db', async() => {
        console.log('-----  Starting db test...  -------');
        var config = {
            user: 'ha',
            password: 'D3nnyW@$here',
            server: 'hcorpqa-db02',
            database: 'SparkyHosp153_QA'
        };
        console.log('server: ',config.server);

        var conn = new sql.ConnectionPool(config);
        var request = new sql.Request(conn);

        var fname='Matt';
        var lname='Flanzer';
        var records;

        conn.connect(function(err){
            if (err){
                console.log(err);
            }
            request.query("SELECT TOP 1 * FROM dbo.Client ORDER BY 1 ASC", function(err, rs){
                if (err) {console.log(err);}
                else {
                    console.log('rs: ',rs);
                    records = rs;
                }
                conn.close();
            });
        });

        console.log('records: ',records);
        // expect(records.FirstName).toEqual(fname);

    });

});    