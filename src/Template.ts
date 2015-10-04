module template {
	
	function boilerPlate (css : string[], body : string, script : string[], url : String, clientKey : String, host : String) {
		let styles = css.map((value) => `<link rel="stylesheet" href="${value}">`).join("");
		let scripts = script.map((value) => `<script src="${value}"></script>`).join("");
		
		let html = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Veritrans Embedded Form</title>
			${styles}
		</head>
		<body>
			${body}
			${scripts}
			<script src="http://127.0.0.1:8080/Veritrans.js"></script>
			<script>
				Veritrans.url = "${url}";
				Veritrans.client_key = "${clientKey}";
				window.parent.postMessage("someKindOfTokenId", "http://${host}");
			</script>
		</body>
		</html>`;
		return html;
	}
	
	// kurang Veritrans.token(tokenForm, callBackEvent); // biar simple
	// simplify template generation
	
	export function simple(url : String, clientKey : String, host : String, amount : number) {
		let html = `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>Veritrans Embedded Form</title>
	<link rel="stylesheet" href="http://jondavidjohn.github.io/payform/stylesheets/styles.css">
	<link rel="stylesheet" href="http://jondavidjohn.github.io/payform/stylesheets/pygment_trac.css">
</head>

<body>
	<section>
		<div>
			<span class="field">
            <label for="ccnum">Card Number</label>
            <input placeholder="---- ---- ---- ----" type="tel" size="19" name="ccnum" value="" id="ccnum">
          </span>
			<div><small>type: <strong id="ccnum-type">invalid</strong></small></div>
		</div>

		<div>
			<span class="field">
            <label for="expiry">Expiration</label>
            <input placeholder="-- / --" size="7" type="tel" name="expiry" value="" id="expiry">
          </span>

			<span class="cvc field">
            <label for="cvc">CVC</label>
            <input placeholder="---" size="4" type="tel" name="cvc" value="" id="cvc">
          </span>
		</div>

		<div>
			<button id="submit">Pay ${amount}</button>
			<div id="result" class="emoji"></div>
		</div>
	</section>
	<script src="http://jondavidjohn.github.io/payform/javascripts/scale.fix.js"></script>
	<script src="http://jondavidjohn.github.io/payform/javascripts/payform.min.js"></script>
	<script src="http://jondavidjohn.github.io/payform/javascripts/form.js"></script>

	<script src="http://127.0.0.1:8080/Veritrans.js"></script>
	<script>
		Veritrans.url = "${url}";
		Veritrans.client_key = "${clientKey}";
		var card = function(){
			return {
			'card_number'     	: document.getElementById("ccnum").value.replace(/\s+/, "").trim(),
			'card_exp_month'  	: payform.parseCardExpiry(document.getElementById("expiry").value).month < 10 ? "0" + payform.parseCardExpiry(document.getElementById("expiry").value).month : 
			payform.parseCardExpiry(document.getElementById("expiry").value).month,
			'card_exp_year'   	: payform.parseCardExpiry(document.getElementById("expiry").value).year,
			'card_cvv'        	: document.getElementById("cvc").value.replace(/\s+/, "").trim(),
			'secure'       		: false,
			'gross_amount'   	: ${amount}
			}
		};
		
		document.getElementById("submit").addEventListener("click", function() {
			console.log(card());
			if (document.getElementById("result").classList.contains("valid")) {
				
				Veritrans.token(card, function(event){
					window.parent.postMessage(event.token_id, "http://${host}");
				});	
			}
		});
	</script>
</body>

</html>`;
		
		return html;
	}
	
	export function bootStrap(url : String, clientKey : String, host : String) {
		return  `${
		boilerPlate(
			["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"], 
			"formBody", 
			["http://code.jquery.com/jquery-2.1.4.min.js", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"],
			url, 
			clientKey,
			host
			)
		}`};
}