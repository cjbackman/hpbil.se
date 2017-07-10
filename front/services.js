function authService($http, $localStorage, $state) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;
    service.isValid = isValid;

    return service;

    function Login(username, password) {
    	//console.log("loggin in");

        return $http.post('../../api/auth.php', { username: username, password: password })
            .then(function (response) {
                if (response.data.token) {
                    $localStorage.currentUser = { username: username, token: response.data.token };
                    $state.go("admin");

                } else {
                    return response.data;
                }
            }).catch(function (error) {
                return error;
            });
    }

    function Logout() {
        delete $localStorage.currentUser;
        $state.go("login");
    }

    function isValid() {
    	return $http.get('../../api/isValid.php')
    		.then(function (response) {
    			return response;
    		}).catch(function (error) {
                return error;
            });
    }
}

function carService ($http) {
	var service = {};

	service.getCars = getCars;

	return service;

	function getCars () {
		return $http.get("../../api/getCars.php")
			.then(function (response) {
				return response;
			}).catch(function (error) {
                return error;
            });
	};

    function delCar (id) {
        return $http.post("../../api/delCar.php", {id: id})
            .then(function (response) {
                return response;
            }).catch(function (error) {
                return error;
            });
    };

/*
    function updateCar(car) {
        return $http.post("../../api/updateCar.php", {car: car})
            .then(function (response) {
                return response;
            }).catch(function (error) {
                return error;
            });
    };
*/
};

angular.module("app.services", [])
.factory("CarService", carService)
.factory("AuthService", authService);