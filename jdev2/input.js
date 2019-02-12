module.exports = function(dummy, anaConfig, req, res, callback) {
    try {
        var CustNum = req.body.result.parameters.CustNum;
        var CustName = req.body.result.parameters.CustName;
        CustName = CustName.replace(/[^\w\s]/gi, '');
        var jde_attrib = req.body.result.parameters.jde_attrib;

        var qString = "";
        var speech = "";
        var text = "";

        var xmlbody = "";
        var date = require('date-and-time');
        var d = new Date();
        //d.setMinutes(d.getMinutes() - 100);
        var timestamp = date.format(d, 'YYYY-MM-DDTHH:mm:ss');
        console.log("timestamp : " + timestamp);

        var username = anaConfig.webservice.user;
        var password = anaConfig.webservice.password;

        var xmlReq = "";
        
        var xmlHead = "<soapenv:Envelope xmlns:orac=\"http://oracle.e1.bssv.JP010020/\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"><soapenv:Header><wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"><wsse:UsernameToken><wsse:Username>" + username + "</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">" + password + "</wsse:Password><wsu:Created>" + timestamp + ".000Z</wsu:Created></wsse:UsernameToken></wsse:Security></soapenv:Header><soapenv:Body>";
        var xmlFoot = "</soapenv:Body></soapenv:Envelope>";

        console.log("Cust Num = " + CustNum + "\nCust Name =" + CustName + "\njde_attrib =" + jde_attrib);
        if ((CustNum == "" || CustNum == null) && (CustName == "" || CustName == null)) {
            speech = "Please provide the Customer name or number.";
            text = "Please provide the Customer name or number. If you are not sure, please try to provide the first few letters of the Customer Name";
            res.json({
                speech: speech,
                displayText: text
            });
        } else {
            if (CustNum != null && CustNum != "") {
                xmlbody = "<orac:getCustomerCreditInformation><entity><entityId>" + CustNum + "</entityId></entity></orac:getCustomerCreditInformation>";
                xmlReq = xmlHead + xmlbody + xmlFoot;
                callback(xmlReq);
            } else if (CustName != null && CustName != "") {
                //xmlbody = "<orac:getCustomerNameCreditInfoV2><CustomerNameInfo><customerName>" + CustName + "</customerName></CustomerNameInfo></orac:getCustomerNameCreditInfo>";
                xmlbody = "<orac:getCustomerCreditInformation><entity><entityId>" + 4242 + "</entityId></entity></orac:getCustomerCreditInformation>";
                xmlReq = xmlHead + xmlbody + xmlFoot;
                callback(xmlReq);
            } else {
                speech = "Unable to process your request. Please try again later.";
                res.json({
                    speech: speech,
                    displayText: speech
                });
            }
        }
    } catch (e) {
        console.log("Error : " + e);
        speech = "Unable to process your request. Please try again later.";
        res.json({
            speech: speech,
            displayText: speech
        });
    }
}