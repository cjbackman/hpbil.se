var config = function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("start", {
        url: "/",
        templateUrl: "front/views/start.html"
    })
    .state("cars", {
        url: "/cars",
        component: "cars"
    })
    .state("car", {
        url: "/cars/:id",
        component: "cars",
        resolve: {
            id: function ($stateParams) {
                return $stateParams.id;
            }
        }
    })
    .state("rent", {
        url: "rent",
        templateUrl: "front/views/rent.html"
    })
    .state("login", {
        url: "/login",
        component: "login"
    })
    .state("admin", {
        url: "/admin",
        component: "admin"
    });
}

angular.module("app.config", []).config(config);