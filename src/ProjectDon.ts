/// <reference path="Util.ts" />
/// <reference path="Client.ts" />
/// <reference path="Template.ts" />

// Add IE-specific interfaces to Window
// interface Window {
//     attachEvent(event: string, listener: any): boolean;
//     detachEvent(event: string, listener: any): void;
// }

class ProjectDon implements Client {
	url = "https://api.veritrans.co.id/v2/token";
	client_key = "";

	private util: Util;
	private window: Window

	constructor(util: Util, window: Window) {
		this.util = util;
		this.window = window;
		
		// ugh, add event listenernya ugly
	}

	token(token: () => Token, callbackEvent: any): void {
		let cleanToken = this.util.validateToken(token, this.client_key, false);
		let request = this.url + this.util.toQueryParam(cleanToken);
		
		// add event listener
		if (window.addEventListener) {
			window.addEventListener("message", (event) => {
				if (event.data) {
					callbackEvent(event.data);
				}
			}, false);
		} else {
			// for IE6 - IE10
			// window.attachEvent("onmessage", (event) => {
			// 	if (event.data) {
			// 		callbackEvent(event.data);
			// 	}
			// });
		}

		this.util.processJsonP(request);
	};

	tokenCvv(token: () => Token, callbackEvent: any): void {
		let cleanToken = this.util.validateToken(token, this.client_key, true);
		let request = this.url + this.util.toQueryParam(cleanToken);
		this.util.processJsonP(request);
		
		// add event listener
		if (window.addEventListener) {
			window.addEventListener("message", (event) => {
				if (event.data) {
					callbackEvent(event.data);
				}
			}, false);
		} else {
			// for IE6 - IE10
			// window.attachEvent("onmessage", (event) => {
			// 	if (event.data) {
			// 		callbackEvent(event.data);
			// 	}
			// });
		}

		this.util.processJsonP(request);
	};

	generateForm(id: string, templateName: string): void {
		let document = window.document;
		let iframe = document.createElement('iframe');
		let templateObj : any = template; // set client key first. pake class aja
		let html = templateObj[templateName];
		console.log(html); // ini aja udah undefined
		iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
		window.document.getElementById(id).appendChild(iframe);
		// console.log('iframe.contentWindow =', iframe.contentWindow);
	}
}

// add event listener
// receive message
// appendRedirectUrl (migs)