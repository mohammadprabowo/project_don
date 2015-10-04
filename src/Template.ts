module template {
	
	function boilerPlate (css : string[], body : string, script : string[], url : String, clientKey : String, host : String) {
		let styles = css.map((value) => `<link rel="stylesheet" href="${value}">`).join("");
		let scripts = script.map((value) => `<script src="${value}"></script>`).join("");
		
		console.log(styles); // kepanggil correctly
		console.log(scripts); // kepanggil correctly
		console.log(host); // kepanggil correctly
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
	
	// kurang Veritrans.token(tokenForm, callBackEvent);
	// itu keduanya kita yg generate
	// kemudian disambungin dengan postMessage
	
	// is a function
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