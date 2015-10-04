		// set client_key and demo_key
		function merchantCallback (tokenId) {
			console.log(tokenId);
			document.getElementById("tokenIdAfterCheckout").innerHTML = tokenId;
		}
		
		Veritrans.url = "https://api.sandbox.veritrans.co.id/v2/token";
		Veritrans.client_key = "VT-client-9OlmgSTS1sYOQNms";