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
    function boilerPlate(css, body, script, url, clientKey, host) {
        var styles = css.map(function (value) { return ("<link rel=\"stylesheet\" href=\"" + value + "\">"); }).join("");
        var scripts = script.map(function (value) { return ("<script src=\"" + value + "\"></script>"); }).join("");
        var html = "<!DOCTYPE html>\n\t\t<html lang=\"en\">\n\t\t<head>\n\t\t\t<meta charset=\"UTF-8\">\n\t\t\t<title>Veritrans Embedded Form</title>\n\t\t\t" + styles + "\n\t\t</head>\n\t\t<body>\n\t\t\t" + body + "\n\t\t\t" + scripts + "\n\t\t\t<script src=\"http://127.0.0.1:8080/Veritrans.js\"></script>\n\t\t\t<script>\n\t\t\t\tVeritrans.url = \"" + url + "\";\n\t\t\t\tVeritrans.client_key = \"" + clientKey + "\";\n\t\t\t\twindow.parent.postMessage(\"someKindOfTokenId\", \"http://" + host + "\");\n\t\t\t</script>\n\t\t</body>\n\t\t</html>";
        return html;
    }
    // kurang Veritrans.token(tokenForm, callBackEvent); // biar simple
    // simplify template generation
    function simple(url, clientKey, host, amount) {
        var html = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"UTF-8\">\n\t<title>Veritrans Embedded Form</title>\n\t<link rel=\"stylesheet\" href=\"http://jondavidjohn.github.io/payform/stylesheets/styles.css\">\n\t<link rel=\"stylesheet\" href=\"http://jondavidjohn.github.io/payform/stylesheets/pygment_trac.css\">\n</head>\n\n<body>\n\t<section>\n\t\t<div>\n\t\t\t<span class=\"field\">\n            <label for=\"ccnum\">Card Number</label>\n            <input placeholder=\"---- ---- ---- ----\" type=\"tel\" size=\"19\" name=\"ccnum\" value=\"\" id=\"ccnum\">\n          </span>\n\t\t\t<div><small>type: <strong id=\"ccnum-type\">invalid</strong></small></div>\n\t\t</div>\n\n\t\t<div>\n\t\t\t<span class=\"field\">\n            <label for=\"expiry\">Expiration</label>\n            <input placeholder=\"-- / --\" size=\"7\" type=\"tel\" name=\"expiry\" value=\"\" id=\"expiry\">\n          </span>\n\n\t\t\t<span class=\"cvc field\">\n            <label for=\"cvc\">CVC</label>\n            <input placeholder=\"---\" size=\"4\" type=\"tel\" name=\"cvc\" value=\"\" id=\"cvc\">\n          </span>\n\t\t</div>\n\n\t\t<div>\n\t\t\t<button id=\"submit\">Pay " + amount + "</button>\n\t\t\t<div id=\"result\" class=\"emoji\"></div>\n\t\t</div>\n\t</section>\n\t<script src=\"http://jondavidjohn.github.io/payform/javascripts/scale.fix.js\"></script>\n\t<script src=\"http://jondavidjohn.github.io/payform/javascripts/payform.min.js\"></script>\n\t<script src=\"http://jondavidjohn.github.io/payform/javascripts/form.js\"></script>\n\n\t<script src=\"http://127.0.0.1:8080/Veritrans.js\"></script>\n\t<script>\n\t\tVeritrans.url = \"" + url + "\";\n\t\tVeritrans.client_key = \"" + clientKey + "\";\n\t\tvar card = function(){\n\t\t\treturn {\n\t\t\t'card_number'     \t: document.getElementById(\"ccnum\").value.replace(/s+/, \"\").trim(),\n\t\t\t'card_exp_month'  \t: payform.parseCardExpiry(document.getElementById(\"expiry\").value).month < 10 ? \"0\" + payform.parseCardExpiry(document.getElementById(\"expiry\").value).month : \n\t\t\tpayform.parseCardExpiry(document.getElementById(\"expiry\").value).month,\n\t\t\t'card_exp_year'   \t: payform.parseCardExpiry(document.getElementById(\"expiry\").value).year,\n\t\t\t'card_cvv'        \t: document.getElementById(\"cvc\").value.replace(/s+/, \"\").trim(),\n\t\t\t'secure'       \t\t: false,\n\t\t\t'gross_amount'   \t: " + amount + "\n\t\t\t}\n\t\t};\n\t\t\n\t\tdocument.getElementById(\"submit\").addEventListener(\"click\", function() {\n\t\t\tconsole.log(card());\n\t\t\tif (document.getElementById(\"result\").classList.contains(\"valid\")) {\n\t\t\t\t\n\t\t\t\tVeritrans.token(card, function(event){\n\t\t\t\t\twindow.parent.postMessage(event.token_id, \"http://" + host + "\");\n\t\t\t\t});\t\n\t\t\t}\n\t\t});\n\t</script>\n</body>\n\n</html>";
        return html;
    }
    template.simple = simple;
    function bootStrap(url, clientKey, host) {
        return "" + boilerPlate(["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"], "formBody", ["http://code.jquery.com/jquery-2.1.4.min.js", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"], url, clientKey, host);
    }
    template.bootStrap = bootStrap;
    ;
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
