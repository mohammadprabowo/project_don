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
            console.log(card_number);
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
}
