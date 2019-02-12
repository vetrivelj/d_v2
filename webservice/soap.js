module.exports = function(xmlbody, anaConfig, reqp, resp, callback) {
    try {
        var http = require("https");
                
        var speech = "";

        var options = {
            "method": "POST",
            "hostname": anaConfig.webservice.host,
            "rejectUnauthorized": false,
            "port": anaConfig.webservice.port, 
            "path": anaConfig.webservice.wsdl,
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