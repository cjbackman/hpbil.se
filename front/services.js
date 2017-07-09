function authService($http, $localStorage, $state) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;
    service.isValid = isValid;

    return service;

    function Login(username, password) {
    	//console.log("loggin in");

        return $http.post('../../backend/auth.php', { username: username, password: password })
            .then(function (response) {
                if (response.data.token) {
                    $localStorage.currentUser = { username: username, token: response.data.token };
                    $state.go("admin");

                } else {
                    return response.data;
                }
            });
    }

    function Logout() {
        delete $localStorage.currentUser;
        $state.go("start");
    }

    function isValid() {
    	return $http.get('../../backend/isValid.php')
    		.then(function (response) {
    			return response;
    		});
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
.factory("AuthService", authService);