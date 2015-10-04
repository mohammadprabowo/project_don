module template {

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

	export function semantic(url : String, clientKey : String, host : String, amount : number) {
		let html = `
		<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.4/semantic.min.css">
    <title>New Document</title>
</head>

<body>

    <div class="container">


            <form id="credit-card-form" name="creditcardform" class="ui form">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div id="error-message" class="ui error message"></div>
                    <div class="form-group">
                        <label>Credit Card Number</label>
                        <div class="ui fluid icon input">
                            <input id="card-number" name="cardnumber" class="form-control" type="text" placeholder="XXXX XXXX XXXX XXXX" />
                            <i id="credit-card-logo" class="payment icon"></i>
                        </div>
                    </div>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <div class="form-group">
                        <label>Exp. Date</label>
                        <input id="exp-date" name="expdate" class="form-control" type="text" placeholder="MM / YY" />
                    </div>
                </div>
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    <div class="form-group">
                        <label>CVV</label>
                        <input id="cvv" name="cvv" class="form-control" type="text" placeholder="***" />
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <input type="submit" class="ui primary button fluid" value="Confirm Payment ${amount}" />
                    </div>
                </div>
            </form>

    </div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="http://127.0.0.1:8080/lib/js/jquery.formatter.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.4/semantic.min.js"></script>

<script src="http://127.0.0.1:8080/Veritrans.js"></script>


<script type="text/javascript">
    $(document).ready(function() {

        function isCardNumberValid (cardnumber) {
            var len = cardnumber.length;
            var mul = 0;
            var prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]];
            var sum = 0;

            while (len--) {
                sum += prodArr[mul][parseInt(cardnumber.charAt(len), 10)];
                mul ^= 1;
            }

            if (sum % 10 === 0 && sum > 0) {
                return true;
            } else {
                return false;
            }
        }

        function isExpDateValid (expdate) {
            var date = expdate.split(" ");
            date[1] = date[2];
            var currentDate = new Date();
            if (expdate.length == 6) {
              //Format date mm/yy
              var str = '20';
              date[1] = parseInt(str + date[1]);
            }

            if (currentDate.getFullYear() == date[1]){
              if (date[0] >= currentDate.getMonth() && date[0] <= 12){
                return true;
              }
              else {
                return false;
              }
            }
            else if (date[1] > currentDate.getFullYear()){
              if (date[0] >= 1 && date[0] <= 12){
                return true;
              }
              else{
                return false;
              }
            }
            else{
              return false;
            }
        }

        function isCvvValid (cvv) {
            if (isNaN(parseInt(cvv))){
                return false;
            } else {
                return true;
            }
        }

        $('#card-number').formatter({
            'pattern': '{{9999}} {{9999}} {{9999}} {{9999}}'
        });

        $('#exp-date').formatter({
            'pattern': '{{99}} / {{99}}'
        });

        $('#credit-card-form').submit(function(event){
            event.preventDefault();
            var card_number = document.getElementById('card-number').value.replace(/\\s/g, "");
            var card_exp_date = document.getElementById('exp-date').value.replace(/[/]/g, '');
						var card_exp_month = document.getElementById('exp-date').value.substr(0,2);
            var card_exp_year = document.getElementById('exp-date').value.substr(5,2);
            var card_cvv = document.getElementById('cvv').value;
            var error_messages = "";
            if (!isCardNumberValid(card_number)){
                error_messages += "<li>Card Number is Invalid</li>";
            }
            if (!isCvvValid(card_cvv)){
                error_messages += "<li>CVV is Invalid</li>";
            }
            if (!isExpDateValid(card_exp_date)){
                error_messages += "<li>Exp Date is Invalid</li>";
            }
            $('#error-message').empty().append(error_messages);
            if (error_messages != ""){
                event.preventDefault();
                $('#error-message').show();

                return false;
            } else {
                event.preventDefault();
                var card = function() {
                    return {
                        'card_number' : card_number,
                        'card_exp_date' : card_exp_date,
                        'card_exp_month' : card_exp_month,
                        'card_exp_year' : card_exp_year,
                        'card_cvv' : card_cvv,
                        'gross_amount' : ${amount}
                    }
                }

                Veritrans.url = "${url}";
		        Veritrans.client_key = "${clientKey}";

                Veritrans.token(card, function(event){
					window.parent.postMessage(event.token_id, "http://${host}");
				});

                return true;
            }
        });
    });

</script>
</body>
</html>`;

		return html;
	}

    export function cardio(url : String, clientKey : String, host : String, amount : number) {
        let html = `
        <!DOCTYPE html>
<html lang="en">

<head>
	<title>Card — make your credit card better in one line of code</title>
	<meta name="viewport" content="width=device-width, user-scalable=no">
	<link rel="shortcut icon" href="src/favicon.ico">
	<link rel="stylesheet" href="http://jessepollak.github.io/card/build/css/demo.css">
	<style type="text/css">
		.jp-card.jp-card-safari.jp-card-identified .jp-card-front:before,
		.jp-card.jp-card-safari.jp-card-identified .jp-card-back:before {
			background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);
			background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);
		}

		.jp-card.jp-card-ie-10.jp-card-flipped,
		.jp-card.jp-card-ie-11.jp-card-flipped {
			-webkit-transform: 0deg;
			-moz-transform: 0deg;
			-ms-transform: 0deg;
			-o-transform: 0deg;
			transform: 0deg;
		}

		.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-front,
		.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-front {
			-webkit-transform: rotateY(0deg);
			-moz-transform: rotateY(0deg);
			-ms-transform: rotateY(0deg);
			-o-transform: rotateY(0deg);
			transform: rotateY(0deg);
		}

		.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back,
		.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back {
			-webkit-transform: rotateY(0deg);
			-moz-transform: rotateY(0deg);
			-ms-transform: rotateY(0deg);
			-o-transform: rotateY(0deg);
			transform: rotateY(0deg);
		}

		.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back:after,
		.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back:after {
			left: 18%;
		}

		.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-cvc,
		.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-cvc {
			-webkit-transform: rotateY(180deg);
			-moz-transform: rotateY(180deg);
			-ms-transform: rotateY(180deg);
			-o-transform: rotateY(180deg);
			transform: rotateY(180deg);
			left: 5%;
		}

		.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-shiny,
		.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-shiny {
			left: 84%;
		}

		.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-shiny:after,
		.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-shiny:after {
			left: -480%;
			-webkit-transform: rotateY(180deg);
			-moz-transform: rotateY(180deg);
			-ms-transform: rotateY(180deg);
			-o-transform: rotateY(180deg);
			transform: rotateY(180deg);
		}

		.jp-card.jp-card-ie-10.jp-card-amex .jp-card-back,
		.jp-card.jp-card-ie-11.jp-card-amex .jp-card-back {
			display: none;
		}

		.jp-card-logo {
			height: 36px;
			width: 60px;
			font-style: italic;
		}

		.jp-card-logo,
		.jp-card-logo:before,
		.jp-card-logo:after {
			box-sizing: border-box;
		}

		.jp-card-logo.jp-card-amex {
			text-transform: uppercase;
			font-size: 4px;
			font-weight: bold;
			color: white;
			background-image: repeating-radial-gradient(circle at center, #FFF 1px, #999 2px);
			background-image: repeating-radial-gradient(circle at center, #FFF 1px, #999 2px);
			border: 1px solid #EEE;
		}

		.jp-card-logo.jp-card-amex:before,
		.jp-card-logo.jp-card-amex:after {
			width: 28px;
			display: block;
			position: absolute;
			left: 16px;
		}

		.jp-card-logo.jp-card-amex:before {
			height: 28px;
			content: "american";
			top: 3px;
			text-align: left;
			padding-left: 2px;
			padding-top: 11px;
			background: #267AC3;
		}

		.jp-card-logo.jp-card-amex:after {
			content: "express";
			bottom: 11px;
			text-align: right;
			padding-right: 2px;
		}

		.jp-card.jp-card-amex.jp-card-flipped {
			-webkit-transform: none;
			-moz-transform: none;
			-ms-transform: none;
			-o-transform: none;
			transform: none;
		}

		.jp-card.jp-card-amex.jp-card-identified .jp-card-front:before,
		.jp-card.jp-card-amex.jp-card-identified .jp-card-back:before {
			background-color: #108168;
		}

		.jp-card.jp-card-amex.jp-card-identified .jp-card-front .jp-card-logo.jp-card-amex {
			opacity: 1;
		}

		.jp-card.jp-card-amex.jp-card-identified .jp-card-front .jp-card-cvc {
			visibility: visible;
		}

		.jp-card.jp-card-amex.jp-card-identified .jp-card-front:after {
			opacity: 1;
		}

		.jp-card-logo.jp-card-discover {
			background: #FF6600;
			color: #111;
			text-transform: uppercase;
			font-style: normal;
			font-weight: bold;
			font-size: 10px;
			text-align: center;
			overflow: hidden;
			z-index: 1;
			padding-top: 9px;
			letter-spacing: .03em;
			border: 1px solid #EEE;
		}

		.jp-card-logo.jp-card-discover:before,
		.jp-card-logo.jp-card-discover:after {
			content: " ";
			display: block;
			position: absolute;
		}

		.jp-card-logo.jp-card-discover:before {
			background: white;
			width: 200px;
			height: 200px;
			border-radius: 200px;
			bottom: -5%;
			right: -80%;
			z-index: -1;
		}

		.jp-card-logo.jp-card-discover:after {
			width: 8px;
			height: 8px;
			border-radius: 4px;
			top: 10px;
			left: 27px;
			background-color: #FF6600;
			background-image: -webkit-radial-gradient(#FF6600, #fff, , , , , , , , );
			background-image: radial-gradient( #FF6600, #fff, , , , , , , , );
			content: "network";
			font-size: 4px;
			line-height: 24px;
			text-indent: -7px;
		}

		.jp-card .jp-card-front .jp-card-logo.jp-card-discover {
			right: 12%;
			top: 18%;
		}

		.jp-card.jp-card-discover.jp-card-identified .jp-card-front:before,
		.jp-card.jp-card-discover.jp-card-identified .jp-card-back:before {
			background-color: #86B8CF;
		}

		.jp-card.jp-card-discover.jp-card-identified .jp-card-logo.jp-card-discover {
			opacity: 1;
		}

		.jp-card.jp-card-discover.jp-card-identified .jp-card-front:after {
			-webkit-transition: 400ms;
			-moz-transition: 400ms;
			transition: 400ms;
			content: " ";
			display: block;
			background-color: #FF6600;
			background-image: -webkit-linear-gradient(#FF6600, #ffa366, #FF6600);
			background-image: linear-gradient(#FF6600, #ffa366, #FF6600, , , , , , , );
			height: 50px;
			width: 50px;
			border-radius: 25px;
			position: absolute;
			left: 100%;
			top: 15%;
			margin-left: -25px;
			box-shadow: inset 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
		}

		.jp-card-logo.jp-card-visa {
			background: white;
			text-transform: uppercase;
			color: #1A1876;
			text-align: center;
			font-weight: bold;
			font-size: 15px;
			line-height: 18px;
		}

		.jp-card-logo.jp-card-visa:before,
		.jp-card-logo.jp-card-visa:after {
			content: " ";
			display: block;
			width: 100%;
			height: 25%;
		}

		.jp-card-logo.jp-card-visa:before {
			background: #1A1876;
		}

		.jp-card-logo.jp-card-visa:after {
			background: #E79800;
		}

		.jp-card.jp-card-visa.jp-card-identified .jp-card-front:before,
		.jp-card.jp-card-visa.jp-card-identified .jp-card-back:before {
			background-color: #191278;
		}

		.jp-card.jp-card-visa.jp-card-identified .jp-card-logo.jp-card-visa {
			opacity: 1;
		}

		.jp-card-logo.jp-card-mastercard {
			color: white;
			font-weight: bold;
			text-align: center;
			font-size: 9px;
			line-height: 36px;
			z-index: 1;
			text-shadow: 1px 1px rgba(0, 0, 0, 0.6);
		}

		.jp-card-logo.jp-card-mastercard:before,
		.jp-card-logo.jp-card-mastercard:after {
			content: " ";
			display: block;
			width: 36px;
			top: 0;
			position: absolute;
			height: 36px;
			border-radius: 18px;
		}

		.jp-card-logo.jp-card-mastercard:before {
			left: 0;
			background: #FF0000;
			z-index: -1;
		}

		.jp-card-logo.jp-card-mastercard:after {
			right: 0;
			background: #FFAB00;
			z-index: -2;
		}

		.jp-card.jp-card-mastercard.jp-card-identified .jp-card-front .jp-card-logo.jp-card-mastercard,
		.jp-card.jp-card-mastercard.jp-card-identified .jp-card-back .jp-card-logo.jp-card-mastercard {
			box-shadow: none;
		}

		.jp-card.jp-card-mastercard.jp-card-identified .jp-card-front:before,
		.jp-card.jp-card-mastercard.jp-card-identified .jp-card-back:before {
			background-color: #0061A8;
		}

		.jp-card.jp-card-mastercard.jp-card-identified .jp-card-logo.jp-card-mastercard {
			opacity: 1;
		}

		.jp-card-logo.jp-card-maestro {
			color: white;
			font-weight: bold;
			text-align: center;
			font-size: 14px;
			line-height: 36px;
			z-index: 1;
			text-shadow: 1px 1px rgba(0, 0, 0, 0.6);
		}

		.jp-card-logo.jp-card-maestro:before,
		.jp-card-logo.jp-card-maestro:after {
			content: " ";
			display: block;
			width: 36px;
			top: 0;
			position: absolute;
			height: 36px;
			border-radius: 18px;
		}

		.jp-card-logo.jp-card-maestro:before {
			left: 0;
			background: #0064CB;
			z-index: -1;
		}

		.jp-card-logo.jp-card-maestro:after {
			right: 0;
			background: #CC0000;
			z-index: -2;
		}

		.jp-card.jp-card-maestro.jp-card-identified .jp-card-front .jp-card-logo.jp-card-maestro,
		.jp-card.jp-card-maestro.jp-card-identified .jp-card-back .jp-card-logo.jp-card-maestro {
			box-shadow: none;
		}

		.jp-card.jp-card-maestro.jp-card-identified .jp-card-front:before,
		.jp-card.jp-card-maestro.jp-card-identified .jp-card-back:before {
			background-color: #0B2C5F;
		}

		.jp-card.jp-card-maestro.jp-card-identified .jp-card-logo.jp-card-maestro {
			opacity: 1;
		}

		.jp-card-logo.jp-card-dankort {
			width: 60px;
			height: 36px;
			padding: 3px;
			border-radius: 8px;
			border: #000000 1px solid;
			background-color: #FFFFFF;
		}

		.jp-card-logo.jp-card-dankort .dk {
			position: relative;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		.jp-card-logo.jp-card-dankort .dk:before {
			background-color: #ED1C24;
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			display: block;
			border-radius: 6px;
		}

		.jp-card-logo.jp-card-dankort .dk:after {
			content: '';
			position: absolute;
			top: 50%;
			margin-top: -7.7px;
			right: 0;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 7px 7px 10px 0;
			border-color: transparent #ED1C24 transparent transparent;
			z-index: 1;
		}

		.jp-card-logo.jp-card-dankort .d,
		.jp-card-logo.jp-card-dankort .k {
			position: absolute;
			top: 50%;
			width: 50%;
			display: block;
			height: 15.4px;
			margin-top: -7.7px;
			background: white;
		}

		.jp-card-logo.jp-card-dankort .d {
			left: 0;
			border-radius: 0 8px 10px 0;
		}

		.jp-card-logo.jp-card-dankort .d:before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			display: block;
			background: #ED1C24;
			border-radius: 2px 4px 6px 0px;
			height: 5px;
			width: 7px;
			margin: -3px 0 0 -4px;
		}

		.jp-card-logo.jp-card-dankort .k {
			right: 0;
		}

		.jp-card-logo.jp-card-dankort .k:before,
		.jp-card-logo.jp-card-dankort .k:after {
			content: '';
			position: absolute;
			right: 50%;
			width: 0;
			height: 0;
			border-style: solid;
			margin-right: -1px;
		}

		.jp-card-logo.jp-card-dankort .k:before {
			top: 0;
			border-width: 8px 5px 0 0;
			border-color: #ED1C24 transparent transparent transparent;
		}

		.jp-card-logo.jp-card-dankort .k:after {
			bottom: 0;
			border-width: 0 5px 8px 0;
			border-color: transparent transparent #ED1C24 transparent;
		}

		.jp-card.jp-card-dankort.jp-card-identified .jp-card-front:before,
		.jp-card.jp-card-dankort.jp-card-identified .jp-card-back:before {
			background-color: #0055C7;
		}

		.jp-card.jp-card-dankort.jp-card-identified .jp-card-logo.jp-card-dankort {
			opacity: 1;
		}

		.jp-card-container {
			-webkit-perspective: 1000px;
			-moz-perspective: 1000px;
			perspective: 1000px;
			width: 350px;
			max-width: 100%;
			height: 200px;
			margin: auto;
			z-index: 1;
			position: relative;
		}

		.jp-card {
			font-family: "Helvetica Neue";
			line-height: 1;
			position: relative;
			width: 100%;
			height: 100%;
			min-width: 315px;
			border-radius: 10px;
			-webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			-ms-transform-style: preserve-3d;
			-o-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transition: all 400ms linear;
			-moz-transition: all 400ms linear;
			transition: all 400ms linear;
		}

		.jp-card > *,
		.jp-card > *:before,
		.jp-card > *:after {
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			font-family: inherit;
		}

		.jp-card.jp-card-flipped {
			-webkit-transform: rotateY(180deg);
			-moz-transform: rotateY(180deg);
			-ms-transform: rotateY(180deg);
			-o-transform: rotateY(180deg);
			transform: rotateY(180deg);
		}

		.jp-card .jp-card-front,
		.jp-card .jp-card-back {
			-webkit-backface-visibility: hidden;
			backface-visibility: hidden;
			-webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			-ms-transform-style: preserve-3d;
			-o-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transition: all 400ms linear;
			-moz-transition: all 400ms linear;
			transition: all 400ms linear;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			overflow: hidden;
			border-radius: 10px;
			background: #DDD;
		}

		.jp-card .jp-card-front:before,
		.jp-card .jp-card-back:before {
			content: " ";
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			opacity: 0;
			border-radius: 10px;
			-webkit-transition: all 400ms ease;
			-moz-transition: all 400ms ease;
			transition: all 400ms ease;
		}

		.jp-card .jp-card-front:after,
		.jp-card .jp-card-back:after {
			content: " ";
			display: block;
		}

		.jp-card .jp-card-front .jp-card-display,
		.jp-card .jp-card-back .jp-card-display {
			color: white;
			font-weight: normal;
			opacity: 0.5;
			-webkit-transition: opacity 400ms linear;
			-moz-transition: opacity 400ms linear;
			transition: opacity 400ms linear;
		}

		.jp-card .jp-card-front .jp-card-display.jp-card-focused,
		.jp-card .jp-card-back .jp-card-display.jp-card-focused {
			opacity: 1;
			font-weight: 700;
		}

		.jp-card .jp-card-front .jp-card-cvc,
		.jp-card .jp-card-back .jp-card-cvc {
			font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;
			font-size: 14px;
		}

		.jp-card .jp-card-front .jp-card-shiny,
		.jp-card .jp-card-back .jp-card-shiny {
			width: 50px;
			height: 35px;
			border-radius: 5px;
			background: #CCC;
			position: relative;
		}

		.jp-card .jp-card-front .jp-card-shiny:before,
		.jp-card .jp-card-back .jp-card-shiny:before {
			content: " ";
			display: block;
			width: 70%;
			height: 60%;
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
			background: #d9d9d9;
			position: absolute;
			top: 20%;
		}

		.jp-card .jp-card-front .jp-card-logo {
			position: absolute;
			opacity: 0;
			right: 5%;
			top: 8%;
			-webkit-transition: 400ms;
			-moz-transition: 400ms;
			transition: 400ms;
		}

		.jp-card .jp-card-front .jp-card-lower {
			width: 80%;
			position: absolute;
			left: 10%;
			bottom: 30px;
		}

		@media only screen and (max-width: 480px) {
			.jp-card .jp-card-front .jp-card-lower {
				width: 90%;
				left: 5%;
			}
		}

		.jp-card .jp-card-front .jp-card-lower .jp-card-cvc {
			visibility: hidden;
			float: right;
			position: relative;
			bottom: 5px;
		}

		.jp-card .jp-card-front .jp-card-lower .jp-card-number {
			font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;
			font-size: 24px;
			clear: both;
			margin-bottom: 30px;
		}

		.jp-card .jp-card-front .jp-card-lower .jp-card-expiry {
			font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;
			letter-spacing: 0em;
			position: relative;
			float: right;
			width: 25%;
		}

		.jp-card .jp-card-front .jp-card-lower .jp-card-expiry:before,
		.jp-card .jp-card-front .jp-card-lower .jp-card-expiry:after {
			font-family: "Helvetica Neue";
			font-weight: bold;
			font-size: 7px;
			white-space: pre;
			display: block;
			opacity: .5;
		}

		.jp-card .jp-card-front .jp-card-lower .jp-card-expiry:before {
			content: attr(data-before);
			margin-bottom: 2px;
			font-size: 7px;
			text-transform: uppercase;
		}

		.jp-card .jp-card-front .jp-card-lower .jp-card-expiry:after {
			position: absolute;
			content: attr(data-after);
			text-align: right;
			right: 100%;
			margin-right: 5px;
			margin-top: 2px;
			bottom: 0;
		}

		.jp-card .jp-card-front .jp-card-lower .jp-card-name {
			text-transform: uppercase;
			font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;
			font-size: 20px;
			max-height: 45px;
			position: absolute;
			bottom: 0;
			width: 190px;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: horizontal;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.jp-card .jp-card-back {
			-webkit-transform: rotateY(180deg);
			-moz-transform: rotateY(180deg);
			-ms-transform: rotateY(180deg);
			-o-transform: rotateY(180deg);
			transform: rotateY(180deg);
		}

		.jp-card .jp-card-back .jp-card-bar {
			background-color: #444;
			background-image: -webkit-linear-gradient(#444, #333);
			background-image: linear-gradient(#444, #333, , , , , , , , );
			width: 100%;
			height: 20%;
			position: absolute;
			top: 10%;
		}

		.jp-card .jp-card-back:after {
			content: " ";
			display: block;
			background-color: #FFF;
			background-image: -webkit-linear-gradient(#FFF, #FFF);
			background-image: linear-gradient(#FFF, #FFF, , , , , , , , );
			width: 80%;
			height: 16%;
			position: absolute;
			top: 40%;
			left: 2%;
		}

		.jp-card .jp-card-back .jp-card-cvc {
			position: absolute;
			top: 40%;
			left: 85%;
			-webkit-transition-delay: 600ms;
			-moz-transition-delay: 600ms;
			transition-delay: 600ms;
		}

		.jp-card .jp-card-back .jp-card-shiny {
			position: absolute;
			top: 66%;
			left: 2%;
		}

		.jp-card .jp-card-back .jp-card-shiny:after {
			content: "This card has been issued by Jesse Pollak and is licensed for anyone to use anywhere for free.AIt comes with no warranty.A For support issues, please visit: github.com/jessepollak/card.";
			position: absolute;
			left: 120%;
			top: 5%;
			color: white;
			font-size: 7px;
			width: 230px;
			opacity: .5;
		}

		.jp-card.jp-card-identified {
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
		}

		.jp-card.jp-card-identified .jp-card-front,
		.jp-card.jp-card-identified .jp-card-back {
			background-color: #000;
			background-color: rgba(0, 0, 0, 0.5);
		}

		.jp-card.jp-card-identified .jp-card-front:before,
		.jp-card.jp-card-identified .jp-card-back:before {
			-webkit-transition: all 400ms ease;
			-moz-transition: all 400ms ease;
			transition: all 400ms ease;
			background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 15% 80%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);
			background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 15% 80%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);
			opacity: 1;
		}

		.jp-card.jp-card-identified .jp-card-front .jp-card-logo,
		.jp-card.jp-card-identified .jp-card-back .jp-card-logo {
			box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
		}

		.jp-card.jp-card-identified.no-radial-gradient .jp-card-front:before,
		.jp-card.jp-card-identified.no-radial-gradient .jp-card-back:before {
			background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);
			background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);
		}
	</style>
</head>

<body>
	<div class="demo-container">
		<div class="card-wrapper"></div>

		<div class="form-container active">
			<form action="">
				<p class="small">Start typing in here to take over and try it out</p>
				<div class="row collapse">
					<div class="small-6 columns">
						<input placeholder="Card number" type="text" name="number" id="ccnum">
					</div>
					<div class="small-6 columns">
						<input placeholder="Full name" type="text" name="name">
					</div>
				</div>
				<div class="row collapse">
					<div class="small-3 columns">
						<input placeholder="MM/YY" type="text" name="expiry" id="expiry">
					</div>

					<div class="small-3 columns">
						<input placeholder="CVC" type="text" name="cvc" id="cvc">
					</div>

					<div class="small-6 columns">
						<input id="submit" type="submit" value="Pay ${amount}" class="button postfix">
					</div>
				</div>
			</form>
		</div>
	</div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js"></script>
	<script src="http://jessepollak.github.io/card/build/js/demo.js"></script>
	<script src="https://rawgit.com/jessepollak/card/master/lib/js/card.js?v=beta1"></script>
	<script src="http://jondavidjohn.github.io/payform/javascripts/payform.min.js"></script>
	<script src="http://127.0.0.1:8080/Veritrans.js"></script>
	<script>
		$('code').each(function(i, e) {hljs.highlightBlock(e)});
        var card = new Card({ form: '.active form', container: '.card-wrapper' })
	</script>
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
			Veritrans.token(card, function(event){
				window.parent.postMessage(event.token_id, "http://${host}");
			});
		});
	</script>
</body>

</html>
        `;

        return html;
    }
}