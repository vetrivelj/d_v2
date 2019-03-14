module.exports = function(response, anaConfig, req, res, callback) {

    var CustNum = req.body.result.parameters.CustNum;
    var CustName = req.body.result.parameters.CustName;

    var qString = "";
    var speech = "";
    var speechText = "";
    var suggests = [];
    var contextOut = [];

    try {
        console.log("Result : " + response + "\n\n\n\n\n\n\n\n\n");
        var count = response.slice(response.indexOf("<count>") + 7, response.indexOf("</count>"));
        var credit, exposure;

        switch (true) {
            case (count == 0):
                {
                    console.log("No records found");
                    break;
                }

            case (count == 1):
                {
                    console.log("One record found");
                    if (response.indexOf("<amountCreditLimit>") != -1) {
                        credit = response.slice(response.indexOf("<amountCreditLimit>") + 19, response.indexOf("</amountCreditLimit>"));
                        console.log("Credit : " + credit);
                    } else {
                        console.log("Error: Credit not available");
                    }
                    if (response.indexOf("<amountTotalExposure>") != -1) {
                        exposure = response.slice(response.indexOf("<amountTotalExposure>") + 21, response.indexOf("</amountTotalExposure>"));
                        console.log("Total Exposure = " + exposure + ".");
                    } else {
                        console.log("Error: Total Exposure not available");
                    }
                    break;
                }
            case (count > 1):
                {
                    console.log("More record found");
                    var strResult = response.slice(response.indexOf("<customerListInfo>") + 18, response.indexOf("</customerListInfo>"));
                    var arrResult = strResult.split(",");
                    console.log("arrResult : " + arrResult);

                    var record = [];
                    //var tempObj = {}, arrCust = []; 

                    var speech = "Please select one of the folowing:\nCustomer ";

                    for (var i = 0; i < arrResult.length; i++) {
                        if (arrResult[i] != "" && arrResult[i] != null) {
                            record = arrResult[i].split(":");
                            speech += (i && ",\n\t") + record[0] + " : " + record[1];

                            //tempObj = {};
                            //tempObj[record[0]] = record[1];
                            //arrCust.push(tempObj);                            
                        }
                    }
                    //console.log("arrCust : " + JSON.stringify(arrCust));
                    console.log("Speech : \n" + speech);
                    break;
                }
            default:
                {
                    console.log("Error");
                }

        }
        console.log("Speech : " + speech);
        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
            console.log("Finished!");
        });

    } catch (e) {
        console.log("Error : " + e);
        speechText = "No record found.";
        speech = speechText;
        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
            console.log("Finished!");
        });

    }
}