// Get pet details from care planner page

import {browser, element, by} from 'protractor';

export class petDetails {

 // Read details from the care planner application 

  element_petName = element(by.xpath(".//div[@class='petname']"));
  element_clientName = element(by.xpath(".//div[@class='petname']/following-sibling::span"));
  element_species = element(by.xpath(".//div[@class='species']"));

// Methods that can be done on the page

   getPetName(){
    let _varpetname : string ;
    this.element_petName.getText().then(function(_varpetname) {
      return _varpetname;
      });
   }
   getClientName(){
     let _clientname : string ; 
     this.element_clientName.getText().then(function(_clientname){
      return _clientname;
    });

   }
   getSpecies(){
    return this.element_species.getText();
   }


}
