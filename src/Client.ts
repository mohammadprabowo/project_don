/// <reference path="Token.ts" />

interface Client {
	url : String;
	client_key : String;
	token (token : ()=>Token , CallbackEvent : any) : void;
	tokenCvv (token : ()=>Token, CallbackEvent : any) : void;
	
	generateForm() : void;
}