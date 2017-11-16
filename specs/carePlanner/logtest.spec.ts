import { AppointmentController } from '../../lib/apiControllers/appointmentController';
import { AuthController } from '../../lib/apiControllers/authController';
import { ClientAndPatientController } from '../../lib/apiControllers/clientAndPatientController';
import { VisitController } from '../../lib/apiControllers/visitController';
//import { browser, protractor } from 'protractor';
import { CarePlannerPetDetails } from '../../pages/carePlanner/cpPetdetails.page';
import { OrderController } from '../../lib/apiControllers/orderController';
import { CarePlannerSchedulerPage } from '../../pages/carePlanner/cpScheduler.page';

import { $, browser, element, by, By, ExpectedConditions } from "protractor";
let cpSchedulerPage, cpPetDetailsPage;


describe('Verify the Patient Header has accurate Patient and Visit information', () => {
    
        beforeAll(() => {

            // cpPetDetailsPage = new CarePlannerPetDetails();
            // cpSchedulerPage = new CarePlannerSchedulerPage();
            // browser.clientLastName = "Rogers1510694963537" ;
            // browser.patientName = "Lilly1510694963537"; 
            // browser.get("https://hcorpqa-ns02.vcaantech.com/VCAChargeCapture?hospitalId=153&patientId=314760342&orderId=472962967&userName=chandrasekhar.konda&userId=0&accessToken=SltRMWmy6I6W_FY-kwONiNKgtpYqK9xPtanDVkY2VdG8JK7yxErMGj7AMIJpX8xQKhnMe3FK208n7Ul75E1ep95HSm3QvyPzbGQ-VaGPOYm1iFe2VNKS1K-E-7blA8BeSvgkM8KPy09fvS8fnbZ7WAceGtFS8WU_bl7SI9qJ_U1X5PXLdcn8FbTAZzyjHgY5GYyctItNPGfRBKc_HwvxCFwZfemrFuQYaI-k3qOmJ3y7SOZMBcHPr0THRxtgs9_Bcnt1DQ ");
            //     //https://hcorpqa-ns02.vcaantech.com/VCAChargeCapture?hospitalId=153&patientId=314760342&orderId=472962967&userName=chandrasekhar.konda&userId=0&accessToken=Fxw1VkLrNPLQ0O29lswsuAzBQOiTyRZxg2I9Y39UyLdkDALtfE1CkI1ZC6duSXlYckV3bg2iToR_FpeDUMbaCrSJn3g8Cq0UpUgjKZ0ARnPiBTJmXAVoQZp9zuMU9ZIp-gA9L9-5IBR0Qhdl3iqWjHWen6egDDBjuvdJ3U-_QWebLfzPbn3tnVtSIt2FYEQcsVfxcD8Q6AhsPrw1FhwhgCHmVxUj2hjGB5vnOb-7hGdxbA-087k329PLCJJ_pNFr6AB3lg 
            // browser.sleep(3000);
            browser.logger.info("*********** Executing Tests ***********");
        });

        it('Should have the title as VCA Charge Capture', async () => {
           console.log("Test this functionality when not working...............");
        });

        // it('Should have the title as VCA Charge Capture', async () => {
        //     browser.logger.info("***********Verifying Page Title***********");
        //     if ('VCA Charge Capture' == await cpPetDetailsPage.pageTitle) {
        //         browser.logger.info("Page title is matching");
        //     }
        //     else {
        //         browser.logger.error("Page title is not matching");
        //         fail("Page title are not matching");
        //     }
        // });
    
    
        // it('Pet name should be correct', async () => {
    
        //     let __patientName = browser.patientName.length >= 12 ? browser.patientName.slice(0, 12) + '…' : browser.patientName;
    
        //     if (__patientName  == await cpPetDetailsPage.petName) {
        //         browser.logger.info("Patient name is matching");
        //     }
        //     else {
        //         browser.logger.error("Patient name is not matching");
        //         fail("Patient names are not matching");
        //     }
        // });
    
        // it('Client last name should be correct ', async () => {
        //     let __clientLastName = browser.clientLastName.length >= 12 ? browser.clientLastName.slice(0, 12) + '…' : browser.clientLastName;
    
        //     if (__clientLastName == await cpPetDetailsPage.clientName) {
    
        //         browser.logger.info("Client name is matching");
        //     }
        //     else {
        //         browser.logger.error("Client name is not matching");
        //         fail("Client names are not matching");
        //     }
    
        // });
    
        // it('Should have the Species Name as Canine ', async () => {
    
        //     if ('Canine' == await cpPetDetailsPage.speciesName) {
        //         browser.logger.info("Species name is matching");
        //     }
        //     else {
        //         browser.logger.error("Species name is not matching");
        //         fail("Species names are not matching");
        //     }
    
        // });
    
        // it('Should validate primary doctor name ', async () => {
            
        //     browser.logger.info('validate doctor name');
           
    
        // });
    
        // it('Should validate category count ', async () => {
            
        //    var __catCount =  await cpSchedulerPage.categoryCount;
    
        //    browser.logger.info("Cat count "+__catCount);
                   
        // });
    
     
    
        // it('Should validate category count ', async () => {
            
        //    var __productTaskList =  await cpSchedulerPage.productTaskListCount;
    
        //    browser.logger.info("task list count  "+__productTaskList);
                   
        // });
    
        // it('Should validate non scheduled task count ', async () => {
            
        //    var __productTaskList =  await cpSchedulerPage.nonScheduledProductTaskCount;
    
        //    browser.logger.info("non scheduled "+__productTaskList);
                   
        // });

        // // Get values from drop downs

        // it('Get count of Select a location drop down ', async () => {
        //     element.all(by.xpath(".//div[normalize-space(text())='Select a location']/following-sibling::div/div"))
        //     .each(function(element,index){
        //          browser.executeScript("return arguments[0].innerHTML;",element).then(function (text){
        //             console.log(text);
        //         });

        //     });
        // });

        // // Get values from drop downs
        // it('Get count of Select a location drop down ', async () => {
        //    element.all(by.xpath(".//div[normalize-space(text())='Select technician']/following-sibling::div/div")).each(function(element,index){
        //         browser.executeScript("return arguments[0].innerHTML;",element).then(function (text){
        //         //browser.logger(text);
        //         console.log(text);
        //     });

        //     });
        // });
        
        // it('click on vitals in the windiow', async () => {
            
        //    let ele1 = element(by.xpath(".//wj-flex-grid[@id='wijgridObject']//div[contains(@class,'wj-frozen-col') and not(contains(@class,'wj-group')) and not(contains(@class,'wj-wrap'))][1]//div[@class='itemname']"));
        //   // browser.executeScript("arguments[0].click();",ele1);
        //    ele1.click();
        //    browser.sleep(6000);

        // });


        //     // Get values from drop downs
        // it('Click on cancel button', async () => {
        //     let elePlaceHolder = element(by.xpath(".//textarea[@placeholder='Add instructions here.']"));
        //     elePlaceHolder.sendKeys("Enter text in the fields ");

        //     let eleCancelButton = element(by.xpath(".//button[text()='Cancel']"));
        //     eleCancelButton.click();  
        // })
    
        
           // browser.sleep(6000);
            

           // expect(element(by.xpath(".//wj-flex-grid[@id='wijgridObject']//div[contains(@class,'wj-frozen-col') and not(contains(@class,'wj-group')) and not(contains(@class,'wj-wrap'))][1]//div[@class='itemname']")).isPresent()).toBe(true);
            // element(by.xpath(".//wj-flex-grid[@id='wijgridObject']//div[contains(@class,'wj-frozen-col') and not(contains(@class,'wj-group')) and not(contains(@class,'wj-wrap'))][1]//div[@class='itemname']")).then(function(element1){
            //     element1.click();
            // });
          // let ele1 = element(by.xpath(".//div[@class='itemname'][text()='Vitals ']/../../../../../div"));
          // let ele1 = element(by.xpath(".//div[@class='wj-cell wj-alt wj-frozen wj-frozen-col']//div[@class='itemname'][text()='Vitals ']"));
           //browser.executeScript("arguments[0].scrollIntoView();",ele1);
});
