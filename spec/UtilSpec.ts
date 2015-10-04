/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../src/Util.ts" />
/// <reference path="../src/Bank.ts" />

describe("Util helper function", () => {
	let util : Util;
	beforeEach(() => {
		let documentMock = jasmine.createSpyObj('document', ["createElement", "getElementsByTagName"]);
		util = new Util(documentMock)
	});
	
	it("validates token object before sending it for get token", () => {
		let token: Token = {
			card_number: "4005550000000001",
			card_cvv: "101",
			card_exp_month: "05",
			card_exp_year: "2017",
			client_key: "",
			secure_callback: "Veritrans.c",
			gross_amount: 10000,
			callback: "Veritrans.c",
			two_click : ""
		};
		
		function getToken() {
			return token;
		}
		
		let actual = util.validateToken(getToken, "e668b029-db9d-46fd-b863-e9056f404204", true);
		expect(actual).toEqual(actual);
	});

	it("processJsonP", () => {
		// later
	});

	it("Process token request object into query param string", () => {
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

		let expectedQueryParams = "?card_number=4005550000000001&card_cvv=101&card_exp_month=05&card_exp_year=2017&client_key=e668b029-db9d-46fd-b863-e9056f404204&secure_callback=Veritrans.c&gross_amount=10000&callback=Veritrans.c";

		let actualQueryParams = util.toQueryParam(token);

		expect(actualQueryParams).toBe(expectedQueryParams);
	})
});