
var app = angular.module("hpApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "assets/views/start.html"
    })
    .when("/buy", {
        templateUrl : "assets/views/buy.html"
    })
    .when("/rent", {
        templateUrl : "assets/views/rent.html"
    })
});