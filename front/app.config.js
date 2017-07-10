var config = function($stateProvider, $urlRouterProvider, $httpProvider) {
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
        url: "/rent",
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

    $httpProvider.interceptors.push(function($localStorage) {
        return {
            'request': function(config) {
                if ($localStorage.currentUser) {
                    config.headers['Authorization'] = $localStorage.currentUser.token;
                }
                return config;
            }
        };
    });
}

angular.module("app.config", []).config(config);