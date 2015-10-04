module template {
	
	function boilerPlate (css : string[], body : string, script : string[]) {
		let styles = css.map((value) => `<link rel="stylesheet" href="${value}">`).join("");
		let scripts = script.map((value) => `<script src="${value}"></script>`).join("");
		
		console.log(styles); // kepanggil correctly
		console.log(scripts); // kepanggil correctly
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
			<script src="bin/Veritrans.js"></script>
			<script>
				Veritrans.c = "";
				Veritrans.client_key = "" 
			</script>
		</body>
		</html>`;
		return html;
	}
	
	export let bootStrap = `${
		boilerPlate(
			["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"], 
			"formBody", 
			["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"]
			)
		}`;
}