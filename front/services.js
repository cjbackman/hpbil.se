function loginService($http, $localStorage, $state) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;

    return service;

    function Login(username, password) {
        $http.post('../../backend/auth.php', { username: username, password: password })
            .success(function (response) {
                // login successful if there's a token in the response
                if (response.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { username: username, token: response.token };

                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                    $state.go("admin");

                } else {
                    return response;
                }
            });
    }

    function Logout() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    }
}

function carService ($http) {
	var service = {};

	service.getCars = getCars;

	return service;

	function getCars () {
		return $http.get("../../backend/getCars.php")
			.then(function (response) {
				return response;
			});
	};
};

angular.module("app.services", [])
.factory("CarService", carService)
.factory("LoginService", loginService);