/// <reference path="Token.ts" />

class Util {
	private document : Document;
	
	constructor(document : Document){
		this.document = document;
	}
	
	validateToken(token: () => Token, clientKey: String, isTwoClick: boolean) {
		// add validation here if needed, before send to url endpoint
		let vtRequest = token();

		if (isTwoClick) {
			vtRequest.two_click = 'true';
		} else {
			vtRequest.secure_callback = 'Veritrans.c';
		}

		vtRequest.callback = 'Veritrans.c';
		vtRequest.client_key = clientKey;

		return vtRequest;
	};

	processJsonP(url: String) {
		let s = this.document.createElement('script');
        s.src = String(url);
        this.document.getElementsByTagName('head')[0].appendChild(s);
	};

	toQueryParam(token: Token) {
		let tokenObject: any;
		tokenObject = token;

        let encode = encodeURIComponent;
		let keys = Object.keys(token);

		let queryString = '?' + keys.filter((value) => tokenObject.hasOwnProperty(value))
			.map(value => encode(value) + '=' + encode(tokenObject[value]))
			.join('&');

        return queryString;
    }
}