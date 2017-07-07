var app = angular.module("hpApp", ["ngRoute"]);

app.controller("buyController", buyController);
app.controller("loginController", loginController);
app.factory("LoginService", loginService);
app.factory("BuyService", buyService);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "front/views/start.html",
    })
    .when("/buy", {
        templateUrl : "front/views/buy.html",
        controller: "buyController"
    })
    .when("/rent", {
        templateUrl : "front/views/rent.html"
    })
    .when("/login", {
        templateUrl: "front/views/login.html",
        controller: "loginController"
    })
}); 