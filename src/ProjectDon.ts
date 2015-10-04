/// <reference path="Client.ts" />
/// <reference path="Util.ts" />

class ProjectDon {
	url = "https://api.veritrans.co.id/v2/token";
	client_key = "";
	
	private util : Util;
	
	constructor(util : Util) {
		this.util = util;
	}
	
	token(token: () => Token, callbackEvent: any): void {
		let cleanToken = this.util.validateToken(token, this.client_key, false);
		let request = this.url + this.util.toQueryParam(cleanToken);
		this.util.processJsonP(request);
	};

	tokenCvv(token: () => Token, callbackEvent: any): void {
		let cleanToken = this.util.validateToken(token, this.client_key, true);
		let request = this.url + this.util.toQueryParam(cleanToken);
		this.util.processJsonP(request);
	};

	generateForm(): void { }
}

// add event listener
// receive message
// appendRedirectUrl (migs)


// error in jasmine....
// let Veritrans: Client = new ProjectDon(new Util(document));