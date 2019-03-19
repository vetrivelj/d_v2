module.exports = function ( qString, req, resp, callback){
    var http = require("https");

    var options = {
      "method": "GET",
      "hostname": "api.github.com",
      "port": null,
      "path": qString,// "/repos/vetrivelj/d_v2/contents/anaconfig.json",
      "headers": {
        "cache-control": "no-cache",
          "user-agent": "node.js"
      }
    };
console.log("Body : " + JSON.stringify(options));
    var req = http.request(options, function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk.toString('utf8');
      });

      res.on("end", function () {
          //console.log("Body : " + body);
          var objResult = JSON.parse(body);
          var content = objResult.content;
          content.replace("\n", "")
          var buff = Buffer.from( content, 'base64').toString('ascii')  
          callback( buff );
      });
    });

    req.end();
}
