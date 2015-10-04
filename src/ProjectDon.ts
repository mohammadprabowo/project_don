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
	
	// nyambung, get, set sampai ke templatenya
	// refference ke this aja?

	private util: Util;
	private window: Window;
	private callback: any;	

	constructor(util: Util, window: Window) {
		this.util = util;
		this.window = window;
	}
	
	prefix(event : any){
		this.callback(event);
	}
	
	token(token: () => Token, callbackEvent: any): void {
		let cleanToken = this.util.validateToken(token, this.client_key, false);
		let request = this.url + this.util.toQueryParam(cleanToken);
		this.callback = callbackEvent;
		
		// add event listener
		if (window.addEventListener) {
			window.addEventListener("message", (event) => {
				if (event.data) {
					callbackEvent(event.data);
				}
			});
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

	// callbackMerchant diatas
	generateForm(id: string, templateName: string, amount: number, callback: (tokenId: String) => void): void {
		let document = window.document;
		let iframe : HTMLIFrameElement = document.createElement('iframe');
		let templateObj: any = template;
		let host = window.location.host;
		let html = templateObj[templateName](this.url, this.client_key, host, amount);
		window.document.getElementById(id).appendChild(iframe);
		
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(html);
		iframe.contentWindow.document.close();
		
		window.addEventListener("message", (event : MessageEvent) => {
			console.log(event);
			if (event.data) {
				let tokenId = new String(event.data);
				callback(tokenId.length !== 0 ? tokenId : "");
			}
		});
	}
}

// appendRedirectUrl (migs)