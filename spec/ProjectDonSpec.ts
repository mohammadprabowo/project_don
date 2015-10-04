/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../src/ProjectDon.ts" />

describe ("Veritrans", function(){
	let Veritrans : Client;
	let utilMock;
	beforeEach(() => {
		utilMock = jasmine.createSpyObj('util', ["processJsonP", "validateToken", "toQueryParam"]);
		Veritrans = new ProjectDon(utilMock);
	});
	
	it("Veritrans.url should be variables", () => {
		expect(Veritrans.url).toBe("https://api.veritrans.co.id/v2/token");
		Veritrans.url = "https://sandbox.veritrans.co.id/v2/token";
		expect(Veritrans.url).toBe("https://sandbox.veritrans.co.id/v2/token");
	});
	
	it("Veritrans.client should be variables", () => {
		expect(Veritrans.client_key).toBe("");
		Veritrans.client_key = "e668b029-db9d-46fd-b863-e9056f404204";
		expect(Veritrans.client_key).toBe("e668b029-db9d-46fd-b863-e9056f404204");
	});
	
	it("Should send token to request as JSONP filtered with Util", () => {
		let token: Token = {
			card_number: "4005550000000001",
			card_cvv: "101",
			card_exp_month: "05",
			card_exp_year: "2017",
			client_key: "e668b029-db9d-46fd-b863-e9056f404204",
			secure_callback: "Veritrans.c",
			gross_amount: 10000,
			callback: "Veritrans.c",
		};
		
		function getToken() {
			return token;
		}
		
		Veritrans.token(getToken, {});
		expect(utilMock.validateToken).toHaveBeenCalledWith(getToken, Veritrans.client_key, false);
		expect(utilMock.toQueryParam).toHaveBeenCalled();
		expect(utilMock.processJsonP).toHaveBeenCalled();
	});
	
	it("Should send token to request as JSONP filtered with Util", () => {
		let token: Token = {
			card_number: "4005550000000001",
			card_cvv: "101",
			card_exp_month: "05",
			card_exp_year: "2017",
			client_key: "e668b029-db9d-46fd-b863-e9056f404204",
			secure_callback: "Veritrans.c",
			gross_amount: 10000,
			callback: "Veritrans.c",
		};
		
		function getToken() {
			return token;
		}
		
		Veritrans.tokenCvv(getToken, {});
		expect(utilMock.validateToken).toHaveBeenCalledWith(getToken, Veritrans.client_key, true);
		expect(utilMock.toQueryParam).toHaveBeenCalled();
		expect(utilMock.processJsonP).toHaveBeenCalled();
	}); 
});