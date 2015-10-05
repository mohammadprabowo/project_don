		// set client_key and demo_key
		function merchant1Callback (response) {
			console.log('response 1');
			console.log(response);
			document.getElementById("tokenIdAfterCheckout1").innerHTML = response.token_id;
		}
		
		function merchant2Callback (response) {
			console.log('response 2');
			console.log(response);
			document.getElementById("tokenIdAfterCheckout2").innerHTML = response.token_id;
		}
		
		function merchant3Callback (response) {
			console.log('response 3');
			console.log(response);
			document.getElementById("tokenIdAfterCheckout3").innerHTML = response.token_id;
		}
		
		Veritrans.url = "https://api.sandbox.veritrans.co.id/v2/token";
		Veritrans.client_key = "VT-client-9OlmgSTS1sYOQNms";