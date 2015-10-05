/// <reference path="Token.ts" />

interface Client {
	url : String;
	client_key : String;
	token (token : ()=>Token , CallbackEvent : any) : void;
	tokenCvv (token : ()=>Token, CallbackEvent : any) : void;
	
	generateForm(id: string, templateName: string, amount: number, secure: boolean,  callback: (tokenId: String) => void) : void;
}