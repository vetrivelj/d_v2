module.exports = function( index, inputInvoke, anaConfig, req, res) {
    if( index < anaConfig.invoke.length){
        
        var Invoke = require("./invoker");
        
        var Invoker;
        if( anaConfig.invoke[index] == "rest" || anaConfig.invoke[index] == "soap" || anaConfig.invoke[index] == "mssql" ){
            Invoker = require("../webservice/" + anaConfig.invoke[index] );
        }else{
            Invoker = require("./" + anaConfig.folder + "/" + anaConfig.invoke[index] );
        }
        
        Invoker( inputInvoke, anaConfig, req, res, function(resultInvoke){
            console.log("Result In: " + resultInvoke );
            Invoke( index+1, resultInvoke, anaConfig, req, res, function(){
                console.log("Done");
            });
        });
    }
}