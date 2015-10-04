/// <reference path="Client.ts" />

module Don {
	export let url = "https://api.veritrans.co.id/v2/token";
	export let client_key = "";

	// should return promise later
	function validateToken(token: () => Token, isTwoClick: boolean): Token {
		// add validation here if needed, before send to url endpoint
        let vtRequest = token();

        if (isTwoClick) {
            vtRequest.two_click = 'true';
        } else {
            vtRequest.secure_callback = 'Veritrans.c';
        }

        vtRequest.callback = 'Veritrans.c';
        vtRequest.client_key = client_key;

		return vtRequest;
	};

	function processJsonP(url: String): void {
		let s = document.createElement('script');
        s.src = String(url);
        document.getElementsByTagName('head')[0].appendChild(s);
	}

	function toQueryParam(token : Token) {
		let tokenObject : any;
		tokenObject = token;
		
        let encode = encodeURIComponent;
		let keys = Object.keys(token);
		
		let queryString = '?' + keys.filter( (value) => tokenObject.hasOwnProperty(value))
			.map( value => encode(value) + '=' + encode(tokenObject[value]) + '&')
			.reduce( (prev, curr) => prev.concat(curr) , "" );
		
        return queryString;
    }

	export function token(token: () => Token, callbackEvent: any): void {
		let cleanToken = validateToken(token, false);
		let request = url + toQueryParam(cleanToken);
		processJsonP(request);
	};

	export function tokenCvv(token: () => Token, callbackEvent: any): void {
		let cleanToken = validateToken(token, true);
		let request = url + toQueryParam(cleanToken);
		processJsonP(request);
	};

	export function generateForm(): void { }
}

let Veritrans: Client = Don;

// add event listener
// receive message
// appendRedirectUrl (migs)