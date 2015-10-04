/// <reference path="Token.ts" />

class Util {
	static validateToken(token: () => Token, clientKey: String, isTwoClick: boolean) {
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

	static processJsonP(url: String) {
		let s = document.createElement('script');
        s.src = String(url);
        document.getElementsByTagName('head')[0].appendChild(s);
	};

	static toQueryParam(token: Token) {
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