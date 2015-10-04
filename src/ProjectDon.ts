/// <reference path="Client.ts" />
/// <reference path="Util.ts" />

module ProjectDon {
	export let url = "https://api.veritrans.co.id/v2/token";
	export let client_key = "";
	
	export function token(token: () => Token, callbackEvent: any): void {
		let cleanToken = Util.validateToken(token, client_key, false);
		let request = url + Util.toQueryParam(cleanToken);
		Util.processJsonP(request);
	};

	export function tokenCvv(token: () => Token, callbackEvent: any): void {
		let cleanToken = Util.validateToken(token, client_key, true);
		let request = url + Util.toQueryParam(cleanToken);
		Util.processJsonP(request);
	};

	export function generateForm(): void { }
}

let Veritrans: Client = ProjectDon;

// add event listener
// receive message
// appendRedirectUrl (migs)