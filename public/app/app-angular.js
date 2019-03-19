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
        .when("/editcase", {
            templateUrl: "editcase.html"
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
//                        url: 'http://localhost:9000/console'
            url: 'https://subscrib.herokuapp.com/console'

        }).then(function(response) {
            console.log("Response : " + JSON.stringify(response.data));
            $scope.cases = response.data;
            $location.path('\/');
        });
        
    }
    $scope.getConsole();
    
    $scope.getCase = function(varcase) {
        console.log("Num : " + varcase);
        $location.path('\loading');
        $http({
            method: 'POST',
//                        url: 'http://localhost:9000/getcase/',
            url: 'https://subscrib.herokuapp.com/getcase/',
            data: varcase


        }).then(function(response) {
            console.log("Response : " + JSON.stringify(response.data));
            $scope.inputjs = response.data.input;
            $scope.outputjs = response.data.output;
            $scope.miscjs = response.data.dismiss;
            
            $location.path('\editcase');
        });

    }

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