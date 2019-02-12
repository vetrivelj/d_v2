module.exports = function(xmlbody, anaConfig, reqp, resp, callback) {
    try {
        var http = require("https");
        var date = require('date-and-time');
        
        var speech = "";

        var d = new Date();
        //d.setMinutes(d.getMinutes() - 100);
        var timestamp = date.format(d, 'YYYY-MM-DDTHH:mm:ss');
        console.log("timestamp : " + timestamp);

        var username = anaConfig.webservice.user;
        var password = anaConfig.webservice.password;

        var xmlreq = "<soapenv:Envelope xmlns:orac=\"http://oracle.e1.bssv.JP010020/\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"><soapenv:Header><wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"><wsse:UsernameToken><wsse:Username>" + username + "</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">" + password + "</wsse:Password><wsu:Created>" + timestamp + ".000Z</wsu:Created></wsse:UsernameToken></wsse:Security></soapenv:Header><soapenv:Body>" + xmlbody + "</soapenv:Body></soapenv:Envelope>";

        console.log("XML Req : " + xmlreq);

        var options = {
            "method": "POST",
            "hostname": "10.151.66.5",
            "rejectUnauthorized": false,
            "port": "8004",
            "path": "/DV920/CustomerManager?WSDL",
            "headers": {
                "content-type": "text/xml",
                "cache-control": "no-cache"
            }
        };

        var req = http.request(options, function(res) {
            var chunks = "";

            res.on("data", function(chunk) {
                chunks += chunk;
            });

            res.on("end", function() {
                var body = chunks;
                console.log(body);
                //callback(body);
                var count = new Date().getSeconds()%10;
                if( count <=3 ){
                    count = 0;
                }else{
                    if( count <= 7 ){
                        count = 1;
                    }else{
                        count = 3;
                    }
                }
                body = '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:S="http://schemas.xmlsoap.org/soap/envelope/"><env:Header/><S:Body><ns0:getCustomerNumberCreditInfoResponse xmlns:ns0="http://oracle.e1.bssv.JP550100/"><e1MessageList/><count>' + count + '</count><amountCreditLimit>50000.00</amountCreditLimit><amountTotalExposure>1587378.41</amountTotalExposure><creditHoldExempt>false</creditHoldExempt><entity><entityId>4242</entityId><entityLongId></entityLongId><entityTaxId>45-34126801 </entityTaxId></entity><customerListInfo>4242:CAPITALSYSTEM,222500:CAPITALSYSTEM,424201:CAPITAL SYSTEMS,</customerListInfo></ns0:getCustomerNumberCreditInfoResponse></S:Body></S:Envelope>';
                callback(body);
            });

            res.on("error", function(e) {
                console.log("Error = " + e);
                speech = "Unable to process your request. Please try again later.";
                resp.json({
                    speech: speech,
                    displayText: speech
                });
            });
        });

        req.write(xmlreq);
        req.end();
    } 
    catch (e) {
        console.log("Error : " + e);
        speech = "Unable to process your request. Please try again later.";
        resp.json({
            speech: speech,
            displayText: speech
        });
    }
}