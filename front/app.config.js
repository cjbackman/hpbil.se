var config = function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "front/views/start.html",
    })
    .when("/buy", {
        template: '<cars></cars>'
    })
    .when("/rent", {
        templateUrl : "front/views/rent.html"
    })
    .when("/login", {
        templateUrl: "front/views/login.html",
        controller: "LoginController"
    })
}

angular.module("app.config", []).config(config);