var app = angular.module('MyApp', ["ngRoute"]);
app.run(function() {
    console.log("My App is Running!");
});

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "console.html"
        })
        .when("/home", {
            templateUrl: "home.html"
        })
        .when("/edit", {
            templateUrl: "edit.html"
        })
        .when("/loading", {
            templateUrl: "loading.html"
        });
});


app.controller('mainCont', function($scope, $http, $location) {
    console.log("This is Main Controller!");

    $scope.getHome = function() {
        console.log("Home");
        $location.path('\loading');
        $http({
            method: 'GET',
            //            url: 'http://localhost:9000/getCust'
            url: 'https://subscrib.herokuapp.com/getCust'

        }).then(function(response) {
            //console.log("Response : " + JSON.stringify(response.data[0]));
            $scope.custs = response.data[0];
            $location.path('\home');
        });
    }

    $scope.getConsole = function() {
        console.log("Console");
        
        $location.path('\loading');
        $http({
            method: 'GET',
                        url: 'http://localhost:9000/console'
//            url: 'https://subscrib.herokuapp.com/console'

        }).then(function(response) {
            console.log("Response : " + JSON.stringify(response.data[0]));
            $scope.cases = response.data[0];
            $location.path('\/');
        });
        
        //$scope.cases = [{"id":1,"name":"JDE using AWS","description":"JDE using AWS rds","intent":["JDE_creditlimit","JDE_creditlimit_name","JDE_creditlimit_follow"],"invoke":["input","mssql","output"],"output":{"variable":{"level":1}},"webservice":{"user":"viki","password":"Oracle123","server":"vikisql.c1abev5luwmn.us-west-1.rds.amazonaws.com","database":"viki"},"folder":"jde"},{"id":2,"name":"EPM","description":"na","intent":["EPM_MDXQuery","EPM_JobStatus","EPM_Jobs","EPM_Jobs - custom"],"invoke":["input","rest","output"],"webservice":{"host":"epbcs190141-epbcs-bjdn8pft.srv.ravcloud.com","port":"9000","user":"ZXBtX2RlZmF1bHRfY2xvdWRfYWRtaW46ZXBtRGVtMHM="},"folder":"epm"},{"id":3,"name":"JDE using JDE","description":"na","intent":["test"],"invoke":["input","soap","output"],"output":{"variable":{"level":1}},"webservice":{"host":"10.151.66.5","port":"8004","user":"jde","password":"jde","wsdl":"/DV920/CustomerManager?WSDL"},"folder":"jdev2"},{"id":4,"name":"Welcome intent - select applciation","description":"na","intent":["Default Welcome Intent","Default Welcome Intent_application"],"invoke":["output"],"folder":"appSelect"},{"id":5,"name":"Reporting","description":"na","intent":["ADS_HyperionReport","reporting"],"invoke":["sendEmail"],"folder":"report"},{"id":6,"name":"Dismiss to reset contexts","description":"na","invoke":["dismiss"],"intent":["smalltalk.confirmation.cancel"],"folder":"generic"}];
        
    }
    $scope.getConsole();

    $scope.getEdit = function(custNum) {
        console.log("Num : " + custNum);
        $location.path('\loading');
        $http({
            method: 'GET',
            //            url: 'http://localhost:9000/edit/' + custNum
            url: 'https://subscrib.herokuapp.com/edit/' + custNum

        }).then(function(response) {
            console.log("Response : " + JSON.stringify(response.data[0]));
            $scope.editCust = response.data[0];
            $location.path('\edit');
        });

    }

    $scope.save = function(cust) {
        console.log("Num : " + cust.CustNum);
        $location.path('\loading');
        $http({
            method: 'POST',
            //            url: 'http://localhost:9000/save',
            url: 'https://subscrib.herokuapp.com/save',
            data: cust


        }).then(function(response) {
            console.log("Response : " + JSON.stringify(response.data[0]));
            if (response.data[0] > 0)
                alert("Record successfully updated.");
            location.reload();
        });

    }

    $scope.cancel = function() {
        location.reload();
        //$location.path('\/');
    };
});