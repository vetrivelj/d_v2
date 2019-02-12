module.exports = function(dummy, anaConfig, req, res, callback) {
    try {

        var input = {};
        var intentName = req.body.result.metadata.intentName;
        var appName = req.body.result.parameters.epm_application;
        if (appName == "" || appName == null)
            appName = "vision";

        switch (true) {
            case (intentName == "EPM_MDXQuery"):
                {
                    input.qString = "/HyperionPlanning/rest/11.1.2.4/applications/" + appName + "/dataexport/plantypes/Plan1";
                    input.method = "POST";
                    input.body = "mdxQuery=SELECT {[Period].[" + req.body.result.parameters.Period + "]} ON COLUMNS, {[Account].[" + req.body.result.parameters.epm_account + "]} ON ROWS FROM Vision.Plan1 WHERE ([Year].[" + req.body.result.parameters.epm_year + "],[Scenario].[" + req.body.result.parameters.epm_scenario + "],[Version].[" + req.body.result.parameters.epm_version + "],[Entity].[" + "403" + "],[Product].[" + "No Product" + "])";
                    
                    callback(input);
                    break;
                }

            case (intentName == "EPM_Jobs"):
                {
                    input.qString = "/HyperionPlanning/rest/11.1.2.4/applications/" + appName + "/jobs";
                    input.method = "POST";
                    input.body = {
                        "jobType": "CUBE_REFRESH",
                        "jobName": "CubeRefresh"
                    };
                    callback(input);
                    break;
                }

            case (intentName == "EPM_Jobs - custom" || intentName == "EPM_JobStatus"):
                {
                    var jobId = "";
                    if (intentName == "EPM_Jobs - custom") {
                        var array = req.body.result.contexts;

                        for (var key in array) {
                            console.log("**************************\narray " + key + " : " + JSON.stringify(array[key]));
                            if (array[key].name == "jobid") {
                                jobId = array[key].parameters["jobid"];
                                break;
                            }
                        }
                    } else
                    if (intentName == "EPM_JobStatus") {
                        jobId = req.body.result.parameters.jobid;
                    }

                    console.log("jobid : " + jobId);
                    if( jobId != "" && jobId != null){
                        input.qString = "/HyperionPlanning/rest/11.1.2.4/applications/" + appName + "/jobs/" + jobId;
                        input.method = "GET";
                        callback(input);
                    }else{
                        res.json({
                            speech: "Unble to process your request. Please try again later."
                        });
                    }
                    break;
                }
        }
    } catch (e) {
        console.log("Error : " + e);
        res.json({
            speech: "Unble to process your request. Please try again later."
        });
    }
}