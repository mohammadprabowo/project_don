/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../src/ProjectDon.ts" />

describe ("Veritrans", function(){
	let Veritrans : Client;
	beforeEach(() => Veritrans = ProjectDon);
	
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
});