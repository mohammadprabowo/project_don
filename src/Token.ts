/// <reference path="Bank.ts" />

interface Token {
      card_number : String;
      card_exp_month : String;
      card_exp_year : String;
      card_cvv : String;
      secure : boolean;
      bank : Bank;
      gross_amount : number;  
      two_click? : String;
      callback : String;
      secure_callback : String;
      client_key : String;
}