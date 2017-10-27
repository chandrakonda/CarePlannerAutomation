import { ElementFinder, browser, by, element, ExpectedConditions } from 'protractor';
import {petDetails} from '../pages/cpPetDetails.po';

describe('angularjs homepage', () => {

  // it('should greet the named user', () => {
  //   browser.driver.sleep(10000);
  //   browser.get('http://www.angularjs.org');
  //   var  objname= element(by.model('yourName'));
  //   var ec = ExpectedConditions;
  //   browser.wait(ec.visibilityOf(objname),50000,"Wait for pet name");
  //   element(by.model('yourName')).sendKeys('Julie');
  //   const greeting = element(by.binding('yourName'));
  //   greeting.getText().then(function(text){
  //     console.log(text);
  //   });

  //   console.log("Hello")
  // });

    it('should greet the named user', () => {
    browser.get('http://www.angularjs.org');
    element(by.model('yourName')).sendKeys('Julie');
    const greeting = element(by.binding('yourName'));
    expect(greeting.getText()).toEqual('Hello Julie!');
  });

// it("validatepetdetails",function(){
//      console.log("Enter to validate pet details");
//       browser.get('https://hcorpqa-ns02.vcaantech.com/VCAChargeCapture?hospitalId=153&patientId=271842817&orderId=472962706&userName=chandrasekhar.konda&userId=0&accessToken=wc0VVYzxdvHCPH1RRrRLuB5XwZr40PXgRIu21qJxCG2qMuUMDoG_qIrG9leOMHVGy8mur5bo4TLJR576RJ78ALwunMlIAdkfV6F3p8-tsDlGZFu52vz-JgeCBNMI0XdVuk3j_imGOmscuHlMtiBIip8PKf3aM4X6Yh78jMrT-V8Fdjn7iN57s07-do7dGV1qLeUkA7SpyRKvwsOxmhBiQsTXtILNHvXX4RMq0kfWJXVw10tmClD0PHFyxLv695-7Y2q40Q'); // Entering application url in browser
//       browser.waitForAngularEnabled(true);
//       browser.driver.sleep(25000);
//       var ec = ExpectedConditions;
//       let objPetDetails = new petDetails();
//       browser.wait(ec.visibilityOf(objPetDetails.element_petName),50000,"Wait for pet name");
      
//       //browser.driver.wait
//       browser.driver.wait(ec.elementToBeClickable(objPetDetails.element_petName),50000 );
      
//       browser.ignoreSynchronization = false;
//       //browser.manage().timeouts().implicitlyWait(25000);
//       var varclientname = objPetDetails.getClientName();
//       var varpetname = objPetDetails.getPetName();
//       console.log(varclientname); 
//       console.log(varpetname); 
//       //var varpetname = objPetDetails.getClientName();
  
//     });

});


//  
