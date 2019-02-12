module.exports = function(input, anaConfig, reqp, resp, callback) {
    
    var http = require("http");

    try {

        var intentName = reqp.body.result.metadata.intentName;
        console.log("qString : " + input.qString);
        console.log("Body : " + JSON.stringify(input.body));
        console.log("Method : " + input.method);


        var options = {
            "method": input.method,
            "hostname": anaConfig.webservice.host,
            "port": anaConfig.webservice.port,
            "path": input.qString,
            "headers": {
                "authorization": "Basic " + anaConfig.webservice.user,
                "cache-control": "no-cache",
                "content-type": "application/json"
            }
        };

        var req = http.request(options, function(res) {
            var chunks = [],
                resObj = {};

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                try {
                    var result = Buffer.concat(chunks);
                    console.log(result.toString());
                    resObj = JSON.parse(result.toString());
                    callback(resObj);
                } catch (e) {
                    console.log("Error: " + e);
                    resp.json({
                        speech: "Unble to process your request. Please try again later."
                    });
                }
            });

            res.on("error", function(error) {
                resp.json({
                    speech: "Unble to process your request. Please try again later."
                });
            });
        });

        if (options.method == "POST") {
            req.write(JSON.stringify(input.body));
        }
        req.end();
        
    } catch (e) {
        console.log("Error : " + e);
        resp.json({
            speech: "Unble to process your request. Please try again later."
        });
    }

}