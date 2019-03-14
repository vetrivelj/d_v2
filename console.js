module.exports = function ( qString, req, resp, callback){
    var http = require("https");

    var options = {
      "method": "GET",
      "hostname": "api.github.com",
      "port": null,
      "path": qString,// "/repos/vetrivelj/d_v2/contents/anaconfig.json",
      "headers": {
        "cache-control": "no-cache"
      }
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log("Encode Str - " + body.toString());
          var strBody = body.toString();
          strBody.replace("\n", "")
          var buff = new Buffer(strBody, 'base64');  
          var text = buff.toString('ascii');
          console.log("Decode Str - " + text);
          callback( JSON.parse(text) );
      });
    });

    req.end();
}
