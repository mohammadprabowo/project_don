var Bank;
(function (Bank) {
    Bank[Bank["bni"] = 0] = "bni";
    Bank[Bank["mandiri"] = 1] = "mandiri";
    Bank[Bank["cimb"] = 2] = "cimb";
    Bank[Bank["bca"] = 3] = "bca";
})(Bank || (Bank = {}));
/// <reference path="Bank.ts" />
/// <reference path="Token.ts" />
var Util = (function () {
    function Util(document) {
        this.document = document;
    }
    Util.prototype.validateToken = function (token, clientKey, isTwoClick) {
        // add validation here if needed, before send to url endpoint
        var vtRequest = token();
        if (isTwoClick) {
            vtRequest.two_click = 'true';
        }
        vtRequest.callback = 'Veritrans.prefix';
        vtRequest.client_key = clientKey;
        return vtRequest;
    };
    ;
    Util.prototype.processJsonP = function (url) {
        var s = this.document.createElement('script');
        s.src = String(url);
        this.document.getElementsByTagName('head')[0].appendChild(s);
    };
    ;
    Util.prototype.toQueryParam = function (token) {
        var tokenObject;
        tokenObject = token;
        var encode = encodeURIComponent;
        var keys = Object.keys(token);
        var queryString = '?' + keys.filter(function (value) { return tokenObject.hasOwnProperty(value); })
            .map(function (value) { return encode(value) + '=' + encode(tokenObject[value]); })
            .join('&');
        return queryString;
    };
    return Util;
})();
/// <reference path="Token.ts" />
var template;
(function (template) {
    function simple(url, clientKey, host, amount) {
        var html = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"UTF-8\">\n\t<title>Veritrans Embedded Form</title>\n\t<link rel=\"stylesheet\" href=\"http://jondavidjohn.github.io/payform/stylesheets/styles.css\">\n\t<link rel=\"stylesheet\" href=\"http://jondavidjohn.github.io/payform/stylesheets/pygment_trac.css\">\n</head>\n\n<body>\n\t<section>\n\t\t<div>\n\t\t\t<span class=\"field\">\n            <label for=\"ccnum\">Card Number</label>\n            <input placeholder=\"---- ---- ---- ----\" type=\"tel\" size=\"19\" name=\"ccnum\" value=\"\" id=\"ccnum\">\n          </span>\n\t\t\t<div><small>type: <strong id=\"ccnum-type\">invalid</strong></small></div>\n\t\t</div>\n\n\t\t<div>\n\t\t\t<span class=\"field\">\n            <label for=\"expiry\">Expiration</label>\n            <input placeholder=\"-- / --\" size=\"7\" type=\"tel\" name=\"expiry\" value=\"\" id=\"expiry\">\n          </span>\n\n\t\t\t<span class=\"cvc field\">\n            <label for=\"cvc\">CVC</label>\n            <input placeholder=\"---\" size=\"4\" type=\"tel\" name=\"cvc\" value=\"\" id=\"cvc\">\n          </span>\n\t\t</div>\n\n\t\t<div>\n\t\t\t<button id=\"submit\">Pay " + amount + "</button>\n\t\t\t<div id=\"result\" class=\"emoji\"></div>\n\t\t</div>\n\t</section>\n\t<script src=\"http://jondavidjohn.github.io/payform/javascripts/scale.fix.js\"></script>\n\t<script src=\"http://jondavidjohn.github.io/payform/javascripts/payform.min.js\"></script>\n\t<script src=\"http://jondavidjohn.github.io/payform/javascripts/form.js\"></script>\n\n\t<script src=\"http://127.0.0.1:8080/Veritrans.js\"></script>\n\t<script>\n\t\tVeritrans.url = \"" + url + "\";\n\t\tVeritrans.client_key = \"" + clientKey + "\";\n\t\tvar card = function(){\n\t\t\treturn {\n\t\t\t'card_number'     \t: document.getElementById(\"ccnum\").value.replace(/s+/, \"\").trim(),\n\t\t\t'card_exp_month'  \t: payform.parseCardExpiry(document.getElementById(\"expiry\").value).month < 10 ? \"0\" + payform.parseCardExpiry(document.getElementById(\"expiry\").value).month :\n\t\t\tpayform.parseCardExpiry(document.getElementById(\"expiry\").value).month,\n\t\t\t'card_exp_year'   \t: payform.parseCardExpiry(document.getElementById(\"expiry\").value).year,\n\t\t\t'card_cvv'        \t: document.getElementById(\"cvc\").value.replace(/s+/, \"\").trim(),\n\t\t\t'secure'       \t\t: false,\n\t\t\t'gross_amount'   \t: " + amount + "\n\t\t\t}\n\t\t};\n\n\t\tdocument.getElementById(\"submit\").addEventListener(\"click\", function() {\n\t\t\tconsole.log(card());\n\t\t\tif (document.getElementById(\"result\").classList.contains(\"valid\")) {\n\n\t\t\t\tVeritrans.token(card, function(event){\n\t\t\t\t\twindow.parent.postMessage(event.token_id, \"http://" + host + "\");\n\t\t\t\t});\n\t\t\t}\n\t\t});\n\t</script>\n</body>\n\n</html>";
        return html;
    }
    template.simple = simple;
    function semantic(url, clientKey, host, amount) {
        var html = "\n\t\t<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n    <meta charset=\"UTF-8\">\n    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css\">\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.4/semantic.min.css\">\n    <title>New Document</title>\n</head>\n\n<body>\n\n    <div class=\"container\">\n\n\n            <form id=\"credit-card-form\" name=\"creditcardform\" class=\"ui form\">\n                <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n                    <div id=\"error-message\" class=\"ui error message\"></div>\n                    <div class=\"form-group\">\n                        <label>Credit Card Number</label>\n                        <div class=\"ui fluid icon input\">\n                            <input id=\"card-number\" name=\"cardnumber\" class=\"form-control\" type=\"text\" placeholder=\"XXXX XXXX XXXX XXXX\" />\n                            <i id=\"credit-card-logo\" class=\"payment icon\"></i>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\">\n                    <div class=\"form-group\">\n                        <label>Exp. Date</label>\n                        <input id=\"exp-date\" name=\"expdate\" class=\"form-control\" type=\"text\" placeholder=\"MM / YY\" />\n                    </div>\n                </div>\n                <div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\">\n                    <div class=\"form-group\">\n                        <label>CVV</label>\n                        <input id=\"cvv\" name=\"cvv\" class=\"form-control\" type=\"text\" placeholder=\"***\" />\n                    </div>\n                </div>\n                <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n                    <div class=\"form-group\">\n                        <input type=\"submit\" class=\"ui primary button fluid\" value=\"Confirm Payment " + amount + "\" />\n                    </div>\n                </div>\n            </form>\n\n    </div>\n\n<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js\"></script>\n<script src=\"http://127.0.0.1:8080/lib/js/jquery.formatter.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.4/semantic.min.js\"></script>\n\n<script src=\"http://127.0.0.1:8080/Veritrans.js\"></script>\n\n\n<script type=\"text/javascript\">\n    $(document).ready(function() {\n\n        function isCardNumberValid (cardnumber) {\n            var len = cardnumber.length;\n            var mul = 0;\n            var prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]];\n            var sum = 0;\n\n            while (len--) {\n                sum += prodArr[mul][parseInt(cardnumber.charAt(len), 10)];\n                mul ^= 1;\n            }\n\n            if (sum % 10 === 0 && sum > 0) {\n                return true;\n            } else {\n                return false;\n            }\n        }\n\n        function isExpDateValid (expdate) {\n            var date = expdate.split(\" \");\n            date[1] = date[2];\n            var currentDate = new Date();\n            if (expdate.length == 6) {\n              //Format date mm/yy\n              var str = '20';\n              date[1] = parseInt(str + date[1]);\n            }\n\n            if (currentDate.getFullYear() == date[1]){\n              if (date[0] >= currentDate.getMonth() && date[0] <= 12){\n                return true;\n              }\n              else {\n                return false;\n              }\n            }\n            else if (date[1] > currentDate.getFullYear()){\n              if (date[0] >= 1 && date[0] <= 12){\n                return true;\n              }\n              else{\n                return false;\n              }\n            }\n            else{\n              return false;\n            }\n        }\n\n        function isCvvValid (cvv) {\n            if (isNaN(parseInt(cvv))){\n                return false;\n            } else {\n                return true;\n            }\n        }\n\n        $('#card-number').formatter({\n            'pattern': '{{9999}} {{9999}} {{9999}} {{9999}}'\n        });\n\n        $('#exp-date').formatter({\n            'pattern': '{{99}} / {{99}}'\n        });\n\n        $('#credit-card-form').submit(function(event){\n            event.preventDefault();\n            var card_number = document.getElementById('card-number').value.replace(/\\s/g, \"\");\n            console.log(card_number);\n            var card_exp_date = document.getElementById('exp-date').value.replace(/[/]/g, '');\n\t\t\t\t\t\tvar card_exp_month = document.getElementById('exp-date').value.substr(0,2);\n            var card_exp_year = document.getElementById('exp-date').value.substr(5,2);\n            var card_cvv = document.getElementById('cvv').value;\n            var error_messages = \"\";\n            if (!isCardNumberValid(card_number)){\n                error_messages += \"<li>Card Number is Invalid</li>\";\n            }\n            if (!isCvvValid(card_cvv)){\n                error_messages += \"<li>CVV is Invalid</li>\";\n            }\n            if (!isExpDateValid(card_exp_date)){\n                error_messages += \"<li>Exp Date is Invalid</li>\";\n            }\n            $('#error-message').empty().append(error_messages);\n            if (error_messages != \"\"){\n                event.preventDefault();\n                $('#error-message').show();\n\n                return false;\n            } else {\n                event.preventDefault();\n                var card = function() {\n                    return {\n                        'card_number' : card_number,\n                        'card_exp_date' : card_exp_date,\n                        'card_exp_month' : card_exp_month,\n                        'card_exp_year' : card_exp_year,\n                        'card_cvv' : card_cvv,\n                        'gross_amount' : " + amount + "\n                    }\n                }\n\n                Veritrans.url = \"" + url + "\";\n\t\t        Veritrans.client_key = \"" + clientKey + "\";\n\n                Veritrans.token(card, function(event){\n\t\t\t\t\twindow.parent.postMessage(event.token_id, \"http://" + host + "\");\n\t\t\t\t});\n\n                return true;\n            }\n        });\n    });\n\n</script>\n</body>\n</html>";
        return html;
    }
    template.semantic = semantic;
})(template || (template = {}));
/// <reference path="Util.ts" />
/// <reference path="Client.ts" />
/// <reference path="Template.ts" />
// Add IE-specific interfaces to Window
// interface Window {
//     attachEvent(event: string, listener: any): boolean;
//     detachEvent(event: string, listener: any): void;
// }
var ProjectDon = (function () {
    function ProjectDon(util, window) {
        this.url = "https://api.veritrans.co.id/v2/token";
        this.client_key = "";
        this.util = util;
        this.window = window;
    }
    ProjectDon.prototype.prefix = function (event) {
        this.callback(event);
    };
    ProjectDon.prototype.token = function (token, callbackEvent) {
        var cleanToken = this.util.validateToken(token, this.client_key, false);
        var request = this.url + this.util.toQueryParam(cleanToken);
        this.callback = callbackEvent;
        // add event listener
        if (window.addEventListener) {
            window.addEventListener("message", function (event) {
                if (event.data) {
                    callbackEvent(event.data);
                }
            });
        }
        else {
        }
        this.util.processJsonP(request);
    };
    ;
    ProjectDon.prototype.tokenCvv = function (token, callbackEvent) {
        var cleanToken = this.util.validateToken(token, this.client_key, true);
        var request = this.url + this.util.toQueryParam(cleanToken);
        this.util.processJsonP(request);
        // add event listener
        if (window.addEventListener) {
            window.addEventListener("message", function (event) {
                if (event.data) {
                    callbackEvent(event.data);
                }
            }, false);
        }
        else {
        }
        this.util.processJsonP(request);
    };
    ;
    // callbackMerchant diatas
    ProjectDon.prototype.generateForm = function (id, templateName, amount, callback) {
        var document = window.document;
        var iframe = document.createElement('iframe');
        var templateObj = template;
        var host = window.location.host;
        var html = templateObj[templateName](this.url, this.client_key, host, amount);
        window.document.getElementById(id).appendChild(iframe);
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(html);
        iframe.contentWindow.document.close();
        window.addEventListener("message", function (event) {
            console.log(event);
            if (event.data) {
                var tokenId = new String(event.data);
                callback(tokenId.length !== 0 ? tokenId : "");
            }
        });
    };
    return ProjectDon;
})();
// appendRedirectUrl (migs) 
/// <reference path="ProjectDon.ts" />
// stupid compiler
var Veritrans = new ProjectDon(new Util(document), window);
