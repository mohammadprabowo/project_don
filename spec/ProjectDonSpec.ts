/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../src/ProjectDon.ts" />

describe ("Veritrans", function(){
	let Veritrans = ProjectDon;
	
	it("Veritrans.url should return default url", () => {
		expect(Veritrans.url).toBe("https://api.veritrans.co.id/v2/token");
	})
});